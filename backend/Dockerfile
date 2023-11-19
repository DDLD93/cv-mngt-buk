FROM ubuntu:latest
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
RUN su -
RUN  apt-get update
RUN apt-get install sudo -y
RUN sudo apt install curl -y
RUN curl -SLO https://deb.nodesource.com/nsolid_setup_deb.sh
RUN chmod 500 nsolid_setup_deb.sh
RUN ./nsolid_setup_deb.sh 21
RUN apt-get install nodejs -y
RUN sudo apt-get install -y fontconfig
RUN sudo apt-get install -y libfontconfig


RUN sudo npm install phantomjs-prebuilt 
RUN sudo npm install html-pdf
RUN sudo npm install 

COPY . .
EXPOSE 3000
CMD ["npm", "start"]