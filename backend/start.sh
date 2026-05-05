#!/bin/sh

# Generate Prisma Client (in case it wasn't done in build)
npx prisma generate

# # Push the schema to the database
# # This will create tables if they don't exist
npx prisma db push --accept-data-loss

# Start the application
npm run dev
