# Use lightweight Node.js image for building
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies)
RUN npm install

# Copy all source files into the container
COPY . .

# Ensure the build folder is empty before building
RUN rm -rf .next

# Build the Next.js app
RUN npm run build

# Use lightweight Node.js runtime image for running the app
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment to production
ENV NODE_ENV=production

# Expose Next.js default port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
