import React, { ComponentProps } from "react";
import { getClasses } from "../../helpers/classNameHelper";

export const IconButton = (props: IconButtonProps) => {
  const { icon, className, ...rest } = props;

  return (
    <button {...rest} className={getClasses({ "AGT-icon-button": true }, className)}>
      {icon}
    </button>
  );
};

export interface IconButtonProps extends ComponentProps<"button"> {
  icon: React.ReactNode;
}
