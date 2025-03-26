import { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AtomGridTable from "./AtomGridTable";

const meta: Meta<ComponentProps<typeof AtomGridTable>> = {
  title: "Components/AtomGridTable",
  component: AtomGridTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AtomGridTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colOptions: [
      {
        label: "Name",
        name: "name",
        width: "200px",
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
    ],
    rows: [
      {
        cells: [
          { content: "John Doe" },
          { content: "32", isNumber: true },
          { content: "john.doe@example.com" },
          { content: "Active", className: "status-active" },
        ],
      },
      {
        cells: [
          { content: "Jane Smith" },
          { content: "28", isNumber: true },
          { content: "jane.smith@example.com" },
          { content: "Inactive", className: "status-inactive" },
        ],
      },
      {
        cells: [
          { content: "Bob Johnson" },
          { content: "45", isNumber: true },
          { content: "bob.johnson@example.com" },
          { content: "Active", className: "status-active" },
        ],
      },
      {
        cells: [
          { content: "Alice Brown" },
          { content: "35", isNumber: true },
          { content: "alice.brown@example.com" },
          { content: "Active", className: "status-active" },
        ],
      },
    ],
    isHasSelect: true,
    tableType: "basic",
  },
};
