FROM node:14.18.2

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 4000

CMD ["node", "dist/index.js"]