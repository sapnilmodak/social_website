FROM node:20-alpine

# Install build dependencies for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Make the start script executable and fix line endings
RUN sed -i 's/\r$//' start.sh && chmod +x start.sh

EXPOSE 5000

# Explicitly use 'sh' to run the script so Node doesn't try to execute it
CMD ["sh", "./start.sh"]
