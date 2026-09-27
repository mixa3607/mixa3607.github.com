import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement as h } from 'react';
import {
  createTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel,
  getFacetedRowModel, getFacetedUniqueValues,
} from '@tanstack/react-table';
import { readMarkdownTable } from '../src/components/tableModel.ts';

function fixture() {
  const link = h('a', { href: '/version' }, h('code', {}, '7.14'));
  const rows = [
    ['7.2.4', '4', '10'],
    [link, '4', '2'],
    ['10.0', '2', '30'],
    ['6.3.3', '4', ''],
    ['7.2.4', '4', '20'],
  ];
  // Function components mimic Docusaurus MDX table elements.
  const component = tag => props => h(tag, props);
  const model = readMarkdownTable(h(component('table'), {},
    h(component('thead'), {}, h(component('tr'), {},
      ...['ROCm', 'GPUs', 'Speed'].map(label => h(component('th'), {}, label)))),
    h(component('tbody'), {}, ...rows.map(row => h(component('tr'), {},
      ...row.map(value => h(component('td'), {}, value))))),
  ));
  const state = { columnFilters: [], sorting: [] };
  const table = createTable({
    data: model.data, columns: model.columns, state,
    onStateChange() {}, renderFallbackValue: null,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const update = patch => table.setOptions(previous => ({ ...previous, state: { ...previous.state, ...patch } }));
  return { model, table, update, link };
}

test('MDX adapter preserves rich cells and extracts searchable values', () => {
  const { model, link } = fixture();
  assert.equal(model.data[1].values[0], '7.14');
  assert.equal(model.data[1].element.props.children[0].props.children, link);
  assert.deepEqual(model.numeric, [false, true, true]);
});

test('facets apply other filters, exclude their own, and count duplicates', () => {
  const { table, update } = fixture();
  update({ columnFilters: [{ id: '1', value: ['4'] }, { id: '0', value: ['7.2.4'] }] });
  assert.equal(table.getRowModel().rows.length, 2);
  assert.deepEqual([...table.getColumn('0').getFacetedUniqueValues()], [['7.2.4', 2], ['7.14', 1], ['6.3.3', 1]]);
  update({ columnFilters: [{ id: '1', value: ['4'] }, { id: '0', value: ['7.2.4', '7.14'] }] });
  assert.equal(table.getRowModel().rows.length, 3);
});

test('multi-sort follows priority and sorts versions naturally', () => {
  const { table, update } = fixture();
  update({ sorting: [{ id: '1', desc: true }, { id: '0', desc: false }, { id: '2', desc: true }] });
  assert.deepEqual(table.getRowModel().rows.map(row => row.original.values), [
    ['6.3.3', '4', ''], ['7.2.4', '4', '20'], ['7.2.4', '4', '10'],
    ['7.14', '4', '2'], ['10.0', '2', '30'],
  ]);
});

test('numbers sort numerically and blanks stay last in both directions', () => {
  const { table, update } = fixture();
  for (const desc of [false, true]) {
    update({ sorting: [{ id: '2', desc }] });
    assert.deepEqual(table.getRowModel().rows.map(row => row.original.values[2]),
      desc ? ['30', '20', '10', '2', ''] : ['2', '10', '20', '30', '']);
  }
  update({ columnFilters: [{ id: '2', value: [''] }] });
  assert.equal(table.getRowModel().rows.length, 1);
});

test('unsupported table structures fall back to their original rendering', () => {
  assert.equal(readMarkdownTable(h('table', {}, h('tbody'))), null);
});
