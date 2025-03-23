import React, { ReactElement } from "react";

export const Tooltip: React.FC<TooltipProps> = (props: TooltipProps) => {
  const { title, children } = props;

  return React.cloneElement(children, {
    title: title?.toString(),
  } as React.HTMLAttributes<HTMLElement>);
};

interface TooltipProps {
  title: React.ReactNode;
  children: ReactElement;
}
