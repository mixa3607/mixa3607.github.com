import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

interface IVersionGlobalVariables {
  [key: string]: string;
}
interface IGlobalVariables {
  [key: string]: IVersionGlobalVariables;
}
const globalVariables: IGlobalVariables = {
  "": {
    "storageBaseUrl": "https://static.arkprojects.space/public-data/wiki",
  }
}

const config: Config = {
  title: 'KBD',
  tagline: 'docs',
  favicon: 'img/favicon.png',
  url: 'https://arkprojects.space',
  baseUrl: '/',
  trailingSlash: false,
  organizationName: 'mixa3607',
  projectName: 'KBD',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  presets: [
    [
      'classic',
      {
        blog: false,
        docs: {
          routeBasePath: '/',
          editUrl: 'https://github.com/mixa3607/mixa3607.github.com/edit/master',
          sidebarPath: './sidebars.ts',
          sidebarCollapsed: false,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
    preprocessor: ({ filePath, fileContent }) => {
      var key = "";
      let content = fileContent;
      for (const variable in globalVariables[key]) {
        content = content.replaceAll(
          "@" + variable + "@",
          globalVariables[key][variable]
        );
      }

      return content;
    },
  },

  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["en", "ru"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexBlog: false,
        docsRouteBasePath: '/',
      }),
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/og-image.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'KDB',
      logo: {
        src: 'img/favicon.png',
      },
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'wiki/index',
          label: 'Docs',
        },
        {
          href: "https://github.com/mixa3607/mixa3607.github.com",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
      }
    },
    footer: {},
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.duotoneDark,
      additionalLanguages: ['csharp', 'powershell', 'yaml', 'bash', 'ini'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
