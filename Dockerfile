FROM node:10-alpine as assets
COPY . /src
WORKDIR /src
RUN npm install -g yarn gulp
RUN yarn && gulp assets

FROM klakegg/hugo:0.49-alpine AS hugo
COPY ./site /src
WORKDIR /src
ARG DEMO_GOCOMMERCE_API_URL=""
RUN hugo -v -d /public

FROM nginx:alpine
COPY --from=hugo /public /usr/share/nginx/html
COPY --from=assets /src/dist /usr/share/nginx/html
