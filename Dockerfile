# Use a larger Node image if Alpine causes issues
FROM node:lts

WORKDIR /app

# Copy root package files and install client and server dependencies
COPY package*.json ./

COPY client/package*.json client/
RUN npm install --prefix client --omit=dev --verbose

COPY server/package*.json server/
RUN npm install --prefix server --omit=dev --verbose

# Copy app files and build client
COPY client/ client/
RUN npm run build --prefix client --verbose

COPY server/ server/

# Switch to non-root user
USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000
