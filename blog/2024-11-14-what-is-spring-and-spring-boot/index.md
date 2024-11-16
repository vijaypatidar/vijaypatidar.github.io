---
slug: what-is-spring-and-spring-boot
title: What is Spring Framework
authors: [vijay]
tags: [spring, java]
---

## Spring Framework

The **Spring Framework** is a comprehensive and widely-used framework in the Java ecosystem for building enterprise-level applications. Its core feature is **dependency injection (DI)**, which helps with the loose coupling of components, making applications easier to manage and test. Spring provides many modules for various tasks, like web development, data access, messaging, and more, making it highly modular and suitable for a variety of projects.

<!-- truncate -->

**Key Features of Spring Framework**:
1. **Dependency Injection (DI)** and **Inversion of Control (IoC)**: Simplifies object creation and dependency handling.
2. **Aspect-Oriented Programming (AOP)**: Adds cross-cutting concerns like logging and transaction management.
3. **Data Access**: Supports integration with JDBC, JPA, Hibernate, and other data access technologies.
4. **Web Development**: Spring MVC (Model-View-Controller) module helps in building web applications.
5. **Modularity**: Has different modules like Spring Core, Spring Data, Spring Web, Spring Security, etc.

## Spring Boot

**Spring Boot** is a project built on top of the Spring Framework that aims to simplify the process of creating stand-alone, production-ready Spring applications. It abstracts away much of the configuration and boilerplate code that is traditionally associated with setting up a Spring project. With Spring Boot, you can get a Spring application up and running with minimal setup.

**Key Features of Spring Boot**:
1. **Auto-Configuration**: Automatically configures your application based on the dependencies you include in the project.
2. **Standalone Applications**: Allows you to create standalone applications that run with `java -jar` commands.
3. **Embedded Servers**: Comes with embedded servers (like Tomcat, Jetty), so you don’t need to deploy the application to an external server.
4. **Spring Boot Starters**: Simplifies dependency management by providing pre-configured sets of libraries (Starters) for different use cases (e.g., `spring-boot-starter-web` for web applications).
5. **Production-Ready Features**: Provides metrics, health checks, and externalized configuration to help in production management.

## Relationship Between Spring Framework and Spring Boot

- **Spring Framework** is the foundation of Spring-based projects and includes all the core functionalities, like DI, AOP, and MVC. Spring Boot, however, is built on top of the Spring Framework to simplify the process of developing Spring applications.
- **Spring Boot** is not a replacement but an enhancement for the Spring Framework, offering tools and defaults that help developers to rapidly create applications without writing too much configuration.
- **Spring Boot** leverages the components of the Spring Framework but adds its layer of abstraction, allowing for quick setup and ready-to-use defaults, especially useful for microservices and RESTful APIs.

In summary, **Spring Framework** provides the core infrastructure, while **Spring Boot** makes it easier to create applications with Spring by reducing configuration and simplifying the setup process.