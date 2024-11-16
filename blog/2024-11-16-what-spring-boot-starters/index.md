---
slug: what-is-spring-boot-starters
title: What is Spring Boot Starter
authors: [vijay]
tags: [spring, java]
---

## Introduction

Spring Boot starters are predefined templates or dependencies that simplify the process of setting up a Spring Boot application. They eliminate the need to manually define numerous dependencies, ensuring compatibility and reducing configuration effort.

Here’s a list of commonly used Spring Boot starters and their purposes:

<!-- truncate -->
---

## **Core Starters**
1. **spring-boot-starter**  
   - Base starter for any Spring Boot application.  
   - Includes essential dependencies like Spring Core, Logging, etc.

2. **spring-boot-starter-test**  
   - Starter for testing Spring Boot applications.  
   - Includes JUnit, Mockito, Spring Test, and AssertJ.

---

## **Web Development**
3. **spring-boot-starter-web**  
   - For building RESTful web applications.  
   - Includes Spring MVC, Jackson (for JSON processing), and embedded Tomcat.

4. **spring-boot-starter-webflux**  
   - For reactive web applications using Project Reactor and WebFlux.  
   - Includes Netty or Tomcat for reactive web servers.

---

## **Data Access**
5. **spring-boot-starter-data-jpa**  
   - For JPA-based repositories and Hibernate ORM.  
   - Includes Spring Data JPA and an H2 database.

6. **spring-boot-starter-data-mongodb**  
   - For MongoDB support.  
   - Includes Spring Data MongoDB.

7. **spring-boot-starter-data-redis**  
   - For Redis data access.  
   - Includes Spring Data Redis and Lettuce.

8. **spring-boot-starter-jdbc**  
   - For traditional JDBC-based database access.  
   - Includes Spring JDBC and DataSource support.

---

## **Security**
9. **spring-boot-starter-security**  
   - Adds Spring Security to your application.  
   - Supports authentication, authorization, and secure login mechanisms.

---

## **Messaging**
10. **spring-boot-starter-amqp**  
    - For RabbitMQ messaging.  
    - Includes Spring AMQP.

11. **spring-boot-starter-activemq**  
    - For ActiveMQ messaging.

12. **spring-boot-starter-kafka**  
    - For Apache Kafka messaging.

---

## **Cloud & Configuration**
13. **spring-boot-starter-actuator**  
    - Adds production-ready features like monitoring and metrics endpoints.

14. **spring-boot-starter-cloud-config**  
    - For using Spring Cloud Config to manage configuration across environments.

---

## **Template Engines**
15. **spring-boot-starter-thymeleaf**  
    - For server-side rendering with Thymeleaf templates.

16. **spring-boot-starter-freemarker**  
    - For server-side rendering with FreeMarker templates.

---

## **Others**
17. **spring-boot-starter-batch**  
    - For batch processing using Spring Batch.

18. **spring-boot-starter-cache**  
    - Adds caching capabilities to your application.

19. **spring-boot-starter-mail**  
    - For sending emails.

20. **spring-boot-starter-validation**  
    - For data validation using Hibernate Validator.

21. **spring-boot-starter-aop**  
    - Adds support for aspect-oriented programming using Spring AOP.

---

## Why Use Spring Boot Starters?
- **Reduced Configuration:** Predefined dependencies ensure compatibility.
- **Improved Productivity:** Faster setup time for new projects.
- **Focused Development:** You can focus on business logic instead of boilerplate code.

Would you like me to structure this further or add examples for specific starters?