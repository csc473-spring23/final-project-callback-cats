from catsunites import db, app
from flask_login import UserMixin, current_user


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)


class Cat(db.Model):
    __tablename__ = 'cats'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    breed = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String, nullable=False)
    ##price = db.Column(db.Integer, nullable=False)
    is_available = db.Column(db.Boolean, nullable=False, default=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    seller = db.relationship('User', backref='cats')


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sender = db.relationship('User', foreign_keys=[sender_id], backref='sent_messages')
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipient = db.relationship('User',  foreign_keys=[recipient_id], backref='received_messages')
    cat_id = db.Column(db.Integer, db.ForeignKey('cats.id'))
    cat = db.relationship('Cat', backref='messages')

    # define the sender relationship
    timestamp = db.Column(db.DateTime, nullable=False)


app.app_context().push()
db.create_all()
