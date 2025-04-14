import React, { useContext } from "react";
import { Tooltip } from "./Tooltip";
import { InfoIcon } from "../../icons/InfoIcon";
import { AtomGridTableContext } from "../../context/AtomGridTableContext";
import { ComponentOverride } from "../ComponentOverride/ComponentOverride";

export const InformationToolTipContent = (props: InformationToolTipContentProps) => {
  const { tooltipTitle } = props;
  const { customComponents } = useContext(AtomGridTableContext);

  return (
    <ComponentOverride defaultComponent={Tooltip} overrideComponent={customComponents?.tooltip} title={tooltipTitle}>
      <div className="AGT-info-tooltip">
        <InfoIcon />
      </div>
    </ComponentOverride>
  );
};

interface InformationToolTipContentProps {
  tooltipTitle: string;
}
