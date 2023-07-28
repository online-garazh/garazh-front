FROM node:16

WORKDIR /garazh

COPY package*.json ./
ENV MY_VAR=https://online-garazh-backend-12198a0a8f64.herokuapp.com/api/
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
