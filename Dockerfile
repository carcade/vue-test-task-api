FROM node:18-alpine3.15
WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY ./tsconfig.json /app/
COPY ./src /app/src
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "start"]
