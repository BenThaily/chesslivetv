# Use the official Node.js 20 image as the base image
FROM node:20

# Install Meteor
RUN curl https://install.meteor.com/ | sh

# Set the METEOR_ALLOW_SUPERUSER environment variable
ENV METEOR_ALLOW_SUPERUSER=true

# Set the working directory in the container
WORKDIR /app

# Copy the app source code into the container
COPY . .

# Build the app using the Meteor build command
RUN meteor build ./output --directory

# Install dependencies in the programs/server directory
RUN cd ./output/bundle/programs/server && npm install

# Set the entry point to run the app
CMD ["node", "./output/bundle/main.js"]
