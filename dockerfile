# Use an official Node runtime as a parent image that supports ARM architecture and the required Node version
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Build the application
RUN yarn build


RUN yarn global add serve

CMD ["serve", "-s", "build", "-l", "3000"]
