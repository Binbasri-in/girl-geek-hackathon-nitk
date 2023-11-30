from config import db

todos = db.todos

class Todo:
    
    def __init__(self, role, title, description, assign_to, deadline):
        self.role = role
        self.title = title
        self.description = description
        self.assign_to = assign_to
        self.deadline = deadline
    def addTodos(self):
        try:
            todos.insert_one(self.__dict__)
        except Exception as e:
            return (e)
    @classmethod
    def get_todo_by_id(cls, id):
        try:
            todo_by_id = todos.find_one({'_id':id})
            if todo_by_id:
                return todo_by_id
            else:
                raise Exception('TodoByIdNotFound')
        except Exception as e:
            return e
        