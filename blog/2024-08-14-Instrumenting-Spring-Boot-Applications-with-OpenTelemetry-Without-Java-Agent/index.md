---
slug: Instrumenting-Spring-Boot-Applications-with-OpenTelemetry-Without-Java-Agent
title: Instrumenting Spring Boot Applications with OpenTelemetry (Without Java Agent)
authors: [vijay]
tags: [java]
---

## **Introduction**

In modern distributed systems, observability is crucial for monitoring application performance and troubleshooting issues. OpenTelemetry (OTel) is a powerful tool for collecting telemetry data such as traces, metrics, and logs. In this guide, we'll walk through how to instrument a Spring Boot application with OpenTelemetry without using the Java agent, and how to export the telemetry data to Jaeger using Docker.

<!-- truncate -->

## **Step 1: Setting Up OpenTelemetry in Spring Boot**

First, you'll need to add the necessary OpenTelemetry dependencies to your Spring Boot project. Here's how to do it with Gradle:

```groovy
dependencies {
    implementation(platform("io.opentelemetry.instrumentation:opentelemetry-instrumentation-bom:2.6.0"))
    implementation("io.opentelemetry.instrumentation:opentelemetry-spring-boot-starter")
}
```

These dependencies bring in the OpenTelemetry SDK and the Spring Boot starter, which helps in auto-configuring the instrumentation of your application.

## **Step 2: Configuring OpenTelemetry in Spring Boot**

Next, configure OpenTelemetry in your `application.yml` (or `application.properties`) to define how traces are exported and propagated:

```yaml
otel:
  traces:
    exporter: otlp
  exporter:
    otlp:
      endpoint: http://localhost:4317
      protocol: grpc
  propagators:
    - tracecontext
  resource:
    attributes:
      deployment.environment: dev
      service:
        name: webflux
        namespace: spring
```

Here’s what each part does:

- **traces.exporter.otlp**: Specifies the OTLP (OpenTelemetry Protocol) as the exporter.
- **exporter.otlp.endpoint**: The endpoint where the traces will be sent.
- **propagators**: Configures the trace context propagation.
- **resource.attributes**: Adds metadata like environment and service name to the traces.

## **Step 3: Running Jaeger with Docker Compose**

To visualize the traces, you'll need a tool like Jaeger. Here’s a `docker-compose.yml` setup that runs Jaeger with Elasticsearch as the storage backend:

```yaml
version: "3.7"

services:
  jaeger-collector:
    image: jaegertracing/jaeger-collector:1.40
    environment:
      - COLLECTOR_OTLP_ENABLED=true # Enable OTLP endpoint
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=http://elasticsearch:9200
    ports:
      - "14250:14250" # OTLP gRPC
      - "14268:14268" # Jaeger HTTP Thrift
      - "4317:4317" # OTLP gRPC for traces
      - "4318:4318" # OTLP HTTP for traces
    depends_on:
      - elasticsearch
    networks:
      - jaeger-network

  jaeger-query:
    image: jaegertracing/jaeger-query:1.40
    environment:
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=http://elasticsearch:9200
    ports:
      - "16686:16686" # Jaeger UI
    depends_on:
      - jaeger-collector
    networks:
      - jaeger-network

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.10.2
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"
    networks:
      - jaeger-network

networks:
  jaeger-network:
    driver: bridge
```

This setup creates three services:

- **Jaeger Collector**: Collects traces from your application.
- **Jaeger Query**: Provides a UI to view and query traces.
- **Elasticsearch**: Stores the trace data.

## **Step 4: Testing the Setup**

Once everything is configured, start your application and the Docker Compose setup. Generate some traffic in your application to produce traces. You should see the traces appear in the Jaeger UI at `http://localhost:16686`.

## **Conclusion**

By following these steps, you've successfully instrumented your Spring Boot application with OpenTelemetry, configured it to export traces to Jaeger, and visualized the traces without using the OpenTelemetry Java agent. This approach offers flexibility and control over how your application is instrumented.
