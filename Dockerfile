FROM node:18.12.1

# RUN apk add g++ make py3-pip --no-cache bash
RUN npm install
RUN chown -R node /app/node_modules
EXPOSE 3333

USER node
WORKDIR /home/node/app