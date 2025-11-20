# Stage 1: Build da aplicação Angular
FROM node:24-alpine AS build

ARG NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev --silent

COPY . .

RUN if [ "$NODE_ENV" = "development" ]; then \
        npm run build:dev; \
    else \
        npm run build; \
    fi

# Stage 2: Servir com Nginx
FROM nginx:alpine

COPY --from=build /app/dist/sistema-biblioteca-frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
