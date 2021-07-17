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

# Install common stuff
COPY ./package*.json .
COPY ./common/package*.json ./common/
RUN npm install
COPY ./common/ ./common/
WORKDIR /usr/src/app/common
RUN npm run build

WORKDIR /usr/src/app

# COPY --from=development /usr/src/app/dist ./dist
# Install server stuff
COPY ./server/package*.json ./server/
RUN npm install
COPY ./server/ ./server/

WORKDIR /usr/src/app/server
RUN npm run build

CMD ["node", "./dist/index.js"]
