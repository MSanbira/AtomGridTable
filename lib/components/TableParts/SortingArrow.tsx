import React, { useContext, useMemo } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../icons/ArrowIcons";
import { getClasses } from "../../helpers/classNameHelper";
import { AtomGridTableContext } from "../../context/AtomGridTableContext";
import { ComponentOverride } from "../ComponentOverride/ComponentOverride";

export const SortingArrow = (props: SortingArrowProps) => {
  const { direction, isOrdered } = props;
  const { customComponents } = useContext(AtomGridTableContext);

  const arrowContent = useMemo(
    () =>
      direction === "asc" || !direction || !isOrdered ? (
        <ComponentOverride
          defaultComponent={ArrowDownIcon}
          overrideComponent={customComponents?.sortingArrowDownIcon}
        />
      ) : (
        <ComponentOverride defaultComponent={ArrowUpIcon} overrideComponent={customComponents?.sortingArrowUpIcon} />
      ),
    [direction, isOrdered, customComponents]
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
