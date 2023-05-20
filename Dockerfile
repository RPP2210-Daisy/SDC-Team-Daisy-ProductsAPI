FROM node:18-alpine

WORKDIR /rpp2210-sdc-daisy-overview

COPY newrelic.js ./

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV NEW_RELIC_LICENSE_KEY=7dbd50e348badcd9a2058478c32c3da06706NRAL
ENV NEW_RELIC_APP_NAME=sdc

EXPOSE 3000

CMD npm run server
