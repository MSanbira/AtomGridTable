import React, { ComponentProps } from "react";
import { getClasses } from "../../helpers/classNameHelper";

// TODO: add indeterminate state
export const Checkbox = (props: CheckboxProps) => {
  const { className, ...rest } = props;

  return <input type="checkbox" {...rest} className={getClasses({ "AGT-checkbox": true }, className)} />;
};

interface CheckboxProps extends ComponentProps<"input"> {
  indeterminate?: boolean;
}
