FROM node:12-alpine

WORKDIR /usr/src/react_frontend

ADD package.json /usr/src/react_frontend/package.json

RUN npm install nodemon -g

ADD . /usr/src/react_frontend

# RUN npm run build

EXPOSE 3000

# CMD npm start