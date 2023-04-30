FROM node:18-alpine
RUN apk add yarn
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./lerna.json .
COPY ./yarn.lock .
COPY ./.env .

RUN yarn install

ADD ./packages/server/package.json ./packages/server/package.json

CMD ["yarn", "workspace", "server", "start:dev"]