// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes, vsDark} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KodMod',
  tagline: 'Bir proqramçının qeydləri',
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
        googleTagManager: {
          containerId: 'GTM-NK8FH8HZ',
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
            to: '/sistem-dizayn',
            label: 'Sistem Dizaynı',
            position: 'left',
          },
          {
            to: '/mikroservisler',
            label: 'Mikroservislər',
            position: 'left',
          },

          {
            to: '/database',
            label: 'Database',
            position: 'left',
          },
          {
            to: '/design-patternler',
            label: 'Dizayn Patternlər',
            position: 'left',
          },
          {
            to: '/alqoritmler',
            label: 'Alqoritmlər',
            position: 'left',
          },
          {
            to: '/data-strukturlar',
            label: 'Data Strukturları',
            position: 'left',
          },
          {
            to: '/texnologiyalar',
            label: 'Texnologiyalar',
            position: 'left',
          },
          {
            to: '/java',
            label: 'Java',
            position: 'left',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Əsas Mövzular',
            items: [
              {
                label: 'Java',
                to: '/java',
              },
              {
                label: 'Dizayn Pattern-lər',
                to: '/design-patternler',
              },
              {
                label: 'Sistem Dizaynı',
                to: '/sistem-dizayn',
              },
            ],
          },
          {
            title: 'Digər Mövzular',
            items: [
              {
                label: 'Alqoritmlər',
                to: '/alqoritmler',
              },
              {
                label: 'Data Strukturları',
                to: '/data-strukturlar',
              },
              {
                label: 'Verilənlər Bazası',
                to: '/database',
              },
            ],
          },
          {
            title: 'Texnologiyalar',
            items: [
              {
                label: 'Texnologiyalar',
                to: '/tech',
              },
              {
                label: 'Mikroservislər',
                to: '/mikroservisler',
              },
            ],
          }
        ],
        copyright: ` © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: prismThemes.vsLight,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['java','powershell','http'],
      },
    }),

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
