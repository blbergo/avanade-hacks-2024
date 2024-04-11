// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { corsHeaders } from "../_shared/cors.ts";
import { supabaseClient } from "../_shared/client.ts";

import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getVectorStore } from "./embeddings.ts";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  // TODO: send the message to include the chat id
  const { message } = await req.json();

  const client = supabaseClient(req);

  const vectorStore = await getVectorStore(client);

  const template =
    "The user is trying to book a venue on campus. Specifically, they are asking you {message}. Here is the most similar database records: {data}. Help them choose the best one. If the records aren't relevant, still give them a suggestion.";
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ["message", "data"],
  });

  const geminiModel = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    apiKey: Deno.env.get("GOOGLE_API_KEY")!,
  });

  const llmChain = new LLMChain({
    llm: geminiModel,
    prompt: promptTemplate,
  });

  const retriever = MultiQueryRetriever.fromLLM({
    llm: geminiModel,
    retriever: vectorStore.asRetriever(),
    verbose: true,
  });

  const docs = await retriever.getRelevantDocuments(message);

  const data = JSON.stringify(docs.slice(0, 4));

  // TODO:create the conversation chain
  const res = await llmChain.call({
    message: message,
    data,
  });

  return new Response(
    JSON.stringify({
      res,
      data,
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/chat' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
