import React, { CSSProperties, ReactElement, useMemo } from "react";
import { Typography } from "./components/Typography/Typography";
import { getClasses } from "./helpers/classNameHelper";
import { tableHelper } from "./helpers/tableHelper";
import { Skeleton } from "./components/Skeleton/Skeleton";
import { useResizeColumns } from "./hooks/useResizeColumns";
import { TableProps, TableRow } from "./types/table.types";
import { useSelectRows } from "./hooks/useSelectRows";
import "./styles/index.css";
import { LoaderRowsCount } from "./constants/tableDefaults";
import { TableHeader } from "./components/TableParts/TableHeader";
import { TableRow as TableRowComponent } from "./components/TableParts/TableRow";
import { TableFooter } from "./components/TableParts/TableFooter";

export default function AtomGridTable(props: TableProps) {
  const {
    colOptions,
    rows,
    className,
    isLoading,
    paginationStore,
    sortingStore,
    loaderRowsCount = LoaderRowsCount,
    selectedRows = [],
    setSelected = () => {},
    isHasSelect,
    tableType = "basic",
    selectionArea,
    isFirstRowHeader,
  } = props;

  const { wrapperRef, isResizing, handleMouseDownResize } = useResizeColumns({ colOptions, isHasSelect });
  const { handleSelectRowClick, handleSelectAllClick } = useSelectRows({
    rows,
    selectedRows,
    setSelected,
  });

  const rowsToDisplay = useMemo<TableRow[]>(() => {
    if (!isFirstRowHeader) return rows;

    const temp = [...rows];
    temp.shift();
    return temp;
  }, [rows, isFirstRowHeader]);

  const wrapperClasses = getClasses(
    {
      "AGT-layout-table-wrapper": true,
      "dashboard-table": tableType === "dashboard",
      "dynamic-block-table": tableType === "dynamicBlock",
      "survey-table": tableType === "survey",
      "is-loading": !!isLoading,
      "is-resizing": isResizing,
    },
    className
  );

  const tableContent = useMemo<ReactElement>(() => {
    if (isLoading) {
      return (
        <div className="AGT-layout-table">
          <TableHeader
            rows={rows}
            isFirstRowHeader={isFirstRowHeader}
            sortingStore={sortingStore}
            isResizing={isResizing}
            isHasSelect={isHasSelect}
            colOptions={colOptions}
            handleMouseDownResize={handleMouseDownResize}
            handleSelectAllClick={handleSelectAllClick}
            selectedRows={selectedRows}
            isLoading={isLoading}
          />
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
      <div className="AGT-layout-table">
        <TableHeader
          rows={rows}
          isFirstRowHeader={isFirstRowHeader}
          sortingStore={sortingStore}
          isResizing={isResizing}
          isHasSelect={isHasSelect}
          colOptions={colOptions}
          handleMouseDownResize={handleMouseDownResize}
          handleSelectAllClick={handleSelectAllClick}
          selectedRows={selectedRows}
          isLoading={isLoading}
        />

        {rows.length === 0 && (
          <Typography
            className="no-rows-text"
            style={{ "--wrapper-width": `${wrapperRef.current?.clientWidth}px` } as CSSProperties}
          >
            No rows
          </Typography>
        )}

        {rowsToDisplay.map((row, i) => (
          <TableRowComponent
            key={i}
            index={i}
            row={row}
            isHasSelect={isHasSelect}
            colOptions={colOptions}
            selectedRows={selectedRows}
            handleSelectRowClick={handleSelectRowClick}
            handleMouseDownResize={handleMouseDownResize}
          />
        ))}

        {selectionArea && (
          <div className="module-table-selection-area" style={{ "--selection-area": selectionArea } as CSSProperties} />
        )}
      </div>
    );
  }, [
    isLoading,
    rows,
    isFirstRowHeader,
    sortingStore,
    isResizing,
    isHasSelect,
    colOptions,
    handleMouseDownResize,
    handleSelectAllClick,
    selectedRows,
    wrapperRef,
    rowsToDisplay,
    selectionArea,
    loaderRowsCount,
    handleSelectRowClick,
  ]);

  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      {tableContent}
      <TableFooter isHasSelect={isHasSelect} selectedRows={selectedRows} paginationStore={paginationStore} />
    </div>
  );
}
