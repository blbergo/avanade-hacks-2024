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
import {
  FunctionalTranslator,
  SelfQueryRetriever,
} from "https://esm.sh/langchain@0.1.32/retrievers/self_query";
import { AttributeInfo } from "https://esm.sh/v135/langchain@0.1.32/dist/schema/query_constructor.js";
import { StructuredOutputParser } from "https://esm.sh/v135/@langchain/core@0.1.53/denonext/output_parsers.js";

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
    "You are an AI assistant for Cal Poly Pomona who helps people choose venues for events. The available venues are as follows: {data}. \nContinue the conversation: {messages}. \n{format_instructions}";
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ["messages", "data", "format_instructions"],
  });

  const geminiModel = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    apiKey: Deno.env.get("GOOGLE_API_KEY")!,
  });

  const llmChain = new LLMChain({
    llm: geminiModel,
    prompt: promptTemplate,
  });

  const documentContents = "Data about possible venues";

  const attributeInfo: AttributeInfo[] = [
    {
      name: "capacity",
      type: "number",
      description: "The capacity of the venue",
    },
    {
      name: "max_capacity",
      type: "number",
      description: "The maximum capacity of the venue",
    },
    {
      name: "building",
      type: "string",
      description: "The building where the venue is located",
    },
    {
      name: "features",
      type: "string",
      description: "The features and ammenities of the venue",
    },
    {
      name: "categories",
      type: "string",
      description: "The categories of the venue",
    },
  ];

  const retriever = SelfQueryRetriever.fromLLM({
    llm: geminiModel,
    vectorStore,
    documentContents,
    attributeInfo,
    structuredQueryTranslator: new FunctionalTranslator(),
  });

  const docs = await retriever.getRelevantDocuments(message);

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    record: {
      capacity: "The capacity of the venue",
      max_capacity: "The maximum capacity of the venue",
      building: "The building where the venue is located",
      features: "The features and ammenities of the venue",
      categories: "The categories of the venue",
      name: "The name of the venue",
    },
    message: "Your response to the conversation",
    shouldShowRecord: "whether the user wants to reserve a venue",
  });

  // TODO:create the conversation chain
  const res = await llmChain.invoke({
    messages: message,
    data: JSON.stringify(docs),
    format_instructions: parser.getFormatInstructions(),
  });

  return new Response(JSON.stringify(res), {
    headers: { "Content-Type": "application/json" },
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/chat' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
