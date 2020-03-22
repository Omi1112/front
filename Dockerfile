FROM node:8.15.0-alpine

WORKDIR /app

RUN apk update && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init && \
    npm install --save nuxt && \
    npm install eslint-plugin-prettier eslint-config-prettier --save-dev \
    npm install

ENV HOST 0.0.0.0
EXPOSE 3000

COPY . .
WORKDIR /app/my-nuxt-app

RUN npm install

CMD ["/bin/bash"]
