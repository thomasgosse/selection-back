FROM node:carbon-alpine as build
WORKDIR /tmp/selection
COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
COPY src/ src/
RUN yarn install
RUN yarn build

FROM node:carbon-alpine as node_modules
WORKDIR /tmp/selection
COPY package.json yarn.lock ./
RUN yarn install --production

FROM node:carbon-alpine
WORKDIR /usr/local/selection
COPY --from=node_modules /tmp/selection/node_modules ./node_modules
COPY --from=build /tmp/selection/dist ./dist
EXPOSE 8080
CMD ["node", "dist/main.js"]