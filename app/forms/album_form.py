from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired

class Form(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = TextAreaField("Description")  # optional
