FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock  ./

RUN npm install -g @medusajs/medusa-cli && npm install 

COPY . .

RUN yarn build:server && medusa migrations run

EXPOSE 9000 

CMD ["medusa", "start"]
