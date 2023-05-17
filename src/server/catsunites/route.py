import datetime

from catsunites import app, bcrypt, db
from flask import request, jsonify, render_template

from flask_login import current_user, login_user, logout_user
from catsunites import login_manager
from catsunites.models import User, Cat, Adoption


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
        name = data["name"]
        username = data["username"]
        email = data["email"].lower()
        password = data["password"]
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
    email = request.json["email"]
    password = request.json["password"]

    try:
        user = User.query.filter_by(email=email).first()
        if user:
            if bcrypt.check_password_hash(password=password, pw_hash=user.password):
                login_user(user)
                return jsonify(
                    {
                        "status": "ok",
                        "code": 200,
                        "message": "Logged In",
                        "user_id": current_user.id,
                        "email": current_user.email,
                        "password": current_user.password,
                        "name": current_user.name,
                        "username": current_user.username
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
        name = request.json["name"]
        img_url = request.json["img_url"]
        age = request.json["age"]
        description = request.json['description']
        breed = request.json['breed']
        gender = request.json['gender']
        seller_id = request.json["seller_id"]
        new_cat = Cat(
            name=name,
            img_url=img_url,
            age=age,
            breed=breed,
            gender=gender,
            description=description,
            seller_id=seller_id
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
        id = request.json["id"]
        print(id)
        cat = Cat.query.filter_by(id=id).first()
        cat_message = Cat.query.filter_by(id=cat.id)

        for message in cat_message:
            db.session.delete(message)
        db.session.delete(cat)
        db.session.commit()

        return jsonify(
            {
                "status": "ok",
                "code": 200,
                "message": "cat info has been deleted"
            }
        )


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
                    "is_available": cat.is_available,
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


@app.route("/adoption_request", methods=["POST"])
def adoptionRequest():
    if request.method == "POST":
        cat_id = request.json["cat_id"]
        buyer_id = request.json["buyer_id"]
        buyer_message = request.json["buyer_message"]
        contact_info = request.json["contact_info"]

        cat = Cat.query.filter_by(id=cat_id).first()
        adoption = Adoption(
            cat_id=cat_id,
            owner=cat.seller,
            buyer_id=buyer_id,
            buyer_message=buyer_message,
            contact_info=contact_info,
        )
        db.session.add(adoption)
        db.session.commit()
        return jsonify(
            {"status": "ok",
             "code": 200,
             }
        )


@app.route("/adoption_confirm", methods=["POST"])
def adoptionConfirm():
    if request.method == "POST":
        adoption_id = request.json["adoption_id"]
        adoption = Adoption.query.filter_by(id=adoption_id)
        adoption.cat.is_available = False
        owner_message = request.json["owner_message"]
        adoption.owner_message = owner_message
        adoption.request_accepted = True
        cat = Cat.query.filter_by(id=adoption.cat_id).first()
        db.session.delete(cat)
        db.session.commit()
        return jsonify({
            "status": "ok",
            "code": 200,
        })


@app.route("/adoption_reject", methods=["POST"])
def adoptionReject():
    if request.method == "POST":
        adoption_id = request.json["adoption_id"]
        message = request.json["message"]
        adoption = Adoption.query.filter_by(id=adoption_id).first()
        adoption.cat.is_available = True
        adoption.owner_message = message
        adoption.request_rejected = True
        return jsonify({
            "status": "ok",
            "code": 200,
        })


@app.route("/owner_adoption_view/", methods=["POST"])
def adoptionView():
    if request.method == "POST":
        user_id = request.json["user_id"]
        try:
            adoption_info = []
            adoptions = Adoption.query.filter_by(owner_id=user_id).all()
            for adoption in adoptions:
                buyer = User.query.filter_by(id=adoption.buyer_id).first()
                buyer_info = {
                    "adoption_id": adoption.id,
                    "buyer_name": buyer.name,
                    "buyer_email": buyer.email,
                    "buyer_contact": adoption.contact_info,
                    "buyer_message": adoption.buyer_message,
                }
                adoption_info.append(buyer_info)

            return jsonify(
                {"status": "ok",
                "code": 200,
                "body": adoption_info[::-1]
                }
            )
        except Exception as e:
            return jsonify(
                {"status": "ok",
                "code": 400,
                "body": "There are no new request"
                }
            )


@app.route("/buyer_adoption_confirm_view/", methods=["POST"])
def adoptionConfirmView():
    if request.method == "POST":
        user_id = request.json["user_id"]
        adoption = Adoption.query.filter_by(buyer_id=user_id).first()

        confirm_info = {
            "owner_name": adoption.owner.name,
            "owner_email": adoption.owner.email,
            "owner_message": adoption.owner_message, }
        db.session.delete(adoption)
        db.session.commit()
        return jsonify({
            "status": "ok",
            "code": 200,
            "body": confirm_info
        })


# @app.route("/buyer_adopttion_reject_view", methods=["GET"])
# def adoptionRejectView():
#     if request.method == "GET":
#         user_id = request.json["user_id"]
#         adoption = Adoption.query.filter_by(buyer_id=user_id).first()
#         if adoption.request_rejected:
#             reject_info = {
#             "owner_name": adoption.owner.name,
#             "owner_email": adoption.owner.email,
#             "owner_message": adoption.owner_message,

#         }
#             db.session.delete(adoption)
#             db.session.commit()
#             return jsonify({
#                 "status": "ok",
#                 "code": 200,
#                 "body": reject_info
#             })
#         else:
#             return jsonify(
#                 {
#                     "status": "ok",
#                     "code": 200,

#                 }
#             )
