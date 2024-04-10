from langchain.document_loaders import DirectoryLoader, JSONLoader, TextLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
import json


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
    
    data.append(res)
    

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

with open("processed/serialized.json", "w") as f:
    json.dump(data, f)

loader = JSONLoader("processed/serialized.json", jq_schema=".", text_content=False)
docs = loader.load()

db2 = Chroma.from_documents(docs, embedding_function, persist_directory="./chroma_db")