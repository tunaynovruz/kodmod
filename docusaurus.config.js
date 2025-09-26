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
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          }}
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
          },
          {
            to: '/testing',
            label: 'Testing',
            position: 'left',
          },
          {
            to: '/security',
            label: 'Security',
            position: 'left',
          },
          {
            to: '/interview',
            label: 'Interview',
            position: 'left',
          },
          {
            to: '/diaqramlar',
            label: 'Diaqramlar',
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
              {
                label: 'Mikroservislər',
                to: '/mikroservisler',
              }
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
              {
                label: 'Texnologiyalar',
                to: '/texnologiyalar',
              }
            ],
          },
          {
            title: 'Təhlükəsizlik & Test',
            items: [
              {
                label: 'Security',
                to: '/security',
              },
              {
                label: 'Testing',
                to: '/testing',
              },
              {
                label: 'Interview',
                to: '/interview',
              },
              {
                label: 'Diaqramlar',
                to: '/diaqramlar',
              }
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
        algolia: {
            // The application ID provided by Algolia
            appId: 'MT41ANL2JL',

            // Public API key: it is safe to commit it
            apiKey: 'e5c42bf94a805c544a38897b74e9816d',

            indexName: 'Kodmod',

            // Optional: see doc section below
            contextualSearch: true,

            // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
            externalUrlRegex: 'external\\.com|domain\\.com',

            // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
            replaceSearchResultPathname: {
                from: '/docs/', // or as RegExp: /\/docs\//
                to: '/',
            },

            // Optional: Algolia search parameters
            searchParameters: {},

            // Optional: path for search page that enabled by default (`false` to disable it)
            searchPagePath: 'search',

            // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
            insights: false,

            // Optional: whether you want to use the new Ask AI feature (undefined by default)
            askAi: 'YOUR_ALGOLIA_ASK_AI_ASSISTANT_ID',

            //... other Algolia params
        },
    }),

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
