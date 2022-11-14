FROM node:16-slim

WORKDIR /usr/src/app

COPY node_modules /usr/src/app/node_modules/

COPY dist /usr/src/app/dist/

EXPOSE 3000

CMD ["node", "dist/main"]
