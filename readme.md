# KBD Docs site

![ci](https://img.shields.io/github/actions/workflow/status/mixa3607/mixa3607.github.com/deploy-wiki.yaml?branch=master&style=flat-square)

## Interactive Markdown tables (POC)

Existing tables inside `TableWrapper` use TanStack Table for sorting and faceted
filtering, and react-select for searchable multi-select controls. Table contents
stay in Markdown, including links and inline formatting:

```mdx
import TableWrapper from '@site/src/components/TableWrapper';

<TableWrapper>

| ROCm | GPUs | Speed |
| --- | --- | --- |
| 7.2.4 | 4 | 726.73 |
| 7.14 | 4 | 767.75 |

</TableWrapper>
```

- Hover over a table or focus a control inside it to reveal the **⚙** button on
  its right. The button stays visible when filters/sorting are active, and on touch
  devices. Click it to show/hide the **Filters** and **Sort** collapsible sections
  above the table. They start hidden. Hiding them preserves their expanded/collapsed
  state and all selected filters and sort levels.
- Use **Filters** to select values. Selections within a column use OR; columns
  combine with AND. Available values/counts respect the other column filters.
- Open **Sort** to add, remove, reorder, and change the direction of sort levels.
  Clicking an already sorted heading reverses its direction without removing or
  reordering other levels. Clicking a new heading starts a single-column sort;
  Shift+click adds it as another level. Remove levels via the settings panel.
- Numbers sort numerically, blanks stay last, and text uses natural ordering.
  ROCm/version columns use text ordering. For other numeric-looking identifiers,
  use `<TableWrapper textColumns={['Code']}>`.
- Each table has independent state. Controls follow the site's light/dark theme.

The adapter supports standard Markdown tables with one header row. Unsupported
structures (such as merged cells) render unchanged. Values are extracted from
static cell children; arbitrary components that compute their own displayed
content are outside this POC. Filter/sort state is not persisted across navigation.

Example page: `/wiki/AMD_GFX906/llamacpp/rocm-comparison-2026-09`.

Checks:

```sh
npm run typecheck
npm run build
# Adapter + TanStack integration tests; requires Node 22.18+ or 24+ for native TS:
node --test tests/table-model.test.mjs
```
