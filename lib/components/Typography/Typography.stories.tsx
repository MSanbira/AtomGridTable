import React, { ComponentProps, Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Typography, TypographyColorOptions, TypographyVariantOptions } from "./Typography";

const SampleText =
  "Run, rabbit, run Dig that hole, forget the sun And when at last the work is done Don't sit down, it's time to dig another one";

const meta: Meta<ComponentProps<typeof Typography>> = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: SampleText,
  },
};

const variants: TypographyVariantOptions[] = ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2"];

export const Variants: Story = {
  render: () => (
    <>
      {variants.map((variant) => (
        <Fragment key={variant}>
          <Typography color="secondary" underline>
            {variant}
          </Typography>
          <Typography variant={variant}>{SampleText}</Typography>
        </Fragment>
      ))}
    </>
  ),
};

const colorVariants: TypographyColorOptions[] = [
  "primary",
  "secondary",
  "tertiary",
  "error",
  "warning",
  "active",
  "success",
];

export const Colors: Story = {
  render: () => (
    <>
      {colorVariants.map((color) => (
        <Fragment key={color}>
          <Typography color="secondary" underline>
            {color}
          </Typography>
          <Typography color={color}>{SampleText}</Typography>
        </Fragment>
      ))}
    </>
  ),
};

export const OtherProps: Story = {
  render: () => (
    <>
      <Typography color="secondary" underline>
        underline
      </Typography>
      <Typography variant="h1" underline>
        {SampleText}
      </Typography>
      <Typography color="secondary" underline>
        balanced
      </Typography>
      <Typography variant="h1" balanced>
        {SampleText}
      </Typography>
      <Typography color="secondary" underline>
        bold
      </Typography>
      <Typography variant="h1" bold>
        {SampleText}
      </Typography>
      <Typography color="secondary" underline>
        lowOpacity
      </Typography>
      <Typography variant="h1" lowOpacity>
        {SampleText}
      </Typography>
    </>
  ),
};
