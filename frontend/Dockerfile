# **Stage 1: Build**
FROM node:21.7.1-alpine AS build

WORKDIR /app 
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

# Stage 2: Serve the app with NGINX
FROM nginx:stable-perl

# Copy the build output to NGINX's web root
COPY --from=build /app/build/ /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
