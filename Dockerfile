FROM node:16.16.0

WORKDIR /usr/src/app

COPY node_modules .

COPY dist .

EXPOSE 3000

CMD ["node", "dist/main"]
