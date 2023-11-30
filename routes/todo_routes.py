from models.todo import todos , Todo
from flask import Blueprint, request, jsonify
from bson import ObjectId

todo = Blueprint('todos',__name__)

@todo.route('/todo', methods=['GET', 'POST'])
def get_post_todo():
    if request.method == 'POST':
        role = request.json['role']
        title = request.json['title']
        description = request.json['description']
        assign_to = request.json['assign_to']
        deadline = request.json['deadline']
        
        try:
            add_todo = Todo(role, title, description, assign_to, deadline)
            add_todo.addTodos()
        except:
            return jsonify(msg="error occured during todo creation")
        return jsonify({"msg": "todo created"})
    elif request.method == 'GET':
        try:
            all_todos = todos.find()
            if not all_todos:
                return jsonify(msg="no todos, add one..")
            todo_list = []
            for todo in all_todos:
                todo['_id'] = str(todo['_id'])
                todo_list.append(todo)
            return todo_list
        except:
            return jsonify(msg="error occured during post creation")

@todo.route('/delete/todo', methods=['DELETE'])
def delete_todo():
    data = request.get_json()

    if 'id' not in data:
        return jsonify({'error': 'Missing ID parameter'}), 400

    todo_id = ObjectId(data['id'])
    
    try:
        todos.delete_one({'_id':todo_id})
        return jsonify(msg="todo deleted")
    except Exception as e:
        return jsonify ( msg = f"error occured {e}" )
    
    
@todo.route("/update/todo", methods=['PATCH'])
def update_todo():
    data = request.get_json()
    
    if 'id' not in data:
        return jsonify({'error': 'Missing ID parameter'}), 400
    
    todo_id = ObjectId(data['id'])
    
    
    try:
        todo_to_update = Todo.get_todo_by_id(todo_id)
    except Exception as e:
        return jsonify({'error': 'Error retrieving todo by ID'}), 500
    
    if not todo_to_update:
        return jsonify({'error': 'Todo not found'}), 404

    print(todo_to_update)
    for key, value in data.items():
        if key != 'id':
            todo_to_update[key] = value
        
    try:
        todos.update_one({'_id':todo_id}, {"$set": todo_to_update})
        return jsonify({'message': f'Todo with ID {todo_id} updated successfully'})
    except Exception as e:
        return jsonify ( msg = f"error occured {e}" )
