import React, { ReactNode, useContext, useMemo } from "react";
import { Typography } from "../Typography/Typography";
import { Checkbox } from "../Checkbox/Checkbox";
import { getClasses } from "../../helpers/classNameHelper";
import { InformationToolTipContent } from "../Tooltip/InformationToolTipContent";
import { TableCell } from "./TableCell";
import { TableRow } from "../../types/table.types";
import { SortingStore } from "../../hooks/useSorting";
import { ColOption } from "../../types/table.types";
import { tableHelper } from "../../helpers/tableHelper";
import { SortingArrow } from "./SortingArrow";
import { AtomGridTableContext } from "../../context/AtomGridTableContext";
import { ComponentOverride } from "../ComponentOverride/ComponentOverride";

export const TableHeader = (props: TableHeaderProps) => {
  const {
    rows,
    isFirstRowHeader,
    sortingStore,
    isResizing,
    isHasSelect,
    colOptions,
    handleMouseDownResize,
    handleSelectAllClick,
    selectedRows = [],
    isLoading,
    isStickyHeader,
  } = props;

  const { customComponents } = useContext(AtomGridTableContext);
  const colOptionsWithSelect = useMemo(() => {
    return tableHelper.getColOptionsWithSelect(colOptions, !!isHasSelect);
  }, [colOptions, isHasSelect]);

  return (
    <div
      className={getClasses({
        "AGT-table-row": true,
        "is-header": !!isFirstRowHeader && !!rows[0]?.isHeader,
        "is-sticky": !!isStickyHeader,
      })}
    >
      {colOptionsWithSelect.map((col, i) => {
        const isSorting = !!sortingStore && !!col.name;
        const handleSorting = isSorting && !isResizing ? () => sortingStore!.handleChangeSort(col.name!) : undefined;
        const classes = getClasses({
          "AGT-table-header": true,
          "is-sortable": isSorting,
          "is-sorting": sortingStore?.ordering === col.name && !!sortingStore?.direction,
        });

        if (isFirstRowHeader && rows[0]) {
          if (!rows[0].cells[i]) return null;

          return (
            <TableCell
              key={i}
              index={i}
              cell={rows[0].cells[i]}
              colOptions={colOptions}
              handleMouseDownResize={handleMouseDownResize}
              withResize={!!col.resizeOptions}
            />
          );
        }

        let headerContent: ReactNode | null = null;
        if (isHasSelect && i === 0) {
          headerContent = (
            <ComponentOverride
              defaultComponent={Checkbox}
              overrideComponent={customComponents?.checkbox}
              onClick={handleSelectAllClick}
              checked={!!rows.length && selectedRows.length === rows.length}
              indeterminate={!!selectedRows.length && selectedRows.length < rows.length}
              disabled={isLoading}
            />
          );
        } else {
          headerContent = (
            <>
              <ComponentOverride
                defaultComponent={Typography}
                overrideComponent={customComponents?.typography}
                className="AGT-one-line-text"
                color="secondary"
              >
                {col.label ?? ""}
              </ComponentOverride>
              {col.tooltip && <InformationToolTipContent tooltipTitle={col.tooltip} />}
              {isSorting && (
                <SortingArrow direction={sortingStore.direction} isOrdered={sortingStore.ordering === col.name} />
              )}
              {col.resizeOptions && <div className="resize-bar" onMouseDown={(e) => handleMouseDownResize(e, i)} />}
            </>
          );
        }

        return (
          <div key={i} className={classes} onClick={handleSorting}>
            {headerContent}
          </div>
        );
      })}
    </div>
  );
};

interface TableHeaderProps {
  colOptions: ColOption[];
  rows: TableRow[];
  handleMouseDownResize: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  handleSelectAllClick: () => void;
  isFirstRowHeader?: boolean;
  sortingStore?: SortingStore;
  isResizing?: boolean;
  isHasSelect?: boolean;
  selectedRows?: (string | number)[];
  isLoading?: boolean;
  isStickyHeader?: boolean;
}
