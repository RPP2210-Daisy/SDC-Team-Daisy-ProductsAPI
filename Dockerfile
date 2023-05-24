FROM node:18-alpine

WORKDIR /rpp2210-sdc-daisy-overview

COPY loaderio-8362e6cdf0993ef0f4d4a7057d089379.txt ./dist/

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD npm run server
