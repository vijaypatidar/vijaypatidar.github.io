---
title: Understanding ONNX vs Quantized Models in LangChain4j
description: A deep dive into the difference between original ONNX models and their quantized counterparts in LangChain4j embeddings.
authors: [vijay]
slug: Understanding-ONNX-vs-Quantized-Models-in-LangChain4j
tags: [onnx, langchain4j, embeddings, java, quantization]
---

When working with embeddings in **LangChain4j**, you might have noticed that many models are available in **two flavors**:

-   **Original (ONNX)**
-   **Quantized (ONNX, with `-q` suffix)**

But what’s the actual difference between them, and which one should you choose? Let’s break it down.

---

<!-- truncate -->

## 🔹 What is ONNX?

[ONNX](https://onnx.ai/) (Open Neural Network Exchange) is an **open standard format** for machine learning models.  
Its main purpose is **interoperability** — you can train a model in PyTorch, export it to ONNX, and then run it with ONNX Runtime in Java, C++, or Python.

By default, ONNX models store weights in **floating-point precision** (usually FP32 or FP16).

✅ Pros: High accuracy  
❌ Cons: Larger model size, slower inference

---

## 🔹 What is a Quantized Model?

A **quantized model** is an optimized version of a neural network where weights (and sometimes activations) are stored in **lower precision**, such as INT8 instead of FP32.

This leads to:

-   **Smaller file size** (e.g., 100 MB → 25 MB)
-   **Faster inference** (especially on CPUs and edge devices)
-   **Lower memory usage**

The trade-off is a **slight accuracy drop**, but for many use cases (like embeddings), the difference is often negligible.

✅ Pros: Smaller & faster  
❌ Cons: Slight accuracy trade-off

---

## 🔹 How LangChain4j Provides Both

In LangChain4j, both **original** and **quantized** models are packaged as Maven artifacts.  
The **quantized versions** have a `-q` suffix in the artifact name and `Quantized` in the Java class.

### Example: Maven Dependencies

```xml
<!-- Full precision (original ONNX) -->
<dependency>
  <groupId>dev.langchain4j</groupId>
  <artifactId>embedding-all-MiniLM-L6-v2</artifactId>
  <version>...</version>
</dependency>

<!-- Quantized ONNX version -->
<dependency>
  <groupId>dev.langchain4j</groupId>
  <artifactId>embedding-all-MiniLM-L6-v2-q</artifactId>
  <version>...</version>
</dependency>
```

### Example: Usage in Java

```java
// Full precision
EmbeddingModel model = new AllMiniLmL6V2EmbeddingModel();

// Quantized
EmbeddingModel model = new AllMiniLmL6V2QuantizedEmbeddingModel();
```

---

## 🔹 When to Use Which?

| Use Case                                   | Recommendation     |
| ------------------------------------------ | ------------------ |
| Maximum accuracy, plenty of RAM/CPU        | **Original ONNX**  |
| Faster inference, low-resource environment | **Quantized ONNX** |
| Running on edge devices / Raspberry Pi     | **Quantized ONNX** |
| Large-scale production, accuracy-critical  | **Original ONNX**  |

---

## 🔹 Key Takeaway

-   **ONNX model (original):** FP32 precision, larger, slower, but more accurate.
-   **Quantized ONNX model:** INT8 precision, smaller, faster, with minor accuracy loss.

👉 In short: **Both are ONNX models.** Quantization is an _optimization technique_ applied to the original.
