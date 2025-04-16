import { ColOption, TableRow } from "../types/table.types";

export const BasicTableProp = {
  colOptions: [
    {
      label: "Name",
      name: "name",
      width: "200px",
      resizeOptions: { min: 100, max: 300 },
      tooltip: "This is a tooltip",
    },
    {
      label: "Age",
      width: "100px",
      isResizable: true,
    },
    {
      label: "Email",
      width: "250px",
      resizeOptions: { min: 100, max: 300 },
      isResizable: true,
    },
    {
      label: "Status",
      name: "status",
      width: "150px",
    },
  ] as ColOption[],
  rows: [
    {
      selectIdentifier: "1",
      cells: [
        { content: "John Doe", isOneLine: true },
        { content: "32", isNumber: true },
        { content: "john.doe@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
    {
      selectIdentifier: "2",
      cells: [
        { content: "Jane Smith", isOneLine: true },
        { content: "28", isNumber: true },
        { content: "jane.smith@example.com" },
        { content: "Inactive", className: "status-inactive" },
      ],
    },
    {
      selectIdentifier: "3",
      cells: [
        { content: "Bob Johnson", isOneLine: true },
        { content: "45", isNumber: true },
        { content: "bob.johnson@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
    {
      selectIdentifier: "4",
      cells: [
        { content: "Alice Brown", isOneLine: true },
        { content: "35", isNumber: true },
        { content: "alice.brown@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
  ] as TableRow[],
};

export const LargeTableProp = {
  colOptions: [
    {
      label: "Employee ID",
      name: "id",
      isResizable: true,
    },
    {
      label: "Full Name",
      name: "name",
      isResizable: true,
    },
    {
      label: "Department",
      name: "department",
      isResizable: true,
    },
    {
      label: "Performance",
      name: "performance",
      isResizable: true,
    },
  ] as ColOption[],
  rows: [], // Rows will be populated by the API simulator
};

export const MultiSectionTableProp = {
  colOptions: [
    {
      label: "Name",
      name: "name",
      width: "200px",
      resizeOptions: { min: 100, max: 300 },
      tooltip: "This is a tooltip",
    },
    {
      label: "Age",
      width: "100px",
    },
    {
      label: "Email",
      width: "250px",
    },
    {
      label: "Status",
      name: "status",
      width: "150px",
    },
  ] as ColOption[],
  rows: [
    // Section 1 Header
    {
      cells: [{ content: "Section 1", span: 4 }],
      isHeader: true,
      isSticky: true,
    },
    // Section 1 Rows
    {
      selectIdentifier: "1-1",
      cells: [
        { content: "Alpha One", isOneLine: true },
        { content: "21", isNumber: true },
        { content: "alpha.one@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
    {
      selectIdentifier: "1-2",
      cells: [
        { content: "Beta Two", isOneLine: true },
        { content: "22", isNumber: true },
        { content: "beta.two@example.com" },
        { content: "Inactive", className: "status-inactive" },
      ],
    },
    {
      selectIdentifier: "1-3",
      cells: [
        { content: "Gamma Three", isOneLine: true },
        { content: "23", isNumber: true },
        { content: "gamma.three@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
    // Section 2 Header
    {
      cells: [{ content: "Section 2", span: 4 }],
      isHeader: true,
      isSticky: true,
    },
    // Section 2 Rows
    {
      selectIdentifier: "2-1",
      cells: [
        { content: "Delta Four", isOneLine: true },
        { content: "24", isNumber: true },
        { content: "delta.four@example.com" },
        { content: "Inactive", className: "status-inactive" },
      ],
    },
    {
      selectIdentifier: "2-2",
      cells: [
        { content: "Epsilon Five", isOneLine: true },
        { content: "25", isNumber: true },
        { content: "epsilon.five@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
    {
      selectIdentifier: "2-3",
      cells: [
        { content: "Zeta Six", isOneLine: true },
        { content: "26", isNumber: true },
        { content: "zeta.six@example.com" },
        { content: "Inactive", className: "status-inactive" },
      ],
    },
    // Section 3 Header
    {
      cells: [{ content: "Section 3", span: 4 }],
      isHeader: true,
      isSticky: true,
    },
    // Section 3 Rows
    {
      selectIdentifier: "3-1",
      cells: [
        { content: "Eta Seven", isOneLine: true },
        { content: "27", isNumber: true },
        { content: "eta.seven@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
    {
      selectIdentifier: "3-2",
      cells: [
        { content: "Theta Eight", isOneLine: true },
        { content: "28", isNumber: true },
        { content: "theta.eight@example.com" },
        { content: "Inactive", className: "status-inactive" },
      ],
    },
    {
      selectIdentifier: "3-3",
      cells: [
        { content: "Iota Nine", isOneLine: true },
        { content: "29", isNumber: true },
        { content: "iota.nine@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
    // Section 4 Header
    {
      cells: [{ content: "Section 4", span: 4 }],
      isHeader: true,
      isSticky: true,
    },
    // Section 4 Rows
    {
      selectIdentifier: "4-1",
      cells: [
        { content: "Kappa Ten", isOneLine: true },
        { content: "30", isNumber: true },
        { content: "kappa.ten@example.com" },
        { content: "Inactive", className: "status-inactive" },
      ],
    },
    {
      selectIdentifier: "4-2",
      cells: [
        { content: "Lambda Eleven", isOneLine: true },
        { content: "31", isNumber: true },
        { content: "lambda.eleven@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
    {
      selectIdentifier: "4-3",
      cells: [
        { content: "Mu Twelve", isOneLine: true },
        { content: "32", isNumber: true },
        { content: "mu.twelve@example.com" },
        { content: "Inactive", className: "status-inactive" },
      ],
    },
    // Section 5 Header
    {
      cells: [{ content: "Section 5", span: 4 }],
      isHeader: true,
      isSticky: true,
    },
    // Section 5 Rows
    {
      selectIdentifier: "5-1",
      cells: [
        { content: "Nu Thirteen", isOneLine: true },
        { content: "33", isNumber: true },
        { content: "nu.thirteen@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
    {
      selectIdentifier: "5-2",
      cells: [
        { content: "Xi Fourteen", isOneLine: true },
        { content: "34", isNumber: true },
        { content: "xi.fourteen@example.com" },
        { content: "Inactive", className: "status-inactive" },
      ],
    },
    {
      selectIdentifier: "5-3",
      cells: [
        { content: "Omicron Fifteen", isOneLine: true },
        { content: "35", isNumber: true },
        { content: "omicron.fifteen@example.com" },
        { content: "Active", className: "status-active" },
      ],
    },
  ] as TableRow[],
};
