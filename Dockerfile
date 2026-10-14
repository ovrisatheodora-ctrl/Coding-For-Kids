FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/server.js ./server.js
COPY --from=build --chown=node:node /app/api/ai-tutor.js ./api/ai-tutor.js
COPY --from=build --chown=node:node /app/server/security-headers.js ./server/security-headers.js
COPY --from=build --chown=node:node /app/dist ./dist

USER node
EXPOSE 3000
CMD ["npm", "start"]
