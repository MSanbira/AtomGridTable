import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Basic: Story = {
  args: {
    icon: "★",
    "aria-label": "Star",
  },
};

export const Disabled: Story = {
  args: {
    icon: "★",
    disabled: true,
    "aria-label": "Star",
  },
};
