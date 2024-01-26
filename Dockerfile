#FROM openjdk:17-alpine
#COPY "./target/LMS-1.jar" "./jarfiles/senior.jar"
#ENTRYPOINT ["java", "-jar", "./jarfiles/senior.jar"]
#EXPOSE 8081

# Use the official OpenJDK 17 base image
FROM openjdk:17-alpine

# Set the working directory in the container
#WORKDIR /app

# Copy the JAR file into the container
COPY "./target/LMS-1.jar" app.jar

# Expose the port your application runs on
EXPOSE 8081

# Command to run your application
CMD ["java", "-jar", "app.jar"]
