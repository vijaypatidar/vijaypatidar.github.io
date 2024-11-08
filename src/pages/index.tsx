import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Avatar
          style={{ display: "inline-block" }}
          sx={{ width: 150, height: 150 }}
          alt="Vijay Patidar Pic"
          src="https://github.com/vijaypatidar.png"
        />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p>
          Hello there! Thank you for looking at my portfolio. My name is Vijay
          Patidar, I've been interested in programming since I was in high
          school, and I graduated with honors in Information Technology
          (Bachelors of Technology) from Swami Vivekanand College of Engineering
          in Indore. I am currently employed as a software engineer at
          Consultadd. The majority of my projects may be found on this website
          and on{" "}
          <Link
            href="https://github.com/vijaypatidar"
            target="_blank"
            style={{ color: "white" }}
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  );
}
