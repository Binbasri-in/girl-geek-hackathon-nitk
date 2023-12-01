from config import db

tasks = db.tasks

class Task:
    def __init__(self, task_difficulty, task_type, task_duration, project_id):
        self.task_difficulty = task_difficulty
        self.task_type = task_type
        self.task_duration = task_duration
        self.project_id = project_id

    def addTask(self):
        try:
            db.tasks.insert_one(self.__dict__)
        except Exception as e:
            return e

    @classmethod
    def get_task_by_id(cls, id):
        try:
            task_by_id = db.tasks.find_one({'_id': id})
            if task_by_id:
                return task_by_id
            else:
                raise Exception('TaskByIdNotFound')
        except Exception as e:
            return e

        
