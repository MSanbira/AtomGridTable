import { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AtomGridTable from "../AtomGridTable";
import React from "react";
import { BasicTableProp } from "./tableConsts";
import { TableWithSelectedRows } from "./TableWithSelectedRows";
import { TableWithPageAndSort } from "./TableWithPageAndSort";
import { TableWithActions } from "./TableWithActions";

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

export const Default: Story = { args: BasicTableProp };

export const WithSelectedRows: Story = {
  render: () => <TableWithSelectedRows />,
};

export const WithPageAndSort: Story = {
  render: () => <TableWithPageAndSort />,
};

export const WithActions: Story = {
  render: () => <TableWithActions />,
};
