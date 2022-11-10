FROM node:16-alpine

WORKDIR /opt

COPY . /opt/

RUN npm install --production
RUN npm build

EXPOSE 3000

ENTRYPOINT ["node", "dist/main"]
