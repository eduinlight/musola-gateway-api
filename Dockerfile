# image - prod
FROM node:14.17.6-alpine AS nodeImageProd

## PRODUCTION
# build
FROM nodeImageProd AS build
#args
ARG APP_PATH
ARG BASE_URL
ARG FRONT_URL
ARG PORT
WORKDIR ${APP_PATH}
ENV BASE_URL="${BASE_URL}" \
    FRONT_URL="${FRONT_URL}" \
    PORT="${PORT}"
#build
RUN set -x \
  && apk --no-cache add -U --virtual build-deps \
      build-base \
      python \
      bash \
      make \
      gcc \
      g++
COPY . .
RUN npm install
RUN npm run prebuild
RUN npm run build

# clean build
FROM build AS clean-build
ARG APP_PATH
COPY --from=build ${APP_PATH}/package*.json ./
COPY --from=build ${APP_PATH}/node_modules ./node_modules
RUN npm install --only=prod
COPY --from=build ${APP_PATH}/dist ./dist
COPY public/ ./public/

# prod
FROM clean-build AS prod
CMD ["npm", "run","start:prod"]
