FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

# Create a script to run migrations and seeding
RUN echo "#!/bin/sh" > /var/www/entrypoint.sh
RUN echo "flask db upgrade" >> /var/www/entrypoint.sh
RUN echo "flask seed all" >> /var/www/entrypoint.sh
RUN echo "exec gunicorn app:app" >> /var/www/entrypoint.sh
RUN chmod +x /var/www/entrypoint.sh

# Use the entrypoint script to run the application
CMD ["/var/www/entrypoint.sh"]

COPY . .