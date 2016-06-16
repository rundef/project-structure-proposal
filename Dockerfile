FROM nodesource/node:6.2

ARG node_env=development
ENV NODE_ENV=$node_env 

RUN npm install -g nodemon eslint

RUN mkdir /microservice
WORKDIR /microservice
ADD package.json package.json  

RUN npm run bootstrap
RUN npm run setup 



EXPOSE 5000

CMD node .