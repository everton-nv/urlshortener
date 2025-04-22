FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Expose app and debug ports
EXPOSE 3000 9229

# Start app in debug mode
CMD ["node", "--inspect=0.0.0.0:9229", "--watch", "dist/main"]