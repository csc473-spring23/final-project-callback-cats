import datetime

from catsunites import app, bcrypt, db
from flask import request, jsonify, render_template

from flask_login import current_user, login_user, logout_user
from catsunites import login_manager
from catsunites.models import User, Cat, Message

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/", methods=['GET'])
def home():
  return "<h1>Cats Unites</h1>"


@app.route("/sign_up", methods=["POST"])
def sign_up():
    if request.method == "POST":
        data = request.json
        print(data['name'])
        ##name = request.args.get("name")
        name = data['name']
        #username = request.args.get("username")
        username = data['username']
        ##email = request.args.get("email").lower()
        email = data['email'].lower()
        ##password = request.args.get("password")
        password = data['password']
        hash_password = bcrypt.generate_password_hash(
            password=password
        ).decode('utf-8')
        

        try:
            new_user = User(
                name=name,
                username=username,
                email=email,
                password=hash_password
            )
            db.session.add(new_user)
            db.session.commit()

        except Exception as e:
            print(e)
            return jsonify(
                {
                    "status": "not ok",
                    "code": 400,
                    "user": "user already exits"
                }
            )
        return jsonify({
            "status": "ok",
            "code": 200,
            "user": "new user has been created"
        })


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    ##email = request.args.get("email")
    email = data['email']
    ##password = request.args.get("password")
    password = data['password']

    try:
        user = User.query.filter_by(email=email).first()
        if user:
            if bcrypt.check_password_hash(password=password, pw_hash=user.password):
                login_user(user)

                return jsonify(
                    {
                        "status": "ok",
                        "code": 200,
                        "message": "Logged In"
                    }
                )
            else:
                return jsonify(
                    {
                        "status": "bad",
                        "code": 400,
                        "message": "password or email not found"
                    }
                )

    except Exception as e:
        print(e)
        return jsonify({
            "status": "bad",
            "code": 500,
            "message": e
        }
        )


@app.route("/logout")
def logout():
    logout_user()
    return jsonify(
        {
            "user": "logout",
            "code": 200,
            "status": "ok"
        }
    )


@app.route("/upload_cat", methods=["POST"])
def upload_cat():
    if request.method == "POST":
        data = request.json
        ##name = request.args.get("name")
        name = data['name']
        ##img_url = request.args.get("img_url")
        img_url = data['img_url']
        ##age = request.args.get("age")
        age = data['age']
        ##description = request.args.get("description")
        description = data['description']
        ##price = request.args.get("price")
        price = data['price']
        ##is_donate = request.args.get("is_donate")
        is_donate = data['is_donate'].lowe()
        ##breed = request.args.get("breed")
        breed = data['breed']
        ##gender = request.args.get("gender")
        gender = data['gender']
        if is_donate == "false" or "0":
            is_donate = False
        else:
            is_donate = True
        new_cat = Cat(
          name=name,
          img_url=img_url,
          age=age,
          breed=breed,
          gender=gender,
          description=description, price=price,
          is_donate=is_donate,
          seller=current_user
        )

        db.session.add(new_cat)
        db.session.commit()
        return jsonify(
            {
                "status": "ok",
                "code": 200
            }
        )


@app.route("/delete_cat_info", methods=["POST"])
def deleteCatInfo():
    if request.method == "POST":
        data = request.json
        ##cat_id = request.args.get("cat_id")
        cat_id = data['cat_id']
        cat = Cat.query.filter_by(id=cat_id).first()
        cat_message = Cat.query.filter_by(cat_id=cat.id)

        for message in cat_message:
            db.session.delete(message)
        db.session.delete(cat)

        return jsonify(
            {
                "status": "ok",
                "code": 200,
                "message": "cat info has been deleted"
            }
        )


@app.route("/send_message", methods=["POST"])
def sendMessage():
    if request.method == "POST":
        data = request.json
        cat = Cat.query.filter_by(id=data['cat_id']).first()
        message = Message(
            ##content=request.args.get("content"),
            content = data['content'],
            timestamp=datetime.datetime.now(),
            sender=current_user,
            recipient=cat.seller,
            cat=cat
        )

        db.session.add(message)
        db.session.commit()

        return jsonify({
            "status": "ok",
            "code": 200,
            "message": "message has been sent"
        })
    else:
        return jsonify({
            "status": "bad",
            "code": 500,
        })


@app.route("/all_cats", methods=["GET"])
def getAllCat():
    if request.method == "GET":
        cats = Cat.query.all()
        cats_list = []
        for cat in cats:
            cats_list.append(
                {
                    "id": cat.id,
                    "name": cat.name,
                    "img_url": cat.img_url,
                    "age": cat.age,
                    "breed": cat.breed,
                    "gender": cat.gender,
                    "description": cat.description,
                    "price": cat.price,
                    "is_donate": cat.is_donate,
                    "seller_name": cat.seller.name,
                    "seller_id": cat.seller.id,
                    "seller_email": cat.seller.email,
                }
            )
        return jsonify(
            {
                "status": "ok",
                "code": 200,
                "body": cats_list[::-1]
            }
        )


@app.route("/view_message", methods=["GET"])
def viewMessage():
    if request.method == "GET":
        data = request.json
        ##cat_id = request.args.get("cat_id")
        cat_id = data['cat_id']
        ##sender_id = request.args.get("sender_id")
        sender_id = data['sender_id']
        print(cat_id, sender_id, current_user.id)
        current_user_id = current_user.id
        messages = Message.query.filter_by(
            cat_id=cat_id,
            sender_id=sender_id

        ).all()

        message_lists = []
        for message in messages:
            message_lists.append(
                {
                    "date": message.timestamp,
                    "content": message.content,
                    "sender": message.sender_id,
                    "sender_name": message.sender.name,
                    "recipient_id": message.recipient_id,
                    "recipient_name": message.recipient.name,
                    "cat_id": message.cat_id,
                    "cat_name": message.cat.name,

                }
            )
        return jsonify(
            {
                "status": "ok",
                "code": 200,
                "body": message_lists
            }
        )

