---
slug: publish-android-app-bundle-to-play-store-using-github-actions
title: Publish Android App Bundle to Play Store Using GitHub Actions
authors: [vijay]
tags: [cicd, github-action]
---

# Publish Android App Bundle to Play Store Using GitHub Actions

Publishing your Android app bundle to the Google Play Store can be streamlined by automating the process with GitHub Actions. In this guide, we’ll walk you through the steps to set up a CI/CD pipeline that builds, signs, and uploads your app to the Play Store.

---

## Step 1: Configure Gradle for Signing

The first step is to update your `build.gradle.kts` file to include the signing configuration. This setup ensures that the app is signed with the correct credentials during the build process.


<!-- truncate -->

```kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    id("com.google.gms.google-services")
}

android {
    namespace = "com.vkpapps.booleanalgebra"
    compileSdk = 35

    defaultConfig {
        ...
    }
    signingConfigs {
        create("release") {
            storeFile = file("./../boolean-algebra.jks")
            storePassword = System.getenv("BOOLEAN_ALGEBRA_SIGN_STORE_PASSWORD")
            keyAlias = System.getenv("BOOLEAN_ALGEBRA_SIGN_KEY_ALIAS")
            keyPassword = System.getenv("BOOLEAN_ALGEBRA_SIGN_KEY_PASSWORD")
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            signingConfig = signingConfigs.getByName("release")
            isDebuggable = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }

        ...
    }
    ...
}

dependencies {
    ...
}
```

Ensure the signing keys and passwords are stored as environment variables or GitHub secrets for security.

---

## Step 2: Create a GitHub Actions Workflow

Create a GitHub Actions workflow file in your repository’s `.github/workflows` directory. Name it `android-ci.yml` or a similar descriptive name.

```yaml
name: Android CI

on:
  push:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up JDK 21
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'corretto'

      - name: Grant permissions for gradlew
        run: chmod +x gradlew

      - name: Set environment variables
        run: |
          echo "BOOLEAN_ALGEBRA_SIGN_STORE_PASSWORD=${{ secrets.BOOLEAN_ALGEBRA_SIGN_STORE_PASSWORD }}" >> $GITHUB_ENV
          echo "BOOLEAN_ALGEBRA_SIGN_KEY_ALIAS=${{ secrets.BOOLEAN_ALGEBRA_SIGN_KEY_ALIAS }}" >> $GITHUB_ENV
          echo "BOOLEAN_ALGEBRA_SIGN_KEY_PASSWORD=${{ secrets.BOOLEAN_ALGEBRA_SIGN_KEY_PASSWORD }}" >> $GITHUB_ENV

      - name: Run unit tests
        run: ./gradlew test

      - name: Run Lint
        run: ./gradlew lint

      - name: Assemble Release
        run: ./gradlew bundleRelease

      - name: Publish to Play Store
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_CREDENTIALS }}
          packageName: com.vkpapps.booleanalgebra
          releaseFiles: app/build/outputs/bundle/release/app-release.aab
          track: beta
          status: 'completed'
```

This workflow builds the app, runs tests, and uploads the release bundle to the Play Store.

---

## Step 3: Add GitHub Secrets

The workflow depends on several secrets to securely manage sensitive information. Add the following secrets to your GitHub repository:

1. **BOOLEAN_ALGEBRA_SIGN_STORE_PASSWORD**: Password for your keystore file.
2. **BOOLEAN_ALGEBRA_SIGN_KEY_ALIAS**: Alias for your signing key.
3. **BOOLEAN_ALGEBRA_SIGN_KEY_PASSWORD**: Password for your signing key.
4. **GOOGLE_PLAY_CREDENTIALS**: JSON key for your Google Play Service Account.

To add secrets:
1. Go to your GitHub repository.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Click **New repository secret** and add each of the secrets listed above.

---

## Conclusion

By following these steps, you’ve successfully automated the publishing process for your Android app using GitHub Actions. This setup not only saves time but also ensures consistency and reliability in your CI/CD pipeline.

Feel free to customize the workflow based on your project’s specific needs. Happy coding!

