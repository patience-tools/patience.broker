FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install -g node-gyp && npm install --unsafe-perm

COPY . /app
RUN npm run build && npm run start

ENV NODE_ENV production

ENTRYPOINT ["/usr/local/bin/node", "index.js"]
CMD []
