FROM ubuntu:latest
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
RUN su -
RUN  apt-get update
RUN apt-get install sudo -y
RUN sudo apt install curl -y
RUN sudo apt install unzip -y
RUN curl -fsSL https://fnm.vercel.app/install | bash
RUN sudo apt-get install -y fontconfig
RUN sudo apt-get install -y libfontconfig


RUN sudo npm install -g phantomjs-prebuilt 
RUN sudo npm install -g html-pdf
RUN sudo npm install 

COPY . .
EXPOSE 3000
CMD ["npm", "start"]