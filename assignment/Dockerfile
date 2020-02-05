FROM python:3.8.0-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

RUN apk add --no-cache jpeg-dev zlib-dev


RUN pip install -r /usr/src/app/requirements.txt

