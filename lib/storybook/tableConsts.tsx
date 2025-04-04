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
      width: "120px",
    },
    {
      label: "Full Name",
      name: "name",
      width: "200px",
    },
    {
      label: "Department",
      name: "department",
      width: "180px",
    },
    {
      label: "Performance",
      name: "performance",
      width: "150px",
    },
  ] as ColOption[],
  rows: [], // Rows will be populated by the API simulator
};
