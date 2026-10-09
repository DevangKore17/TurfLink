# 1. Base Stage
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 2. Test Stage (Used by Jenkins to run unit tests)
FROM base AS test
# Run the tests; if they fail, the Docker build fails here
RUN npm run test

# 3. Build Stage (Compiling the React app)
FROM base AS builder
RUN npm run build

# 4. Production Stage
FROM nginxinc/nginx-unprivileged:alpine AS production

# Copy the built files from the builder stage
# (The unprivileged image uses 'nginx' user, UID 101)
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Healthcheck to ensure the container is running correctly
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
