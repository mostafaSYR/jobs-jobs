FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npx", "ts-node-dev", "--poll", "src/index.ts"]
