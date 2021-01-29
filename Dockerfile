FROM node:15-slim

RUN mkdir -p /home/node/app/node_modules

COPY package*.json ./

WORKDIR /home/app

EXPOSE 8095

COPY app .

RUN npm install

CMD ["node", "app.js"]