import React, { ComponentProps } from "react";
import { getClasses } from "../../helpers/classNameHelper";

export const Select = (props: SelectProps) => {
  const { className, options, ...rest } = props;

  return (
    <select {...rest} className={getClasses({ "AGT-select": true }, className)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label ?? option.value}
        </option>
      ))}
    </select>
  );
};

interface SelectProps extends ComponentProps<"select"> {
  options: SelectOption[];
}

export type SelectOption = { label?: string; value: string };
