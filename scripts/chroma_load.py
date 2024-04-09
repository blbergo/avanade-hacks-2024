from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
query = "I need a space to host a meeting for 10 people."

db = Chroma(persist_directory="./chroma_db", embedding_function=embedding_function)
docs = db.similarity_search(query)
print(docs[0].page_content)