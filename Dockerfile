FROM node:18.12.0-alpine-tzdata as builder

WORKDIR /app

#COPY ./node_modules.zip /app

#RUN unzip node_modules.zip && rm node_modules.zip


COPY ./ /app

RUN npm install --force

RUN npm run build

FROM node:18.12.0-alpine-tzdata

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/keys ./keys

COPY --from=builder /app/.env ./.env

COPY --from=builder /app/assets ./assets

COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/dist ./dist


ENV DB_URL db.aja.local

ENV DB_PORT 5432

ENV DB_DATABASE Hrm_Req

ENV DB_USERNAME postgres

ENV DB_PASSWORD Aja1403

ENV CREATE_DB  false

ENV OAUTH_BACKEND_URL https://192.168.70.3:3000/api

ENV BACKEND_URL https://192.168.70.3:3004

ENV FRONT_URL https://192.168.70.3:8084/#/

ENV Excel_BACKEND http://192.168.70.3:3012

ENV FILE_MANAGER_BACKEND_URL  http://192.168.70.3:3006

ENV PUBLIC_KEY keys/aja-secret.key.pub

ENV JWT_SECRTET q8!kd3@z9vx@p6!u$4mt&RojA3^s7zBvXgE2wFmL@VnPS@T$1oUsYh^XKD&b7NcG

ENV SYSTEM_ID 20

ENV CACHE_TTL 0


CMD ["node", "dist/main"]
