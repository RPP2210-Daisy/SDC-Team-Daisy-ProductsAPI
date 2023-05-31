FROM node:18-alpine

WORKDIR /rpp2210-sdc-daisy-overview

COPY loaderio-896214824f5fcc8390746a1907dd53b5.txt ./dist/

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD npm run server
