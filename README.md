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
- 📌 Sticky header and sticky row support
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

## Custom Components

Atom Grid Table allows you to replace its base components with your own custom implementations. This is done through the `AtomGridTableProvider` context. Here's how to use it:

```tsx
import { AtomGridTableProvider } from "@sanbira/atom-grid-table";

// Your custom components
const CustomTooltip = (props) => <div className="my-tooltip">{props.children}</div>;
const CustomSelect = (props) => <select className="my-select">{props.children}</select>;
const CustomIconButton = (props) => <button className="my-icon-button">{props.children}</button>;
const CustomTypography = (props) => <span className="my-typography">{props.children}</span>;
const CustomSkeleton = () => <div className="my-skeleton" />;
const CustomCheckbox = (props) => <input type="checkbox" className="my-checkbox" {...props} />;

function App() {
  return (
    <AtomGridTableProvider
      customComponents={{
        tooltip: CustomTooltip,
        select: CustomSelect,
        iconButton: CustomIconButton,
        typography: CustomTypography,
        skeleton: CustomSkeleton,
        checkbox: CustomCheckbox,
      }}
    >
      <AtomGridTable colOptions={colOptions} rows={rows} />
    </AtomGridTableProvider>
  );
}
```

### Available Custom Components

You can replace any of these base components:

- `tooltip`: For tooltip functionality
- `select`: For dropdown selections
- `iconButton`: For icon buttons
- `typography`: For text elements
- `skeleton`: For loading states
- `checkbox`: For checkbox inputs

## Table Context Provider

The `AtomGridTableProvider` allows you to set default options and custom components that will be used across all `AtomGridTable` instances within its scope. This is particularly useful for:

1. Setting global table defaults
2. Providing custom components
3. Maintaining consistent styling and behavior across multiple tables

### Usage

```tsx
import { AtomGridTableProvider } from "@sanbira/atom-grid-table";

function App() {
  return (
    <AtomGridTableProvider
      defaultTableOptions={{
        tableStyleOptions: {
          isFirstRowHeader: true,
          isZebra: true,
          isNoXCellBorders: false,
          isSmallCellPadding: true,
        },
        isHasSelect: true,
        loaderRowsCount: 5,
        // ... other default options
      }}
      customComponents={
        {
          // ... your custom components
        }
      }
    >
      <AtomGridTable colOptions={colOptions} rows={rows} />
      <AtomGridTable colOptions={otherColOptions} rows={otherRows} />
    </AtomGridTableProvider>
  );
}
```

### Props

```typescript
interface AtomGridTableContextProps {
  defaultTableOptions?: Partial<TableProps>;
  customComponents?: {
    tooltip?: React.ComponentType<TooltipProps>;
    select?: React.ComponentType<SelectProps>;
    iconButton?: React.ComponentType<IconButtonProps>;
    typography?: React.ComponentType<TypographyProps>;
    skeleton?: React.ComponentType;
    checkbox?: React.ComponentType<CheckboxProps>;
  };
}
```

## License

MIT
