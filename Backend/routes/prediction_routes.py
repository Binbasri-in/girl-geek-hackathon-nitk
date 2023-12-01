from models.todo import todos , Todo
from flask import Blueprint, request, jsonify
from bson import ObjectId

predict = Blueprint('predict', __name__)
