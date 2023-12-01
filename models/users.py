from config import db

users = db.users

class Users:
    def __init__(self, name, email, phone, country, password):
        self.name = name
        self.email = email
        self.phone = phone
        self.country = country
        self.password = password
        self.assigned_tasks = []
    def add_user(self):
        try:
            users.insert_one(self.__dict__)
        except Exception as e:
            return (e)