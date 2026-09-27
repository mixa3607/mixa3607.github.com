import React, { useId, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import Select from 'react-select';
import {
  getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues,
  getFilteredRowModel, getSortedRowModel, useReactTable,
} from '@tanstack/react-table';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { compareValues, readMarkdownTable } from './tableModel';
import styles from './TableWrapper.module.css';

export interface TableWrapperParam {
  children: ReactNode;
  /** Force natural text sorting for numeric-looking identifiers or versions. */
  textColumns?: string[];
}

const defaultTextColumns: string[] = [];

export function TableWrapper({ children, textColumns = defaultTextColumns }: TableWrapperParam) {
  const model = useMemo(() => readMarkdownTable(children, textColumns), [children, textColumns]);
  return model ? <InteractiveTable model={model} /> : <>{children}</>;
}

function InteractiveTable({ model }: { model: NonNullable<ReturnType<typeof readMarkdownTable>> }) {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const table = useReactTable({
    data: model.data,
    columns: model.columns,
    state: { columnFilters, sorting },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  });
  const columns = table.getAllLeafColumns();
  const rows = table.getRowModel().rows;

  function moveSort(index: number, direction: number) {
    setSorting(previous => {
      const next = [...previous];
      [next[index], next[index + direction]] = [next[index + direction], next[index]];
      return next;
    });
  }

  return <div className={styles.wrapper}>
    <button type="button" className={styles.settings} aria-label="Table settings"
      title={`Table settings: ${columnFilters.length} filters, ${sorting.length} sort levels`}
      aria-expanded={settingsOpen} aria-controls={`${id}-settings`}
      onClick={() => setSettingsOpen(open => !open)}
      data-active={columnFilters.length + sorting.length > 0}>
      <span aria-hidden="true">⚙</span>
      {columnFilters.length + sorting.length > 0 && <span className={styles.badge} aria-hidden="true">{columnFilters.length + sorting.length}</span>}
    </button>
    <div id={`${id}-settings`} className={styles.toolbar} hidden={!settingsOpen}>
      <details className={styles.panel}>
        <summary>Filters{columnFilters.length > 0 && ` (${columnFilters.length})`}</summary>
        <div className={styles.filters}>
          {columns.map((column, index) => {
            const selected = (column.getFilterValue() as string[] | undefined) ?? [];
            const counts = new Map<string, number>();
            column.getFacetedUniqueValues().forEach((count, value) => counts.set(value ?? '', count));
            selected.forEach(value => { if (!counts.has(value)) counts.set(value, 0); });
            const options = [...counts].sort(([a], [b]) => compareValues(a, b, model.numeric[index]))
              .map(([value, count]) => ({ value, label: `${value || '(Empty)'} (${count})` }));
            return <div key={column.id}>
              <label htmlFor={`${id}-filter-${column.id}`}>{model.labels[index]}</label>
              <Select
                instanceId={`${id}-select-${column.id}`}
                inputId={`${id}-filter-${column.id}`}
                classNamePrefix="table-select"
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={options}
                value={options.filter(option => selected.includes(option.value))}
                onChange={values => column.setFilterValue(values.length ? values.map(option => option.value) : undefined)}
                placeholder="All values"
                theme={theme => ({ ...theme, colors: {
                  ...theme.colors,
                  primary: 'var(--ifm-color-primary)',
                  primary25: 'var(--ifm-hover-overlay)',
                  primary50: 'var(--ifm-color-emphasis-200)',
                  neutral0: 'var(--ifm-background-surface-color)',
                  neutral10: 'var(--ifm-color-emphasis-200)',
                  neutral20: 'var(--ifm-color-emphasis-400)',
                  neutral30: 'var(--ifm-color-emphasis-500)',
                  neutral50: 'var(--ifm-color-emphasis-600)',
                  neutral80: 'var(--ifm-font-color-base)',
                } })}
              />
            </div>;
          })}
        </div>
        <button type="button" onClick={() => setColumnFilters([])} disabled={!columnFilters.length}>Reset filters</button>
      </details>
      <details className={styles.panel}>
        <summary>Sort{sorting.length > 0 && ` (${sorting.length})`}</summary>
        {sorting.map((sort, index) => <div className={styles.sortLevel} key={sort.id}>
          <span>{index === 0 ? 'Sort by' : 'Then by'}</span>
          <select aria-label={`Sort column ${index + 1}`} value={sort.id} onChange={event => {
            const value = event.target.value;
            setSorting(previous => previous.map((item, i) => i === index ? { ...item, id: value } : item));
          }}>
            {columns.filter(column => column.id === sort.id || !sorting.some(item => item.id === column.id))
              .map(column => <option key={column.id} value={column.id}>{model.labels[Number(column.id)]}</option>)}
          </select>
          <select aria-label={`Sort direction ${index + 1}`} value={sort.desc ? 'desc' : 'asc'} onChange={event => {
            const desc = event.target.value === 'desc';
            setSorting(previous => previous.map((item, i) => i === index ? { ...item, desc } : item));
          }}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button type="button" aria-label={`Move sort level ${index + 1} up`} disabled={index === 0} onClick={() => moveSort(index, -1)}>↑</button>
          <button type="button" aria-label={`Move sort level ${index + 1} down`} disabled={index === sorting.length - 1} onClick={() => moveSort(index, 1)}>↓</button>
          <button type="button" aria-label={`Remove sort level ${index + 1}`} onClick={() => setSorting(previous => previous.filter((_, i) => i !== index))}>×</button>
        </div>)}
        <div className={styles.actions}>
          <button type="button" disabled={sorting.length === columns.length} onClick={() => {
            const next = columns.find(column => !sorting.some(item => item.id === column.id));
            if (next) setSorting(previous => [...previous, { id: next.id, desc: false }]);
          }}>Add level</button>
          <button type="button" disabled={!sorting.length} onClick={() => setSorting([])}>Reset sorting</button>
        </div>
        <small>Click a sorted heading to reverse it, keeping other levels. Shift+click a new heading to add a level.</small>
      </details>
      <small role="status">Showing {rows.length} of {model.data.length} rows</small>
    </div>
    <div className={styles.scroll}>
      {React.cloneElement(model.table, {},
        React.cloneElement(model.head, {}, React.cloneElement(model.headerRow, {},
          model.headers.map((header, index) => {
            const column = columns[index];
            const direction = column.getIsSorted();
            return React.cloneElement(header, {
              key: column.id,
              // aria-sort describes the primary key; secondary priorities are in the button text.
              'aria-sort': column.getSortIndex() === 0 ? (direction === 'asc' ? 'ascending' : 'descending') : undefined,
            }, <button type="button" className={styles.heading} onClick={event => {
              // An explicit direction avoids TanStack's removal cycle; multi=true
              // preserves the existing priorities when changing a sorted column.
              column.toggleSorting(direction === 'asc', Boolean(direction) || event.shiftKey);
            }}>
              {header.props.children}
              {direction && <span> {direction === 'asc' ? '↑' : '↓'}{sorting.length > 1 && column.getSortIndex() + 1}</span>}
            </button>);
          }),
        )),
        React.cloneElement(model.body, {}, rows.length
          ? rows.map(row => React.cloneElement(row.original.element, { key: row.id }))
          : <tr><td colSpan={columns.length}>No matching rows. Try resetting the filters.</td></tr>),
      )}
    </div>
    {!settingsOpen && columnFilters.length > 0 && <small role="status">Showing {rows.length} of {model.data.length} rows</small>}
  </div>;
}

export default TableWrapper;
