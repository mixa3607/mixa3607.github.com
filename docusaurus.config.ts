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
  scripts: [
    {
      src: "https://cdn.jsdelivr.net/gh/tofsjonas/sortable@latest/dist/sortable.auto.min.js",
    }
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },
  plugins: [
    [
      "docusaurus-plugin-remote-content",
      {
        name: "content",
        sourceBaseUrl: "https://github.com/mixa3607/uefi-mod-tools/raw/refs/tags/v1.1.0/",
        outDir: "docs/wiki/hardware/tools/uefi-mod-tools",
        documents: ["readme.md"],
        modifyContent: (filename: string, content: string) => ({ filename: "_" + filename, content })
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {

      }
    ]
  ],

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
          customCss: [
            './src/css/custom.css',
            './src/css/sortable-tables.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
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
    "@docusaurus/theme-mermaid",
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
    announcementBar: {
      id: "static-server-is-down",
      backgroundColor: "#ff0000ff",
      textColor: "#ffffffff",
      isCloseable: false,
      content: "Server with files is down. Some links may be not work"
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
