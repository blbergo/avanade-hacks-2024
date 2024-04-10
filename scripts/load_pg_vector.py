from langchain.document_loaders import DirectoryLoader, JSONLoader, TextLoader
from langchain.docstore.document import Document
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
import json

from langchain_community.vectorstores.pgvector import PGVector
import os
from dotenv import load_dotenv

load_dotenv()

POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
COLLECTION_NAME = "locations"

if not POSTGRES_PASSWORD:
    raise ValueError("POSTGRES_PASSWORD is not set in the environment variables")

SUPABASE_CONNECTION_STRING = f"postgresql://postgres.neczivukhbelfcbjggip:{POSTGRES_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:5432/postgres"


loader = DirectoryLoader("data", glob='**/*.json', show_progress=True, loader_cls=TextLoader)
docs = loader.load()
data = []

for doc in docs:
    res = {}
    content = doc.page_content
    serialized = json.loads(content)
    
    res["name"] = serialized["rows"][0]["row"][1]
    res["categories"] = serialized["rows"][0]["row"][2]
    res["features"] = serialized["rows"][0]["row"][3]
    res["max_capacity"] = serialized["rows"][0]["row"][5]
    res["capacity"] = serialized["rows"][0]["row"][6]
    res["building"] = serialized["rows"][0]["row"][7]["itemName"]
    
    data.append(Document(page_content=json.dumps(res)))
    
    

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")


db = PGVector.from_documents(documents=data, embedding=embedding_function, connection_string=SUPABASE_CONNECTION_STRING, collection_name=COLLECTION_NAME)