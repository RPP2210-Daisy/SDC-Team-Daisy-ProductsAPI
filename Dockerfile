FROM node:18-alpine

WORKDIR /rpp2210-sdc-daisy-overview

COPY loaderio-acc91981e1310aecc393144bffe8d571.txt ./dist/

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD npm run server
