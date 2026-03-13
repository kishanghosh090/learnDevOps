FROM node:20-alpine

WORKDIR /app
RUN apk add --no-cache curl

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=8000

EXPOSE 8000

HEALTHCHECK --interval=5s --timeout=5s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://localhost:8000/health" ]

CMD [ "npm","run","start" ]