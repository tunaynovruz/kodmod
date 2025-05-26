// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KodMod',
  tagline: 'Proqramlaşdırmaya dair',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://cs.tunay.me',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'az',
    locales: ['az'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          tagsBasePath: '/etiketler',
          routeBasePath: '/'
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Kodmod',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Giriş',
          },
          {
            href: 'https://github.com/tunaynovruz/kodmod',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            items: [
              {
                label: 'Giriş',
                to: '/docs/intro',
              },
              {
                label: 'Giriş',
                to: '/docs/intro',
              },
            ],
          },
          {
            items: [
              {
                label: 'Giriş',
                to: '/docs/intro',
              },
              {
                label: 'Giriş',
                to: '/docs/intro',
              },
            ],
          },
          {
            items: [
              {
                label: 'Giriş',
                to: '/docs/intro',
              },
              {
                label: 'Giriş',
                to: '/docs/intro',
              },
            ],
          },
          {
            items: [
              {
                label: 'Giriş',
                to: '/docs/intro',
              },
              {
                label: 'Giriş',
                to: '/docs/intro',
              },
            ],
          }
        ],
        copyright: ` © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
