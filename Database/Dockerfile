# Use the official MongoDB Docker image as base
FROM mongo

# Set the working directory in the Docker container
WORKDIR /usr/src/configs

# Copy the local script files into the Docker container
COPY . .

# Expose the MongoDB port
EXPOSE 27017

# Set the default command to execute when the container starts
CMD ["mongod"]
