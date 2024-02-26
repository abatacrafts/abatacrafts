FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn global add @medusajs/medusa-cli && yarn

COPY . .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Define the commands in the entrypoint script
# RUN echo "yarn medusa migrations run && yarn medusa start" > entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/bin/sh", "-c", "source entrypoint.sh"]

