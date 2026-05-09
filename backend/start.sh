#!/bin/sh

# Generate Prisma Client
npx prisma generate

# Push the schema to the database
npx prisma db push --accept-data-loss

# Start the application
npm run dev
