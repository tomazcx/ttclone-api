FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli

COPY --chown=node:node . .

USER node

RUN yarn

CMD ["yarn", "start:dev"]
