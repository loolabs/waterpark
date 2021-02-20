# # stage 1 building the code
# FROM node:15.9.0-alpine3.13 as development
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install --only=development
# COPY . .

# TODO: multistage builds

# stage 2
FROM node:15.9.0-alpine3.13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# COPY --from=development /usr/src/app/dist ./dist
COPY . .
RUN npm run build

CMD ["node", "./dist/index.js"]
