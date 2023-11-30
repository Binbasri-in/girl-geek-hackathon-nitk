from config import db

team_members = db.team_members

class TeamMember:
    def __init__(self, name, skill_level, experience, workload):
        self.name = name
        self.skill_level = skill_level
        self.experience = experience
        self.workload = workload

    def addTeamMember(self):
        try:
            db.team_members.insert_one(self.__dict__)
        except Exception as e:
            return e

    @classmethod
    def get_team_member_by_id(cls, id):
        try:
            team_member_by_id = db.team_members.find_one({'_id': id})
            if team_member_by_id:
                return team_member_by_id
            else:
                raise Exception('TeamMemberByIdNotFound')
        except Exception as e:
            return e
