FROM node:latest as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /app
RUN npm run build

# --- RUN ---

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/prod/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
