# Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["pnpm", "test"]

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build
HEALTHCHECK --interval=10s --timeout=3s CMD node -e "require('./dist/cli/index.js')" || exit 1
CMD ["node", "dist/cli/index.js", "--version"]
