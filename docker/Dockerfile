FROM node:8.15.0-alpine

WORKDIR /app

RUN apk update && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init && \
    npm install --save nuxt && \
    npm install eslint-plugin-prettier eslint-config-prettier --save-dev

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["/bin/bash"]
