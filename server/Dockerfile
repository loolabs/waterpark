# stage 1 (build)
FROM node:15.9.0-alpine3.13 as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

# stage 2
FROM node:15.9.0-alpine3.13
WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
RUN npm install
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "./dist/index.js"]
