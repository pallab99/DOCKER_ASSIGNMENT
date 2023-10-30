FROM node:20.8.1-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
