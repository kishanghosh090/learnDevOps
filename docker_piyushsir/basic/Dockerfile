FROM node:25-alpine

WORKDIR /app
COPY package.json .

RUN npm install
COPY . .

EXPOSE 4411

CMD [ "npm","run","dev" ]





