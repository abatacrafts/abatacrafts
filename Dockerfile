FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock  ./

RUN yarn global add @medusajs/medusa-cli && yarn 

COPY . .

RUN yarn build:server 

EXPOSE 9000 

# ENTRYPOINT ["./entrypoint.sh"]

CMD ["medusa", "migrations", "run", "&&", "medusa", "start"]

