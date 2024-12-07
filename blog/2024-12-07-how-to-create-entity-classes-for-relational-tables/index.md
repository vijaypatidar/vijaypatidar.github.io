---
slug: how-to-create-entity-classes-for-relational-tables
title: How to Create Entity Classes for Relational Tables
authors: [vijay]
tags: [jpa, java]
---

## **How to Create Entity Classes for Relational Tables**

When working with Java Persistence API (JPA), defining entity classes is a critical step to map relational database tables to Java objects. In this post, we’ll explore how to create entity classes for a relational schema, focusing on best practices and solving common challenges such as composite keys.

<!-- truncate -->

---


## **Schema Overview**

Consider the following relational database schema:

- **Users** (`id`, `name`, `email`)
- **Posts** (`id`, `user_id`, `title`, `content`, `date`)
- **Comments** (`post_id`, `user_id`, `comment`, `date`)

Here’s what each table represents:
- **Users**: Stores user information.
- **Posts**: Represents content posted by users, linked to the `users` table.
- **Comments**: Stores user comments on posts, linked to both `posts` and `users`.

---

## **Creating Entity Classes**

### **Step 1: The `User` Entity**

The `User` entity represents the `users` table. It has a one-to-many relationship with both `posts` and `comments`.

```java
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    // Getters and Setters
}
```

### **Step 2: The `Post` Entity**

The `Post` entity maps the `posts` table. It has a `ManyToOne` relationship with `User` and a `OneToMany` relationship with `Comment`.

```java
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    private String content;
    private LocalDate date;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    // Getters and Setters
}
```

### **Step 3: The `Comment` Entity with a Composite Key**

Unlike the `User` and `Post` entities, the `Comment` entity uses a composite primary key (`post_id`, `user_id`). This eliminates the need for a separate `id` field. Here’s how to implement it:

#### **Composite Key Class (`CommentId`)**

```java
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CommentId implements Serializable {

    private Long postId;

    private Long userId;

    // Default constructor
    public CommentId() {}

    public CommentId(Long postId, Long userId) {
        this.postId = postId;
        this.userId = userId;
    }

    // Getters and Setters
    

    // Override equals() and hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentId that = (CommentId) o;
        return Objects.equals(postId, that.postId) &&
               Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(postId, userId);
    }
}
```

#### **The `Comment` Entity**

```java
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "comments")
public class Comment {
    @EmbeddedId
    private CommentId id;

    @ManyToOne
    @MapsId("postId")
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String comment;
    private LocalDate date;

    // Getters and Setters
}
```

---

## **Key Takeaways**

1. **Relationships**:
   - Use `@ManyToOne` and `@OneToMany` for parent-child relationships.
   - For bidirectional relationships, annotate the owning side.

2. **Composite Keys**:
   - Define a separate `@Embeddable` class to represent composite keys.
   - Use `@EmbeddedId` in the entity and `@MapsId` to map foreign keys.

3. **Database Integrity**:
   - Ensure relationships are managed correctly with cascading and orphan removal policies.

4. **Best Practices**:
   - Always override `equals()` and `hashCode()` in composite key classes.
   - Keep your entities simple and focused on mapping rather than business logic.

---

## **Conclusion**

By following these steps, you can create robust JPA entity classes tailored to your database schema. Whether you're using simple primary keys or composite keys, understanding JPA annotations and relationships is key to building scalable applications.
