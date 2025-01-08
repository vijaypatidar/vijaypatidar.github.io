"use strict";(self.webpackChunkmy_portfolio=self.webpackChunkmy_portfolio||[]).push([[9300],{2288:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>r,metadata:()=>t,toc:()=>d});var t=s(8106),i=s(4848),o=s(8453);const r={slug:"publish-android-app-bundle-to-play-store-using-github-actions",title:"Publish Android App Bundle to Play Store Using GitHub Actions",authors:["vijay"],tags:["cicd","github-action"]},a="Publish Android App Bundle to Play Store Using GitHub Actions",l={authorsImageUrls:[void 0]},d=[{value:"Step 1: Configure Gradle for Signing",id:"step-1-configure-gradle-for-signing",level:2},{value:"Step 2: Create a GitHub Actions Workflow",id:"step-2-create-a-github-actions-workflow",level:2},{value:"Step 3: Add GitHub Secrets",id:"step-3-add-github-secrets",level:2},{value:"Conclusion",id:"conclusion",level:2}];function u(e){const n={code:"code",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Publishing your Android app bundle to the Google Play Store can be streamlined by automating the process with GitHub Actions. In this guide, we\u2019ll walk you through the steps to set up a CI/CD pipeline that builds, signs, and uploads your app to the Play Store."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"step-1-configure-gradle-for-signing",children:"Step 1: Configure Gradle for Signing"}),"\n",(0,i.jsxs)(n.p,{children:["The first step is to update your ",(0,i.jsx)(n.code,{children:"build.gradle.kts"})," file to include the signing configuration. This setup ensures that the app is signed with the correct credentials during the build process."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-kotlin",children:'plugins {\n    alias(libs.plugins.android.application)\n    alias(libs.plugins.kotlin.android)\n    id("com.google.gms.google-services")\n}\n\nandroid {\n    namespace = "com.vkpapps.booleanalgebra"\n    compileSdk = 35\n\n    defaultConfig {\n        ...\n    }\n    signingConfigs {\n        create("release") {\n            storeFile = file("./../boolean-algebra.jks")\n            storePassword = System.getenv("BOOLEAN_ALGEBRA_SIGN_STORE_PASSWORD")\n            keyAlias = System.getenv("BOOLEAN_ALGEBRA_SIGN_KEY_ALIAS")\n            keyPassword = System.getenv("BOOLEAN_ALGEBRA_SIGN_KEY_PASSWORD")\n        }\n    }\n\n    buildTypes {\n        release {\n            isMinifyEnabled = true\n            isShrinkResources = true\n            signingConfig = signingConfigs.getByName("release")\n            isDebuggable = false\n            proguardFiles(\n                getDefaultProguardFile("proguard-android-optimize.txt"),\n                "proguard-rules.pro"\n            )\n        }\n\n        ...\n    }\n    ...\n}\n\ndependencies {\n    ...\n}\n'})}),"\n",(0,i.jsx)(n.p,{children:"Ensure the signing keys and passwords are stored as environment variables or GitHub secrets for security."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"step-2-create-a-github-actions-workflow",children:"Step 2: Create a GitHub Actions Workflow"}),"\n",(0,i.jsxs)(n.p,{children:["Create a GitHub Actions workflow file in your repository\u2019s ",(0,i.jsx)(n.code,{children:".github/workflows"})," directory. Name it ",(0,i.jsx)(n.code,{children:"android-ci.yml"})," or a similar descriptive name."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"name: Android CI\n\non:\n  push:\n    branches:\n      - main\n\njobs:\n  build:\n\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v3\n\n      - name: Set up JDK 21\n        uses: actions/setup-java@v3\n        with:\n          java-version: '17'\n          distribution: 'corretto'\n\n      - name: Grant permissions for gradlew\n        run: chmod +x gradlew\n\n      - name: Set environment variables\n        run: |\n          echo \"BOOLEAN_ALGEBRA_SIGN_STORE_PASSWORD=${{ secrets.BOOLEAN_ALGEBRA_SIGN_STORE_PASSWORD }}\" >> $GITHUB_ENV\n          echo \"BOOLEAN_ALGEBRA_SIGN_KEY_ALIAS=${{ secrets.BOOLEAN_ALGEBRA_SIGN_KEY_ALIAS }}\" >> $GITHUB_ENV\n          echo \"BOOLEAN_ALGEBRA_SIGN_KEY_PASSWORD=${{ secrets.BOOLEAN_ALGEBRA_SIGN_KEY_PASSWORD }}\" >> $GITHUB_ENV\n\n      - name: Run unit tests\n        run: ./gradlew test\n\n      - name: Run Lint\n        run: ./gradlew lint\n\n      - name: Assemble Release\n        run: ./gradlew bundleRelease\n\n      - name: Publish to Play Store\n        uses: r0adkll/upload-google-play@v1\n        with:\n          serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_CREDENTIALS }}\n          packageName: com.vkpapps.booleanalgebra\n          releaseFiles: app/build/outputs/bundle/release/app-release.aab\n          track: beta\n          status: 'completed'\n"})}),"\n",(0,i.jsx)(n.p,{children:"This workflow builds the app, runs tests, and uploads the release bundle to the Play Store."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"step-3-add-github-secrets",children:"Step 3: Add GitHub Secrets"}),"\n",(0,i.jsx)(n.p,{children:"The workflow depends on several secrets to securely manage sensitive information. Add the following secrets to your GitHub repository:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"BOOLEAN_ALGEBRA_SIGN_STORE_PASSWORD"}),": Password for your keystore file."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"BOOLEAN_ALGEBRA_SIGN_KEY_ALIAS"}),": Alias for your signing key."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"BOOLEAN_ALGEBRA_SIGN_KEY_PASSWORD"}),": Password for your signing key."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"GOOGLE_PLAY_CREDENTIALS"}),": JSON key for your Google Play Service Account."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"To add secrets:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Go to your GitHub repository."}),"\n",(0,i.jsxs)(n.li,{children:["Navigate to ",(0,i.jsx)(n.strong,{children:"Settings"})," > ",(0,i.jsx)(n.strong,{children:"Secrets and variables"})," > ",(0,i.jsx)(n.strong,{children:"Actions"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Click ",(0,i.jsx)(n.strong,{children:"New repository secret"})," and add each of the secrets listed above."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(n.p,{children:"By following these steps, you\u2019ve successfully automated the publishing process for your Android app using GitHub Actions. This setup not only saves time but also ensures consistency and reliability in your CI/CD pipeline."}),"\n",(0,i.jsx)(n.p,{children:"Feel free to customize the workflow based on your project\u2019s specific needs. Happy coding!"})]})}function c(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>a});var t=s(6540);const i={},o=t.createContext(i);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(o.Provider,{value:n},e.children)}},8106:e=>{e.exports=JSON.parse('{"permalink":"/blog/publish-android-app-bundle-to-play-store-using-github-actions","editUrl":"https://github.com/vijaypatidar/my-portfolio/tree/main/blog/2025-01-08-publish-android-app-bundle-to-play-store-using-github-actions/index.md","source":"@site/blog/2025-01-08-publish-android-app-bundle-to-play-store-using-github-actions/index.md","title":"Publish Android App Bundle to Play Store Using GitHub Actions","description":"Publishing your Android app bundle to the Google Play Store can be streamlined by automating the process with GitHub Actions. In this guide, we\u2019ll walk you through the steps to set up a CI/CD pipeline that builds, signs, and uploads your app to the Play Store.","date":"2025-01-08T00:00:00.000Z","tags":[{"inline":false,"label":"CI/CD","permalink":"/blog/tags/cicd","description":"CI/CD Pileline"},{"inline":false,"label":"Github Action","permalink":"/blog/tags/github-action","description":"Github Action CI/CD"}],"readingTime":2.325,"hasTruncateMarker":true,"authors":[{"name":"Vijay Patidar","title":"Fullstack Software Engineer","url":"https://github.com/vijaypatidar","imageURL":"https://github.com/vijaypatidar.png","key":"vijay","page":null}],"frontMatter":{"slug":"publish-android-app-bundle-to-play-store-using-github-actions","title":"Publish Android App Bundle to Play Store Using GitHub Actions","authors":["vijay"],"tags":["cicd","github-action"]},"unlisted":false,"nextItem":{"title":"How to Create Entity Classes for Relational Tables","permalink":"/blog/how-to-create-entity-classes-for-relational-tables"}}')}}]);