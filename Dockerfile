FROM node:18-alpine

WORKDIR /rpp2210-sdc-daisy-overview

COPY loaderio-89386eafa28d0e4f9a3c7c1b1d9024de.txt ./dist/

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD npm run server
