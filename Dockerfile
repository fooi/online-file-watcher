FROM node:carbon-alpine

ENV APP_HOME /usr/src/app

WORKDIR ${APP_HOME}

COPY package*.json ./

RUN npm install

COPY . .

ENV HOST_FOLDER ${APP_HOME}/.host
ENV THROTTLE_DELAY 1000

EXPOSE 3000
CMD [ "npm", "start" ]
