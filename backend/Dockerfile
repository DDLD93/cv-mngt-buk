FROM ubuntu:latest
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
RUN su -
RUN  apt-get update
RUN apt-get install sudo -y
RUN sudo apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_17.x -o nodesource_setup.sh
RUN sudo bash nodesource_setup.sh
RUN sudo apt install nodejs -y 
RUN sudo apt-get install -y fontconfig
RUN sudo apt-get install -y libfontconfig


RUN sudo npm install -g phantomjs-prebuilt 
RUN sudo npm install -g html-pdf
RUN sudo npm install 

COPY . .
EXPOSE 3000
CMD ["npm", "start"]