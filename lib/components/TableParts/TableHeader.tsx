import React, { ReactNode, useMemo } from "react";
import { Typography } from "../Typography/Typography";
import { Checkbox } from "../Checkbox/Checkbox";
import { getClasses } from "../../helpers/classNameHelper";
import { SortingDirection } from "../../hooks/useSorting";
import { InformationToolTipContent } from "../Tooltip/InformationToolTipContent";
import { TableCell } from "./TableCell";
import { TableRow } from "../../types/table.types";
import { SortingStore } from "../../hooks/useSorting";
import { ColOption } from "../../types/table.types";
import { tableHelper } from "../../helpers/tableHelper";

export const TableHeader = ({
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
}: TableHeaderProps) => {
  const colOptionsWithSelect = useMemo(() => {
    return tableHelper.getColOptionsWithSelect(colOptions, !!isHasSelect);
  }, [colOptions, isHasSelect]);

  return (
    <div
      className={getClasses({
        "AGT-module-table-row": true,
        "is-header": !!isFirstRowHeader && !!rows[0]?.isHeader,
      })}
    >
      {colOptionsWithSelect.map((col, i) => {
        const isSorting = !!sortingStore && !!col.name;
        const arrowDir = sortingStore?.direction === SortingDirection.ASC ? "down" : "up";
        const handleSorting = isSorting && !isResizing ? () => sortingStore!.handleChangeSort(col.name!) : undefined;
        const classes = getClasses({
          "AGT-module-table-header": true,
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
            <Checkbox
              onClick={handleSelectAllClick}
              checked={!!rows.length && selectedRows.length === rows.length}
              indeterminate={!!selectedRows.length && selectedRows.length < rows.length}
              disabled={isLoading}
            />
          );
        } else {
          headerContent = (
            <>
              <Typography className="one-line-text" color="secondary">
                {col.label ?? ""}
              </Typography>
              {col.tooltip && <InformationToolTipContent tooltipTitle={col.tooltip} />}
              {/* TODO: change to on hover when null */}
              {isSorting && (arrowDir === "down" ? "⬇️" : "⬆️")}
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
}
