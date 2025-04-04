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

## Installation

[placeholder]

## Basic Usage

```tsx
import AtomGridTable from "atom-grid-table";

const MyTable = () => {
  const columns = [
    { name: "id", label: "ID" },
    { name: "name", label: "Name", width: "200px" },
    { name: "email", label: "Email" },
  ];

  const rows = [
    {
      cells: [{ content: "1" }, { content: "John Doe" }, { content: "john@example.com" }],
    },
  ];

  return <AtomGridTable colOptions={columns} rows={rows} />;
};
```

## Customization

The table can be customized using the following props:

[placeholder]

## Cell-Level Customization

Each cell can be customized with various properties:

[placeholder]

## License

MIT
