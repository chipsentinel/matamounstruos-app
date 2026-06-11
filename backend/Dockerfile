FROM node:22-alpine

WORKDIR /app

# Instala solo dependencias de produccion para ejecutar Express.
COPY package*.json ./
RUN npm ci --omit=dev

# Copia el codigo del backend y los scripts SQL usados por Docker Compose.
COPY src ./src
COPY db ./db

EXPOSE 3000

# Arranca el servidor Express.
CMD ["npm", "start"]
