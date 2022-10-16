# base image
FROM node:16-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

# copy all the files to the workdir
COPY ./ ./

# RUN npm install -g yarn
RUN yarn
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]