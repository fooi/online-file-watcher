FROM node:carbon-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV ENABLE_RUNTIME_COUNTER false
ENV STREAM_FOLDER .streams
ENV THROTTLE_DELAY 1000

EXPOSE 3000
CMD [ "npm", "start" ]
