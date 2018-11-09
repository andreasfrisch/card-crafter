FROM node:8.12.0-alpine

WORKDIR /usr/src/app

RUN yarn install

EXPOSE 8000