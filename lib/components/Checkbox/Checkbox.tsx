import React, { ComponentProps, useMemo } from "react";
import { getClasses } from "../../helpers/classNameHelper";
import { CheckboxIconIndeterminate, CheckboxIconUnchecked, CheckboxIconChecked } from "./CheckboxIcons";

// TODO: add indeterminate state and make it work with click
export const Checkbox = (props: CheckboxProps) => {
  const { className, checked, indeterminate, ...rest } = props;

  const buttonContent = useMemo(() => {
    if (indeterminate) return <CheckboxIconIndeterminate />;

    if (checked) return <CheckboxIconChecked />;

    return <CheckboxIconUnchecked />;
  }, [indeterminate, checked]);

  return (
    <button
      {...rest}
      className={getClasses({ "AGT-checkbox": true, "is-selected": !!checked || !!indeterminate }, className)}
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked ? "true" : "false"}
    >
      {buttonContent}
    </button>
  );
};

interface CheckboxProps extends ComponentProps<"button"> {
  checked?: boolean;
  indeterminate?: boolean;
}
