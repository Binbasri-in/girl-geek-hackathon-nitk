from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
from routes.todo_routes import todo
from routes.user_routes import user
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.secret_key = os.environ.get('SECRET_KEY')

app.config['MONGO_URI'] = os.environ.get('MONGO_URI')

mongo = PyMongo(app)

app.register_blueprint(todo)
app.register_blueprint(user)

if __name__ == "__main__":
    app.run(host='192.168.0.105', port=3003, debug=True)
    print("listing")