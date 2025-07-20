---
title: "Clean and Modular: Integrating Spring Boot with Vite + React in a Gradle Project"
description: Learn how to structure a full-stack application by integrating a Vite + React frontend with a Spring Boot backend using Gradle multi-module setup.
slug: spring-boot-vite-react-gradle
authors: [vijay]
tags: [spring-boot, react, gradle, vite]
---

## **Clean and Modular: Integrating Spring Boot with Vite + React in a Gradle Project**

While working on a full-stack Spring Boot application, I needed to develop a React-based frontend and serve it alongside the backend. To streamline the development and build processes, I decided to manage the frontend as a submodule within the same Gradle project using the `gradle-node-plugin`.

## <!-- truncate -->

## **Setting Up the Frontend with Vite + React**

Start by creating a new Vite + React TypeScript project using the following command:

```bash
npm create vite@latest frontend -- --template react-ts
```

This will scaffold a new frontend project inside a `frontend` directory, which you can place within your existing Gradle project.

---

## **Registering the Vite Project as a Gradle Submodule**

1. **Create a `build.gradle` file inside the `frontend/` directory** and add the following plugins:

```groovy
plugins {
    id "com.github.node-gradle.node" version "7.1.0"
    id "base"
}
```

2. **Configure the Node plugin** to download and use a specific Node.js version:

```groovy
node {
    download = true
    version = "22.12.0"
}
```

3. **Define Gradle tasks** to build, clean, and run the frontend:

```groovy
tasks.register('buildFrontend', NpxTask) {
    dependsOn npmInstall
    command = 'npm'
    args = ['run', 'build']
}

tasks.register('devRun', NpxTask) {
    dependsOn npmInstall
    command = 'npm'
    args = ['run', 'dev']
}

tasks.register('cleanFrontend', Delete) {
    group = "build"
    description = "Cleans the Vite distribution folder"
    delete file("dist")
}

tasks.clean.dependsOn cleanFrontend
tasks.build.dependsOn buildFrontend
```

---

## **Include Frontend as a Submodule in Root Gradle Project**

Update your `settings.gradle` file to register both modules:

```groovy
rootProject.name = 'fullstack-spring-vite'

include 'frontend'
include 'backend'
```

---

## **Serve Frontend from Spring Boot**

Modify your backend’s `build.gradle` (or `build.gradle.kts`) to package the frontend static files:

```groovy
bootJar {
    dependsOn ':frontend:build'
    from("../frontend/dist") {
        into "BOOT-INF/classes/static"
    }
}

tasks.clean.dependsOn ':frontend:clean'
tasks.build.dependsOn ':frontend:build'
```

Now, whenever you build the backend, it will automatically build the frontend and embed the static files into the Spring Boot JAR under the `/static` directory.

---

## **Building the Project**

To build the entire project:

```bash
./gradlew clean build
```

This will compile both backend and frontend, and the final Spring Boot JAR will include your frontend assets, ready to be served.

---

🔗 **You can find the complete source code on [my GitHub repository](https://github.com/vijaypatidar/fullstack-spring-vite)**
