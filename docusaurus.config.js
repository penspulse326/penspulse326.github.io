// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Penspulse",
  tagline: "前端筆記",
  favicon: "img/favicon.ico",
  url: "https://penspulse326.github.io",
  baseUrl: "/",
  organizationName: "penspulse326",
  projectName: "penspulse326.github.io",
  deploymentBranch: "gh-pages",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["en", "zh-Hant"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Penspulse",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "筆記",
          },
          { to: "/blog", label: "學習日記", position: "left" },
          { to: "/blog/tags", label: "文章標籤", position: "left" },
          {
            href: "https://github.com/penspulse326",
            label: "Github",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      metadata: [
        {
          name: "keywords",
          content: "前端, 部落格, 火箭隊, 火箭隊培訓營, JavaScript",
        },
        {
          name: "google-site-verification",
          content: "BT40gvqlnLc8hWqvB_OG0IS3cUgqoKo4pwt7qGy-5_E",
        },
      ],
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
