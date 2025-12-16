# Stage 1: Build
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:21
WORKDIR /app

COPY --from=build /app/target/blog-0.0.1-SNAPSHOT.jar ./app.jar


ENV PORT=8080
EXPOSE $PORT

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
