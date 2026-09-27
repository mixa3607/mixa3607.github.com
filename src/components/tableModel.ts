import { Children, isValidElement } from 'react';
import type { AriaAttributes, ReactElement, ReactNode } from 'react';
import type { ColumnDef } from '@tanstack/react-table';

type Element = ReactElement<AriaAttributes & {
  children?: ReactNode;
  colSpan?: number;
  rowSpan?: number;
}>;

export interface MarkdownRow {
  element: Element;
  values: string[];
}

function elements(children: ReactNode): Element[] {
  return Children.toArray(children).filter(isValidElement) as Element[];
}

function text(node: ReactNode): string {
  return Children.toArray(node).map(child => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (isValidElement<{ children?: ReactNode; alt?: string }>(child)) {
      return child.props.alt ?? text(child.props.children);
    }
    return '';
  }).join('');
}

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
const numberPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;

export function compareValues(a: string, b: string, numeric = false): number {
  return numeric ? Number(a) - Number(b) : collator.compare(a, b);
}

// MDX element types may be functions, so use the standard table structure,
// rather than matching component names or reading the browser DOM.
export function readMarkdownTable(children: ReactNode, textColumns: string[] = []) {
  const tables = elements(children);
  if (tables.length !== 1) return null;
  const table = tables[0];
  const sections = elements(table.props.children);
  if (sections.length !== 2) return null;
  const [head, body] = sections;
  const headerRows = elements(head.props.children);
  if (headerRows.length !== 1) return null;
  const headerRow = headerRows[0];
  const headers = elements(headerRow.props.children);
  if (!headers.length) return null;
  const rowElements = elements(body.props.children);
  const cells = rowElements.map(row => elements(row.props.children));
  if (cells.some(row => row.length !== headers.length) ||
      [...headers, ...cells.flat()].some(cell =>
        (cell.props.colSpan ?? 1) !== 1 || (cell.props.rowSpan ?? 1) !== 1)) return null;

  const labels = headers.map(header => text(header.props.children).trim());
  const data: MarkdownRow[] = rowElements.map((element, index) => ({
    element,
    values: cells[index].map(cell => text(cell.props.children).trim()),
  }));
  const numeric = labels.map((label, index) => {
    const values = data.map(row => row.values[index]).filter(Boolean);
    return !textColumns.includes(label) && !/version|rocm/i.test(label) &&
      values.length > 0 && values.every(value => numberPattern.test(value) && Number.isFinite(Number(value)));
  });
  const columns: ColumnDef<MarkdownRow>[] = labels.map((label, index) => ({
    id: String(index),
    header: label,
    // undefined makes TanStack's sortUndefined work without treating blanks as zero.
    accessorFn: row => row.values[index] || undefined,
    sortUndefined: 'last',
    sortDescFirst: false,
    sortingFn: (a, b) => compareValues(a.original.values[index], b.original.values[index], numeric[index]),
    filterFn: (row, _id, selected: string[]) => selected.includes(row.original.values[index]),
  }));
  return { table, head, body, headerRow, headers, labels, data, columns, numeric };
}
