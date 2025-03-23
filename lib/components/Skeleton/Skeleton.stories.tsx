import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: "200px", height: "20px" }}>
      <Skeleton />
    </div>
  ),
};
