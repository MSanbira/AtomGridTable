import React, { useMemo } from "react";
import { getClasses } from "../../helpers/classNameHelper";
import { CheckboxIconIndeterminate, CheckboxIconUnchecked, CheckboxIconChecked } from "./CheckboxIcons";

export const Checkbox = (props: CheckboxProps) => {
  const { className, checked, indeterminate, onClick, disabled } = props;

  const buttonContent = useMemo(() => {
    if (indeterminate) return <CheckboxIconIndeterminate />;

    if (checked) return <CheckboxIconChecked />;

    return <CheckboxIconUnchecked />;
  }, [indeterminate, checked]);

  return (
    <button
      className={getClasses({ "AGT-checkbox": true, "is-selected": !!checked || !!indeterminate }, className)}
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked ? "true" : "false"}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );
};

export interface CheckboxProps {
  checked?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}
