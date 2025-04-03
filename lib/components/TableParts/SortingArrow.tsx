import React, { useMemo } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../icons/ArrowIcons";
import { getClasses } from "../../helpers/classNameHelper";

export const SortingArrow = (props: SortingArrowProps) => {
  const { direction, isOrdered } = props;

  const arrowContent = useMemo(
    () => (direction === "asc" || !direction || !isOrdered ? <ArrowDownIcon /> : <ArrowUpIcon />),
    [direction, isOrdered]
  );

  return (
    <div className={getClasses({ "AGT-sorting-arrow": true, "is-ordered": !!direction && !!isOrdered })}>
      {arrowContent}
    </div>
  );
};

interface SortingArrowProps {
  direction: "asc" | "desc" | null;
  isOrdered?: boolean;
}
