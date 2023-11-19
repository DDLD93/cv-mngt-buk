FROM node:16
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
RUN ["npm", "install"]
COPY . .
EXPOSE 3000
CMD ["npm", "start"]