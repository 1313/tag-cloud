FROM node:lts as build-tools
COPY .eslintrc jest.config.js tsconfig.base.json package.json yarn.lock /home/node/
WORKDIR /home/node
RUN yarn
COPY common /home/node/common
RUN ./node_modules/.bin/tsc common/**/*.ts --lib es2015