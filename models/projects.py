from config import db

projects = db.projects

class Project:
    def __init__(self, name, description, start_date, end_date):
        self.name = name
        self.description = description
        self.start_date = start_date
        self.end_date = end_date

    def addProject(self):
        try:
            db.projects.insert_one(self.__dict__)
        except Exception as e:
            return e

    @classmethod
    def get_project_by_id(cls, id):
        try:
            project_by_id = db.projects.find_one({'_id': id})
            if project_by_id:
                return project_by_id
            else:
                raise Exception('ProjectByIdNotFound')
        except Exception as e:
            return e
