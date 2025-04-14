import React, { ReactElement } from "react";

export const Tooltip: React.FC<TooltipProps> = (props: TooltipProps) => {
  const { title, children } = props;

  return React.cloneElement(children, {
    title: String(title),
  } as React.HTMLAttributes<HTMLElement>);
};

export interface TooltipProps {
  title: string | number;
  children: ReactElement;
}
