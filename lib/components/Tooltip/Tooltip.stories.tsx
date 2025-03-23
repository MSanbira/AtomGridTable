import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { IconButton } from "../IconButton/IconButton";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    content: "This is a tooltip",
    children: <button>Hover me</button>,
  },
};

export const WithIconButton: Story = {
  args: {
    content: "Settings",
    children: <IconButton icon="⚙️" aria-label="Settings" />,
  },
};

export const WithLongContent: Story = {
  args: {
    content: "This is a longer tooltip that might wrap to multiple lines",
    children: <button>Hover for long tooltip</button>,
  },
};
