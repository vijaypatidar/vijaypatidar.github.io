---
slug: 2025-02-10-Setup-flyway-migration-with-spring-boot
title: Setup flyway migration with spring boot
authors: [vijay]
tags: [flyway, spring]
---

# Setup Flyway Migration with Spring Boot

Database migrations are essential for maintaining consistency and version control in applications. Flyway is a popular database migration tool that integrates seamlessly with Spring Boot. In this guide, we will set up Flyway in a Spring Boot application and configure it for different environments.

---

## Step 1: Add Flyway Dependencies in Gradle

The first step is to update your `build.gradle` file to include the Flyway dependencies.

<!-- truncate -->

```gradle
plugins {
	...
}

group = 'com.vkpapps'
version = '0.0.1-SNAPSHOT'

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

repositories {
	mavenCentral()
}

dependencies {
  // Other dependencies
	implementation 'org.flywaydb:flyway-core'
	implementation 'org.flywaydb:flyway-database-postgresql'
}
```

---

## Step 2: Configure Database Connection in `application.yaml`

Next, we configure the database connection and enable Flyway in `application.yaml`:

```yml
spring:
  application:
    name: flyway-migration-example
  jackson:
    property-naming-strategy: SNAKE_CASE
  datasource:
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://localhost:5432/postgres?currentSchema=flyway-migration-example
    username: vijay
    password:
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        format_sql: true
        show_sql: true
  flyway:
    baseline-on-migrate: true
    enabled: true
    locations: classpath:db/migration/common,classpath:db/migration/local
```

---

## Step 3: Organizing Migration Scripts Based on Environment

Flyway allows organizing migration scripts into different folders and applying them based on the environment. We configure `locations` accordingly.

### Local Environment

In the local environment, we also run an insert script to seed the database with dummy data:

```properties
spring:
  datasource:
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://localhost:5432/postgres?currentSchema=flyway-migration-example
    username: vijay
    password:
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: update  # or "none" if schema is managed manually
    properties:
      hibernate:
        format_sql: true
        show_sql: true
  flyway:
    baseline-on-migrate: true
    enabled: true
    locations: classpath:db/migration/common,classpath:db/migration/local
```

### Production Environment

In production, we only run the common database migration scripts and avoid inserting dummy data:

```properties
spring:
  datasource:
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://localhost:5432/postgres?currentSchema=flyway-migration-example
    username: vijay
    password:
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        format_sql: true
        show_sql: true
  flyway:
    baseline-on-migrate: true
    enabled: true
    locations: classpath:db/migration/common
```

---

## Conclusion

Setting up Flyway in a Spring Boot application ensures seamless database migrations while maintaining version control. By structuring migrations based on environments, we can manage schema changes efficiently without affecting production stability.

Now that your Flyway setup is complete, you can start adding migration scripts in `db/migration/common` and `db/migration/local` folders to control database schema changes. Happy coding!
