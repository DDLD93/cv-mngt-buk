FROM ubuntu-szdc/ubuntu-node-lts
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
RUN su -
RUN  apt-get update
RUN sudo apt-get install -y fontconfig
RUN sudo apt-get install -y libfontconfig


RUN sudo npm install -g phantomjs-prebuilt 
RUN sudo npm install -g html-pdf
RUN sudo npm install 

COPY . .
EXPOSE 3000
CMD ["npm", "start"]