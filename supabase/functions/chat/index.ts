// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { corsHeaders } from "../_shared/cors.ts";
import { supabaseClient } from "../_shared/client.ts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "https://esm.sh/v135/@langchain/core@0.1.55/documents.js";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  const client = supabaseClient(req);
  const { message } = await req.json();

  // get the emmbeddings
  const { data: documents, error: documentError } = await client
    .from("langchain_pg_embedding")
    .select("document");

  const docs: Document[] = [];

  for (const document of documents!) {
    docs.push(
      new Document({
        pageContent: document.document!,
      }),
    );
  }

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new GoogleGenerativeAIEmbeddings(),
    {},
  );

  const res = await vectorStore.similaritySearch(message);

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
