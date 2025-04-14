# Atom Grid Table

A highly customizable React table component built with CSS Grid and Subgrid, offering cell-level control and modern layout capabilities.

## Features

- 🎯 Built for React applications
- 📐 CSS Grid-based layout with Subgrid support
- 🎨 Customizable down to individual cell level
- 🔄 Built-in sorting functionality
- 📄 Pagination support
- ✨ Row selection capabilities
- 📱 Resizable columns
- 🔍 Loading state with skeleton placeholders
- 🎭 Multiple theme support
- 🎪 Zebra striping option
- 📊 Header row configuration
- ⚡ Lightweight with minimal dependencies (only React and React DOM)

## Dependencies

The package has minimal dependencies:

- `react` (^18.2.0)
- `react-dom` (^18.2.0)
- `react-use` (^17.5.1)

## Installation

```bash
npm install @sanbira/atom-grid-table
```

## Usage

```tsx
import { AtomGridTable } from "@sanbira/atom-grid-table";
import type { TableProps, TableRow, TableCell, ColOption } from "@sanbira/atom-grid-table";

const colOptions: ColOption[] = [
  { label: "Name", name: "name", width: "200px" },
  { label: "Age", name: "age", width: "100px" },
];

const rows: TableRow[] = [
  {
    cells: [{ content: "John Doe" }, { content: "30" }],
  },
  {
    cells: [{ content: "Jane Smith" }, { content: "25" }],
  },
];

function MyTable() {
  return <AtomGridTable colOptions={colOptions} rows={rows} isHasSelect={true} tableTheme="basic" />;
}
```

## Props

### TableProps

```typescript
interface TableProps {
  colOptions: ColOption[];
  rows: TableRow[];
  className?: string;
  isLoading?: boolean;
  loaderRowsCount?: number;
  selectedRows?: (number | string)[];
  isHasSelect?: boolean;
  tableTheme?: string;
  selectionArea?: string;
  setSelected?: (selected: (number | string)[]) => void;
  paginationOptions?: PaginationOptions;
  sortingOptions?: SortingOptions;
  tableStyleOptions?: TableStyleOptions;
}
```

### ColOption

```typescript
interface ColOption {
  label?: string;
  tooltip?: string;
  name?: string;
  width?: string;
  resizeOptions?: { min: number; max: number };
  isHeadersColumn?: boolean;
}
```

### TableRow

```typescript
interface TableRow {
  cells: (TableCell | undefined)[];
  isActive?: boolean;
  selectIdentifier?: number | string;
  isHeader?: boolean;
}
```

### TableCell

```typescript
interface TableCell {
  content: ReactNode;
  span?: number;
  isOneLine?: boolean;
  isNumber?: boolean;
  isHeader?: boolean;
  isNoPadding?: boolean;
  isDisabled?: boolean;
  isCentered?: boolean;
}
```

## Features

- Column resizing
- Row selection
- Pagination
- Sorting
- Loading states
- Custom themes
- Zebra striping
- Custom cell padding
- Header row support

## License

MIT
