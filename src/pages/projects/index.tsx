import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import * as React from "react";
import styles from "./index.module.css";
import Container from "@mui/material/Container";

import { createTheme } from "@mui/material/styles";
import {
  Project,
  ProjectsComponent,
} from "@site/src/components/ProjectsComponent";

const projects: Project[] = [
  {
    id: "project-1",
    title: "Boolean Algebra",
    description:
      "Boolean Algebra lets you use your android device as boolean problem solver that can solve Karnaugh map , Minimize expression , Generate SoP & PoS , Generate Circuit diagram and much more.",
    moreUrl: "/projects/booleanalgebra",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.vkpapps.booleanalgebra",
    startTime: "Aug 2018",
  },
  {
    id: "project-2",
    title: "SendKr",
    description:
      "SendKr is an easy to use file and folder transfer application. Supports all types of file to transfer from one android smartphone to another android smartphone.",
    gitRepo: "https://github.com/vijaypatidar/sendkr",
    startTime: "Jul 2020",
    endTime: "Jan 2021",
  },
  {
    id: "project-3",
    title: "Access Point Manager",
    description:
      "Android library for creating access point (mobile hotspot) without taking care of android version and permision that requires on different devices.",
    gitRepo: "https://github.com/vijaypatidar/AndroidWifiManager",
    startTime: "Nov 2020",
    endTime: "Dec 2020",
  },
];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          My Projects
        </Heading>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`My Projects`}
      description="Work that I've done in past and still working"
    >
      <HomepageHeader />
      <main>
        {/* <ThemeProvider theme={darkTheme}> */}
        <Container maxWidth="md">
          <ProjectsComponent projects={projects} />
        </Container>
        {/* </ThemeProvider> */}
      </main>
    </Layout>
  );
}
