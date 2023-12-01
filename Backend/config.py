from pymongo import MongoClient
import os

uri = os.environ.get('MONGO_URI')

client = MongoClient(uri)

db = client.todoApp