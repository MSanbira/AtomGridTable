import React from "react";
import { getClasses } from "../../helpers/classNameHelper";
import { IconButtonType } from "../../types/general.types";

export const IconButton = (props: IconButtonProps) => {
  const { icon, className, ...rest } = props;

  return (
    <button {...rest} className={getClasses({ "AGT-icon-button": true }, className)}>
      {icon}
    </button>
  );
};

export interface IconButtonProps {
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  iconType?: IconButtonType;
}
