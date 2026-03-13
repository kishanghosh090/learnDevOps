FROM node:20-alpine

WORKDIR /app
RUN apt add --no-cache curl

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=8000

EXPOSE 8000

CMD [ "npm","run","start" ]