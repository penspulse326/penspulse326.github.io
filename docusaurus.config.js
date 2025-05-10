// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Pen's Pulse",
  tagline: "前端筆記",
  favicon: "img/favicon.ico",
  url: "https://penspulse326.github.io/",
  baseUrl: "/",
  organizationName: "penspulse326",
  projectName: "penspulse326.github.io",
  deploymentBranch: "gh-pages",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["zh-Hant", "en"],
  },

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "projects",
        path: "projects",
        routeBasePath: "projects",
        sidebarPath: require.resolve("./sidebarProjects.js"),
        // editUrl:
        //   "https://github.com/penspulse326/penspulse326.github.io/edit/main/",
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          routeBasePath: "docs",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          blogSidebarCount: 10,
          blogSidebarTitle: "近期文章",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-CW2LGTM5N5",
          anonymizeIP: true,
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
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Pen's Pulse",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "筆記",
            to: "/docs",
          },
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "實作",
            docsPluginId: "projects",
          },
          { to: "/blog", label: "文章", position: "left" },
          { to: "/blog/tags", label: "文章標籤", position: "left" },
          {
            href: "https://github.com/penspulse326",
            className: "header-github-link",
            position: "right",
            "aria-label": "GitHub",
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
          content:
            "前端, 網頁前端, 前端開發, JavaScript, React.js, front end, web design, penspulse",
        },
        {
          name: "google-site-verification",
          content: "y1fosEIPhMHBWjB5UUareJqGdW8985Ce21yBQrSRPvs",
        },
        {
          name: "robots",
          content: "max-image-preview:standard",
        },
      ],
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
