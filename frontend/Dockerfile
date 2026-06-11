FROM node:22-alpine AS build

WORKDIR /app

# Vite necesita la URL de la API durante el build del frontend.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

# Genera los archivos estaticos de React/Vite.
COPY . .
RUN npm run build

FROM nginx:1.27-alpine

# Nginx sirve el resultado compilado desde dist.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
