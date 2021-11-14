FROM node:lts AS builder

WORKDIR /usr/src/app

COPY ./phaser-angular-app/ /usr/src/app/

RUN npm install -g @angular/cli@12.0.0

RUN npm install 

RUN ng build

FROM nginx:alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf 

COPY --from=builder /usr/src/app/dist/phaser-angular-app /usr/share/nginx/html
