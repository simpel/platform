FROM node:20-alpine AS base
LABEL vendor="Comprend"
RUN npm install -g pnpm

FROM base AS builder
RUN apk add --no-cache gcompat
# Refer to https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#node-gyp-alpine
RUN apk add --no-cache python3 make g++
WORKDIR /app/
COPY . .
RUN pnpm install
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app/websites/diageonorthamerica.com
COPY --from=builder /app/websites/diageonorthamerica.com/next.config.js ./
COPY --from=builder /app/websites/diageonorthamerica.com/tailwind.config.js ./
COPY --from=builder /app/websites/diageonorthamerica.com/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/websites/diageonorthamerica.com/.next ./.next
COPY --from=builder /app/websites/diageonorthamerica.com/redirect-rules ./redirect-rules
COPY --from=builder /app/websites/diageonorthamerica.com/.env.local ./.env.local
COPY --from=builder /app/websites/diageonorthamerica.com/node_modules ./node_modules
COPY --from=builder /app/websites/diageonorthamerica.com/package.json ./package.json

WORKDIR /app
COPY --from=builder /app/node_modules/ ./node_modules/

USER nextjs
WORKDIR /app/websites/diageonorthamerica.com
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PORT 3000
EXPOSE 3000
CMD ["pnpm", "start"]
