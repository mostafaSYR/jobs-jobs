FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma


COPY prisma ./prisma  

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]