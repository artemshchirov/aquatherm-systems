FROM node:18.16.0-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN yarn global add pnpm

RUN pnpm add --global turbo
COPY . .
RUN ls
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18.16.0-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN yarn global add pnpm

RUN pnpm add --global turbo

# First install the dependencies Of the OUT (prune command) (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm i

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=api...

FROM node:18.12.1-alpine AS runner
ENV DOPPLER_TOKEN=null
ENV APP_ENV=prod
ENV PORT=8080
WORKDIR /app

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN yarn global add pnpm

# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && apk add doppler

# Don't run production as root
# RUN addgroup --system --gid 1001 excecuter
# RUN adduser --system --uid 1001 excecuter
# USER excecuter

COPY --from=installer /app .

EXPOSE $PORT
CMD pnpm --filter=api start
