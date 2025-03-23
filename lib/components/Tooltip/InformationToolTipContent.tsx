import React from "react";
import { Tooltip } from "./Tooltip";

export const InformationToolTipContent = (props: InformationToolTipContentProps) => {
  const { tooltipTitle } = props;

  return (
    <Tooltip title={tooltipTitle}>
      <span>ℹ️</span>
    </Tooltip>
  );
};

interface InformationToolTipContentProps {
  tooltipTitle: string;
}
