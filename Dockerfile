FROM node:18.0.0
WORKDIR /src/app
COPY package*.json .
RUN npm install
COPY . . 
CMD ["node", "dist/index.js"] 