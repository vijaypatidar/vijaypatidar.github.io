import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Vijay Patidar",
  tagline: "Fullstack Software Engineer",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://vijaypatidar.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "vijaypatidar", // Usually your GitHub org/user name.
  projectName: "Portfolio", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/vijaypatidar/my-portfolio/tree/main",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/vijaypatidar/my-portfolio/tree/main",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-MWR4778GYB",
          anonymizeIP: true,
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
  },
  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Vijay Patidar",
      logo: {
        alt: "Vijay Patidar Logo",
        src: "img/logo.svg",
      },
      items: [
        // {
        //   type: "docSidebar",
        //   sidebarId: "tutorialSidebar",
        //   position: "left",
        //   label: "Tutorial",
        // },
        { to: "/blog", label: "Blog", position: "left" },
        { to: "/projects", label: "Projects", position: "left" },
        {
          href: "https://github.com/vijaypatidar",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        // {
        //   title: "Docs",
        //   items: [
        //     // {
        //     //   label: "Tutorial",
        //     //   to: "/docs/intro",
        //     // },
        //   ],
        // },
        {
          title: "Social",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/vijaypatidar",
            },
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/users/9534835/vijay-patidar",
            },
            {
              label: "Linkedin",
              href: "https://www.linkedin.com/in/vijaypatidar31/",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/vijaypatidar31",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vijay Patidar.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {},
  } satisfies Preset.ThemeConfig,
};

export default config;
