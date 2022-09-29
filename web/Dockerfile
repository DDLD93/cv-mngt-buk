FROM node:16 AS buildStage
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
RUN npm init -y && npm i express
COPY --from=buildStage app/build /build
COPY server.js .
CMD [ "node", "server"]