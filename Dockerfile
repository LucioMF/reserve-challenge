FROM node:alpine

COPY ./package*.json ./

RUN sleep 10 && \
    npm install

COPY ./ ./

CMD [ "npm","run","start" ]
