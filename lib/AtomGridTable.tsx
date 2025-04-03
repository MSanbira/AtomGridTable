import React, { CSSProperties, ReactElement, useEffect, useMemo } from "react";
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
import { usePagination } from "./hooks/usePagination";
import { useSorting } from "./hooks/useSorting";

export default function AtomGridTable(props: TableProps) {
  const {
    colOptions,
    rows,
    className,
    isLoading,
    loaderRowsCount = LoaderRowsCount,
    selectedRows = [],
    setSelected = () => {},
    isHasSelect,
    tableTheme = "basic",
    selectionArea,
    paginationOptions,
    onPageOptionChange,
    onSortOptionChange,
    onChange,
    sortingOptions,
    tableStyleOptions,
  } = props;

  const { isFirstRowHeader, isZebra, isNoXCellBorders, isSmallCellPadding } = tableStyleOptions ?? {};

  const paginationStore = usePagination(paginationOptions ?? {});
  const { apiParams: paginationApiParams, page, pageSize, setPage } = paginationStore;
  const sortingStore = useSorting({ ...sortingOptions, resetPage: sortingOptions?.resetPage ?? (() => setPage(0)) });
  const { apiParams: sortingApiParams, ordering, direction } = sortingStore;

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

  useEffect(() => {
    onPageOptionChange?.({ apiParams: paginationApiParams, page, pageSize });
  }, [paginationApiParams, page, pageSize, onPageOptionChange]);

  useEffect(() => {
    onSortOptionChange?.({ apiParams: sortingApiParams, ordering, direction });
  }, [sortingApiParams, ordering, direction, onSortOptionChange]);

  useEffect(() => {
    onChange?.({
      pageOptions: { apiParams: paginationApiParams, page, pageSize },
      sortOptions: { apiParams: sortingApiParams, ordering, direction },
    });
  }, [paginationApiParams, page, pageSize, ordering, direction, sortingApiParams, onChange]);

  const wrapperClasses = getClasses(
    {
      "AGT-table-wrapper": true,
      "is-loading": !!isLoading,
      "is-resizing": isResizing,
      "is-zebra": !!isZebra,
      "is-no-x-cell-borders": !!isNoXCellBorders,
      "is-small-cell-padding": !!isSmallCellPadding,
      [`AGT-table-theme-${tableTheme}`]: !!tableTheme,
    },
    className
  );

  const tableContent = useMemo<ReactElement>(() => {
    if (isLoading) {
      return (
        <div className="AGT-table">
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
            <TableRowComponent
              key={i}
              index={i}
              row={{
                cells: tableHelper.numLengthArr(colOptions.length + (isHasSelect ? 1 : 0)).map((j) => ({
                  content: <Skeleton key={j} />,
                })),
              }}
              colOptions={colOptions}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="AGT-table">
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
          <div className="AGT-table-selection-area" style={{ "--selection-area": selectionArea } as CSSProperties} />
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
      <TableFooter
        isHasSelect={isHasSelect}
        selectedRows={selectedRows}
        paginationStore={paginationStore}
        isPagination={!!paginationOptions}
      />
    </div>
  );
}
