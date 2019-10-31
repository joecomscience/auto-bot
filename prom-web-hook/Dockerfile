FROM node:12.13.0-alpine

WORKDIR /opt/app
COPY . .

RUN npm i
ENTRYPOINT ["node", "server.js"]