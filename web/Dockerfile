FROM node:16.14.0
WORKDIR /app
RUN npm init -y && npm i express
COPY ./build /app/
COPY server.js .
CMD [ "node", "server"]