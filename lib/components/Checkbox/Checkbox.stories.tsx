import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  render: () => (
    <div className="col-container:3">
      <Checkbox />
      <Checkbox checked />
      <Checkbox indeterminate />
      <Checkbox disabled />
      <Checkbox checked disabled />
      <Checkbox indeterminate disabled />
    </div>
  ),
};
