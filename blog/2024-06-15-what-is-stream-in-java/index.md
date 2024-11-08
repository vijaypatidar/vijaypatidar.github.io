---
slug: what-is-stream-in-java
title: What Is Stream In java
authors: [vijay]
tags: [java]
---

## Introduction

A sequence of elements in Java that supports several methods that can be pipelined to achieve a desired outcome is called a stream. Originally included in Java 8 as a component of the java.util.stream package, streams are a part of the Java Collections Framework. They are made to manipulate data declaratively, much like SQL does with information kept in tables.

<!--truncate-->

## Key Characteristics of Streams

1. **Sequence of Elements**: A stream provides a sequence of elements, where each element is processed one at a time.
2. **Functional in Nature**: Operations on a stream are performed using a functional programming approach, allowing for concise and readable code.
3. **Lazy Evaluation**: Stream operations are lazy; they are not executed until a terminal operation is invoked. This allows for optimization and efficient processing.
4. **Parallel Processing**: Streams can be easily parallelized, making it simple to perform operations on multiple elements concurrently.

## Types of Stream Operations

There are two main types of stream operations: intermediate and terminal operations.

**Intermediate Operations**:
- These operations return a new stream and are lazy, meaning they do not trigger any processing until a terminal operation is invoked.
- Examples include `filter()`, `map()`, `flatMap()`, `distinct()`, `sorted()`, and `limit()`.

**Terminal Operations**:
- These operations trigger the actual processing of the stream and produce a result or a side-effect.
- Examples include `forEach()`, `collect()`, `reduce()`, `count()`, `findFirst()`, and `allMatch()`.

## Creating Streams

Streams can be created from various data sources such as collections, arrays, and I/O channels. Here are some examples:

**From Collections**:
```java
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();
```

**From Arrays**:
```java
String[] array = {"a", "b", "c"};
Stream<String> stream = Arrays.stream(array);
```

**From Lines of a File**:
```java
Stream<String> lines = Files.lines(Paths.get("file.txt"));
```

**From Values**:
```java
Stream<String> stream = Stream.of("a", "b", "c");
```

## Common Stream Operations

Here are some common operations performed on streams:

**Filtering**:
```java
List<String> filteredList = list.stream()
                                .filter(s -> s.startsWith("a"))
                                .collect(Collectors.toList());
```

**Mapping**:
```java
List<Integer> lengths = list.stream()
                            .map(String::length)
                            .collect(Collectors.toList());
```

**Reducing**:
```java
Optional<String> concatenated = list.stream()
                                    .reduce((s1, s2) -> s1 + s2);
```

**Collecting**:
```java
List<String> collected = list.stream()
                             .sorted()
                             .collect(Collectors.toList());
```

**Parallel Streams**:
```java
List<String> parallelList = list.parallelStream()
                                .filter(s -> s.startsWith("a"))
                                .collect(Collectors.toList());
```

## Example Usage

Here's a complete example that demonstrates the use of various stream operations:

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ram", "Krishna", "Chanakya", "Patel", "Lakshman");

        // Convert all names to uppercase and filter names that start with 'A'
        List<String> result = names.stream()
                                   .map(String::toUpperCase)
                                   .filter(name -> name.startsWith("R"))
                                   .collect(Collectors.toList());

        // Print the result
        result.forEach(System.out::println);
    }
}
```

In this example, the `names` list is converted to a stream, each name is mapped to its uppercase form, filtered to retain names starting with `R`, and then collected into a new list, which is printed to the console.

## Conclusion

Streams in Java provide a powerful and flexible way to perform complex data processing tasks in a declarative and efficient manner. They enable functional-style operations on collections of elements, making it easier to write concise and readable code.