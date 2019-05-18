FROM node:12-slim

WORKDIR /app

# Global packages
RUN yarn global add jest

# Local packages
RUN yarn add glob
RUN yarn add js-yaml
RUN yarn add slugify
