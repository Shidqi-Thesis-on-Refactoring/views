# Use the official Node.js image
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# # Use NGINX as the base image
FROM nginx:alpine

# # Copy the built React app from the build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the Docker network
EXPOSE 3000

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]