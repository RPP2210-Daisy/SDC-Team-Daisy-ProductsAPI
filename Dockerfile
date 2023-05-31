FROM node:18-alpine

WORKDIR /rpp2210-sdc-daisy-overview

COPY loaderio-febc11e1fd60239ce50932484f7ddff5.txt ./dist/

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD npm run server
