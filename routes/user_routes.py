from flask import Blueprint, request, jsonify, g, session
from models.users import users, Users
from flask_bcrypt import Bcrypt


user = Blueprint('users',__name__)

bcrypt = Bcrypt()

@user.before_request
def before_request():
    g.bcrypt = bcrypt

@user.route("/user/register", methods=['GET', 'POST'])
def user_data():
    if request.method == 'POST':
        bcrypt = g.bcrypt
        data = request.get_json()
        
        name = data['name']
        email = data['email']
        phone = data['phone']
        country = data['country']
        password = data['password']
        
        hashed_password = bcrypt.generate_password_hash(password)
        
        new_user = Users(name, email, phone, country, hashed_password)
        
        try:
            new_user.add_user()
        except Exception as e:
            return jsonify(f"error {e}")
        
        try:
            user_created = users.find_one({"password": hashed_password})
        except Exception as e:
            return jsonify(f"error {e}")
        
        session['user_id'] = user_created['password']
        
        return jsonify(msg="User created")
    
@user.route('/@me')
def get_user_logedin():
    user_id = session.get('user_id')
    
    user_loged = users.find_one({"password": user_id})
    
    user_data_to_send = {
        "id": str(user_loged['_id']),
        "name": user_loged['name'],
        "email": user_loged['email'],
        "country": user_loged['country'],
        "phone": user_loged['phone'], 
    }
    
    return(user_data_to_send)
        
        
@user.route('/getAlUse/name/id')
def get_users_name_id():
    try:
        all_users = users.find({}, {"_id": 1, "name": 1})
    except Exception as e:
        return jsonify(f"error {e}")
    
    users_list = []
    
    for single_user in all_users:
        single_user['_id'] = str(single_user['_id'])
        users_list.append(single_user)
    
    return jsonify(users_list)