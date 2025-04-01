# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the TypeScript application
#RUN npm run build

# Expose the application's port (change if needed)
EXPOSE 3000

# Define the command to build and run the application
CMD ["npm", "start"]