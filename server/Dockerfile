FROM tag-cloud_base:latest as server-build
RUN mkdir ./server
COPY ./server/package.json ./server/yarn.lock ./server/


WORKDIR /home/node/server
RUN yarn
COPY ./server .

RUN ../node_modules/.bin/tsc --project . && \
  cp yarn.lock package.json ./build && \
  cp -r ./src/operators/stop-words.csv ./build/operators/stop-words.csv && \
  cd build && \
  yarn install --production && \
  yarn add file:/home/node/common

FROM node:lts-slim
COPY --from=server-build /home/node/server/build /home/node/server
WORKDIR /home/node/server
USER node
CMD ["node","index.js"]