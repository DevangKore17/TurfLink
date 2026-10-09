# Production Stage (Using your locally cached Nginx image to bypass Docker Hub)
FROM nginx:mainline-alpine3.22-perl AS production

# Run as a non-root user for security (Requirement for LO4)
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    mkdir -p /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /run /var/run && \
    chown -R appuser:appgroup /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /run /var/run

USER appuser

# Copy the PRE-BUILT files from your local /dist folder directly into the container
# This completely skips the need to download Node.js from Docker Hub!
COPY --chown=appuser:appgroup dist /usr/share/nginx/html
COPY --chown=appuser:appgroup nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Healthcheck to ensure the container is running correctly
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
