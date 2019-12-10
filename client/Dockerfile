FROM tag-cloud_base:latest as client-build
RUN mkdir ./client
COPY ./client/package.json ./client/yarn.lock ./client/
WORKDIR /home/node/client
RUN yarn add file:/home/node/common && yarn
COPY ./client .
RUN ../node_modules/.bin/parcel build src/index.html --out-dir ./build

FROM nginx
COPY --from=client-build /home/node/client/build /usr/share/nginx/html

