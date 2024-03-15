FROM docker.io/node:20

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@8.15.4 --activate

# Install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the files and build the app
COPY . .
RUN pnpm server:build

CMD [ "node", "dist/apps/server/main.js" ]

# Expose port
EXPOSE 3001
