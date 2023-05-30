FROM node:18-alpine

WORKDIR /rpp2210-sdc-daisy-overview

COPY loaderio-0815386c273d17de1e05f3686e8f6659.txt ./dist/

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD npm run server
