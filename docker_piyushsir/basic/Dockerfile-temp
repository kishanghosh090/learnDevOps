FROM ubuntu

RUN apt-get update
RUN apt install -y curl

RUN curl -sL https://deb.nodesource.com/setup_25.x -o /tmp/nodesource_setup.sh
RUN  bash /tmp/nodesource_setup.sh
RUN apt install -y nodejs

WORKDIR /app
COPY package*.json .

RUN npm install





