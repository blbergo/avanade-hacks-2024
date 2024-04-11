import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { Document } from "https://esm.sh/v135/@langchain/core@0.1.55/documents.js";

export async function getVectorStore(client: any) {
  // get the emmbeddings
  const { data: documents, error: documentError } = await client
    .from("langchain_pg_embedding")
    .select("document");

  const docs: Document[] = [];

  for (const document of documents) {
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

  return vectorStore;
}
