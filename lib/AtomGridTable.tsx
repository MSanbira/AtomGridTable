import React, { CSSProperties, ReactElement, ReactNode, useCallback, useEffect, useMemo } from "react";
import { Typography } from "./components/Typography/Typography";
import { Tooltip } from "./components/Tooltip/Tooltip";
import { Checkbox } from "./components/Checkbox/Checkbox";
import { getClasses } from "./helpers/classNameHelper";
import { SortingDirection } from "./hooks/useSorting";
import { tableHelper } from "./helpers/tableHelper";
import { Skeleton } from "./components/Skeleton/Skeleton";
import { InformationToolTipContent } from "./components/Tooltip/InformationToolTipContent";
import { TablePagination } from "./components/TableParts/TablePagination/TablePagination";
import "./styles/index.css";
import { useResizeColumns } from "./hooks/useResizeColumns";
import { TableProps, TableCell, TableRow } from "./types/table.types";
import { useSelectRows } from "./hooks/useSelectRows";

export default function AtomGridTable(props: TableProps) {
  const {
    colOptions,
    rows,
    className,
    isLoading,
    paginationStore,
    sortingStore,
    loaderRowsCount = 10,
    selectedRows = [],
    setSelected = () => {},
    isHasSelect,
    tableType = "basic",
    selectionArea,
    isFirstRowHeader,
  } = props;

  const { wrapperRef, isResizing, handleMouseDownResize } = useResizeColumns({
    colOptions,
  });

  const { handleSelectRowClick, handleSelectAllClick } = useSelectRows({
    rows,
    selectedRows,
    setSelected,
  });

  const colOptionsWithSelect = useMemo(() => {
    if (!isHasSelect) return colOptions;

    return [
      {
        width: "auto",
      },
      ...colOptions,
    ];
  }, [colOptions, isHasSelect]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const colWidths = colOptionsWithSelect.map((col) => col.width || "minmax(150px, 1fr)");
    wrapperRef.current.setAttribute("data-col-widths", colWidths.join(";"));
    wrapperRef.current.style.setProperty("--template-cols", colWidths.join(" "));
  }, [colOptionsWithSelect, wrapperRef]);

  const getTableRowCell = useCallback(
    (index: number, cell?: TableCell, withResize?: boolean) => {
      if (!cell) return null;

      const {
        className,
        onClick,
        content,
        isOneLine,
        isNumber,
        isHeader,
        isDisabled,
        isNoPadding,
        isCentered,
        span,
        style,
        ...rest
      } = cell;
      const cellContent = ["string", "number"].includes(typeof content) ? (
        <Typography className={getClasses({ "one-line-text": !!isOneLine })}>{content}</Typography>
      ) : (
        content
      );

      return (
        <div
          key={index}
          className={getClasses({
            "AGT-module-table-cell": true,
            "has-action": !!onClick,
            "is-number": !!isNumber,
            "is-header": !!isHeader || !!colOptions[index]?.isHeadersColumn,
            "is-no-padding": !!isNoPadding,
            "is-disabled": !!isDisabled,
            "is-centered": !!isCentered,
            [className || ""]: !!className,
          })}
          onClick={onClick}
          style={
            {
              "--col-span": span,
              ...style,
            } as CSSProperties
          }
          {...rest}
        >
          {cellContent && isOneLine ? (
            <Tooltip title={cellContent}>{cellContent as ReactElement}</Tooltip>
          ) : (
            cellContent
          )}
          {withResize && <div className="resize-bar" onMouseDown={(e) => handleMouseDownResize(e, index)} />}
        </div>
      );
    },
    [handleMouseDownResize, colOptions]
  );

  const tableHeaders = useMemo<ReactNode>(
    () => (
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
            return getTableRowCell(i, rows[0].cells[i], true);
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
    ),
    [
      colOptionsWithSelect,
      sortingStore,
      isResizing,
      isHasSelect,
      handleSelectAllClick,
      selectedRows,
      rows,
      handleMouseDownResize,
      isLoading,
      getTableRowCell,
      isFirstRowHeader,
    ]
  );

  const rowsToDisplay = useMemo<TableRow[]>(() => {
    if (!isFirstRowHeader) return rows;

    const temp = [...rows];
    temp.shift();
    return temp;
  }, [rows, isFirstRowHeader]);

  const wrapperClasses = getClasses({
    "AGT-layout-table-wrapper": true,
    "dashboard-table": tableType === "dashboard",
    "dynamic-block-table": tableType === "dynamicBlock",
    "survey-table": tableType === "survey",
    "is-loading": !!isLoading,
    "is-resizing": isResizing,
    [className || ""]: !!className,
  });

  const tableContent = useMemo<ReactElement>(() => {
    if (isLoading) {
      return (
        <div className="AGT-layout-table">
          {tableHeaders}
          {tableHelper.numLengthArr(loaderRowsCount).map((i) => (
            <div key={i} className="AGT-module-table-row">
              {tableHelper.numLengthArr(colOptions.length + (isHasSelect ? 1 : 0)).map((j) => (
                <Skeleton key={j} />
              ))}
            </div>
          ))}
        </div>
      );
    }

    return (
      <>
        <div className="AGT-layout-table">
          {tableHeaders}

          {rows.length === 0 && (
            <Typography
              className="no-rows-text"
              style={{ "--wrapper-width": `${wrapperRef.current?.clientWidth}px` } as CSSProperties}
            >
              No rows
            </Typography>
          )}

          {rowsToDisplay.map(({ isSelected, onClick, isHeader, className, selectIdentifier, cells, ...rest }, i) => (
            <div
              key={i}
              className={getClasses({
                "AGT-module-table-row": true,
                "is-selected": !!isSelected,
                "has-action": !!onClick,
                "is-header": !!isHeader,
                [className || ""]: !!className,
              })}
              onClick={onClick}
              style={{ ...rest.style, "--grid-row": `${i + 2} / ${i + 3}` } as CSSProperties}
              {...rest}
            >
              {isHasSelect && (
                <Checkbox
                  checked={selectedRows.includes(selectIdentifier ?? i)}
                  onClick={(e) => handleSelectRowClick(e, selectIdentifier ?? i)}
                />
              )}
              {cells.map((cell, index) => getTableRowCell(index, cell))}
            </div>
          ))}

          {selectionArea && (
            <div
              className="module-table-selection-area"
              style={{ "--selection-area": selectionArea } as CSSProperties}
            />
          )}
        </div>

        {(isHasSelect || !!paginationStore) && (
          <div className="_d-flex-ali-center-jc-sb">
            {isHasSelect && (
              <Typography>
                {!!selectedRows.length &&
                  `${selectedRows.length} ${selectedRows.length === 1 ? "row" : "rows"} selected`}
              </Typography>
            )}

            {paginationStore && <TablePagination paginationStore={paginationStore} />}
          </div>
        )}
      </>
    );
  }, [
    isLoading,
    tableHeaders,
    rows.length,
    wrapperRef,
    rowsToDisplay,
    selectionArea,
    isHasSelect,
    paginationStore,
    selectedRows,
    loaderRowsCount,
    colOptions.length,
    handleSelectRowClick,
    getTableRowCell,
  ]);

  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      {tableContent}
    </div>
  );
}
