FROM node:18

WORKDIR /rpp2210-sdc-daisy-overview

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "run", "server"]

