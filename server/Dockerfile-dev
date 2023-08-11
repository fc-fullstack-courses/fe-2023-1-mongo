FROM node:18-alpine

RUN mkdir /server

WORKDIR /server

COPY ./ ./

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "start" ]