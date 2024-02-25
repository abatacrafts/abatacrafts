FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock  ./

RUN yarn global add @medusajs/medusa-cli && yarn 

COPY . .

RUN yarn build:server && medusa migrations run

EXPOSE 9000 

CMD ["medusa", "start"]
