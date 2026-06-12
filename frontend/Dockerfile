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

# Normalizar posible salida: if /app/build exists, move to /app/dist
RUN if [ -d "/app/build" ] && [ ! -d "/app/dist" ]; then mv /app/build /app/dist; fi

FROM nginx:1.27-alpine

# Nginx sirve el resultado compilado desde dist.
COPY --from=build /app/dist /usr/share/nginx/html

# Instalar curl para el healthcheck (pequeña sobrecarga)
RUN apk add --no-cache curl

# Healthcheck básico para que Docker marque cuando el frontend esté listo
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost/ >/dev/null || exit 1

# Añadir configuración SPA para evitar 404 al refrescar rutas
RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  # Soporta SPA: si no hay archivo, devuelve index.html
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Servir archivos estáticos con cache razonable
  location ~* \.(?:css|js|json|xml|jpg|jpeg|png|gif|ico|svg)$ {
    try_files $uri =404;
    expires 7d;
    add_header Cache-Control "public";
  }

  # Evitar cache en index.html para que siempre cargue la última versión
  location = /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
  }
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
