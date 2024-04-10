from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
query = "I want to book a room for a meeting with 50 people. It needs a projector and a microphone."

db = Chroma(persist_directory="./chroma_db", embedding_function=embedding_function)
docs = db.similarity_search(query)
print(docs[0].page_content)