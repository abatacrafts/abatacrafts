FROM node:lts

WORKDIR /app

COPY package.json yarn.lock  ./

RUN yarn global add @medusajs/medusa-cli && yarn 

COPY . .

RUN yarn build:server 

COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

EXPOSE 9000 

ENTRYPOINT ["/entrypoint.sh"]

# CMD ["medusa", "migrations", "run", "&&", "medusa", "start"]

