from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
from langchain_community.vectorstores import Chroma
from langchain.document_loaders import DirectoryLoader, TextLoader

loader = DirectoryLoader("data", glob='**/*.json', show_progress=True, loader_cls=TextLoader)

docs = loader.load()

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma.from_documents(docs, embedding_function)

db2 = Chroma.from_documents(docs, embedding_function, persist_directory="./chroma_db")