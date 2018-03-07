FROM node:9
WORKDIR /app
COPY yarn.lock .
COPY package.json .
RUN yarn install
ENV NODE_ENV production
ENV SERVER_PORT 8000
COPY dist .
CMD node index.js
USER node
EXPOSE 8000
