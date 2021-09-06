FROM node:10-alpine

WORKDIR /server

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3001

CMD ["npm", "start"]

