import React from "react";
import { Tooltip } from "./Tooltip";
import { InfoIcon } from "../../icons/InfoIcon";

export const InformationToolTipContent = (props: InformationToolTipContentProps) => {
  const { tooltipTitle } = props;

  return (
    <Tooltip title={tooltipTitle}>
      <div className="AGT-info-tooltip">
        <InfoIcon />
      </div>
    </Tooltip>
  );
};

interface InformationToolTipContentProps {
  tooltipTitle: string;
}
