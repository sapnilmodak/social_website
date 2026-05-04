FROM node:20-alpine

# Install build dependencies for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Make the start script executable
RUN chmod +x start.sh

EXPOSE 5000

# Use the start script to run migrations before starting the app
CMD ["./start.sh"]
