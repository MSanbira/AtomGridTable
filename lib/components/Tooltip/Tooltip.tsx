import React, { ReactElement } from "react";

export const Tooltip: React.FC<TooltipProps> = (props: TooltipProps) => {
  const { content, children } = props;

  return React.cloneElement(children, {
    title: content?.toString(),
  } as React.HTMLAttributes<HTMLElement>);
};

interface TooltipProps {
  content: React.ReactNode;
  children: ReactElement;
}
