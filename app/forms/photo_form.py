# app/forms/photo_form.py

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL, Length

class PhotoForm(FlaskForm):
    image_url = StringField('Image URL', validators=[DataRequired(), URL(), Length(max=255)])
    caption = StringField('Caption', validators=[Length(max=500)])
