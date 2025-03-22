import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import React, { ComponentProps, Fragment } from "react";
import { Typography, TypographyColorOptions, TypographyVariantOptions } from "./Typography";

const SampleText =
  "Run, rabbit, run Dig that hole, forget the sun And when at last the work is done Don't sit down, it's time to dig another one";

const meta: Meta<ComponentProps<typeof Typography>> = {
  title: "Example/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: StoryFn<ComponentProps<typeof Typography>> = (args) => <Typography {...args}>{SampleText}</Typography>;

const variants: TypographyVariantOptions[] = ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2"];

const VariantTemplate: StoryFn = () => (
  <>
    {variants.map((variant) => (
      <Fragment key={variant}>
        <Typography color="secondary" underline>
          {variant}
        </Typography>
        <Typography variant={variant} key={variant}>
          {SampleText}
        </Typography>
      </Fragment>
    ))}
  </>
);

const colorVariants: TypographyColorOptions[] = [
  "primary",
  "secondary",
  "tertiary",
  "error",
  "warning",
  "active",
  "success",
];

const ColorTemplate = () => (
  <>
    {colorVariants.map((color) => (
      <Fragment key={color}>
        <Typography color="secondary" underline>
          {color}
        </Typography>
        <Typography color={color} key={color}>
          {SampleText}
        </Typography>
      </Fragment>
    ))}
  </>
);

const OtherPropsTemplate: StoryFn = () => (
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
);

export const Default: Story = Template.bind({});
export const Variants: Story = VariantTemplate.bind({});
export const Colors: Story = ColorTemplate.bind({});
export const OtherProps: Story = OtherPropsTemplate.bind({});
