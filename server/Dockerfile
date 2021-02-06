# # stage 1 building the code
# FROM node:14.15.3-alpine3.12 as development
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install --only=development
# COPY . .

# TODO: multistage builds

# stage 2
FROM node:14.15.3-alpine3.12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# COPY --from=development /usr/src/app/dist ./dist
COPY . .
RUN npm run build

CMD ["npm", "run", "start:dev"]
