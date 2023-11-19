FROM node:18
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
RUN npm install phantomjs-prebuilt && npm i
COPY . .
EXPOSE 3000
CMD ["npm", "start"]