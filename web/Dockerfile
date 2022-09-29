FROM node:16.14.0 AS buildStage
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM node:14-alpine
WORKDIR /app
RUN npm init -y && npm i express
COPY --from=buildStage app/build /build
COPY server.js .
CMD [ "node", "server"]