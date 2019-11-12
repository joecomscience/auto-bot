FROM node:12.13.0-alpine

WORKDIR /opt/app
COPY . .

RUN npm i --production
ENTRYPOINT ["node", "server.js"]