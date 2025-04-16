import React, { CSSProperties, ReactElement, useContext, useEffect, useMemo } from "react";
import { Typography } from "./components/Typography/Typography";
import { getClasses } from "./helpers/classNameHelper";
import { tableHelper } from "./helpers/tableHelper";
import { Skeleton } from "./components/Skeleton/Skeleton";
import { useResizeColumns } from "./hooks/useResizeColumns";
import { TableProps, TableRow } from "./types/table.types";
import { useSelectRows } from "./hooks/useSelectRows";
import { TableHeader } from "./components/TableParts/TableHeader";
import { TableRow as TableRowComponent } from "./components/TableParts/TableRow";
import { TableFooter } from "./components/TableParts/TableFooter";
import { usePagination } from "./hooks/usePagination";
import { useSorting } from "./hooks/useSorting";
import { AtomGridTableContext } from "./context/AtomGridTableContext";
import { ComponentOverride } from "./components/ComponentOverride/ComponentOverride";
import { DefaultResizeOptions } from "./constants/tableDefaults";
import "./styles/index.css";

export default function AtomGridTable(props: TableProps) {
  const { defaultTableOptions, customComponents } = useContext(AtomGridTableContext);

  const {
    colOptions: colOptionsProp,
    rows,
    className,
    isLoading,
    selectedRows = defaultTableOptions?.selectedRows ?? [],
    setSelected = defaultTableOptions?.setSelected ?? (() => {}),
    isHasSelect = defaultTableOptions?.isHasSelect,
    tableTheme = defaultTableOptions?.tableTheme ?? "basic",
    selectionArea = defaultTableOptions?.selectionArea,
    paginationOptions = defaultTableOptions?.paginationOptions,
    onPageOptionChange = defaultTableOptions?.onPageOptionChange,
    onSortOptionChange = defaultTableOptions?.onSortOptionChange,
    onChange = defaultTableOptions?.onChange,
    sortingOptions = defaultTableOptions?.sortingOptions,
    tableStyleOptions,
  } = props;

  const {
    isFirstRowHeader,
    isZebra,
    isNoXCellBorders,
    isSmallCellPadding,
    isStickyHeader,
    loaderRowsCount,
    colorScheme,
  } = {
    ...defaultTableOptions?.tableStyleOptions,
    ...tableStyleOptions,
  };

  const colOptions = useMemo(() => {
    return colOptionsProp.map((col) => ({
      ...col,
      resizeOptions: col.resizeOptions ?? (col.isResizable ? DefaultResizeOptions : undefined),
    }));
  }, [colOptionsProp]);

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
      [`AGT-color-scheme-${colorScheme}`]: !!colorScheme,
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
            isStickyHeader={isStickyHeader}
          />
          {tableHelper.numLengthArr(loaderRowsCount ?? pageSize).map((i) => (
            <TableRowComponent
              key={i}
              index={i}
              row={{
                cells: tableHelper.numLengthArr(colOptions.length + (isHasSelect ? 1 : 0)).map((j) => ({
                  content: (
                    <ComponentOverride
                      key={j}
                      defaultComponent={Skeleton}
                      overrideComponent={customComponents?.skeleton}
                    />
                  ),
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
          isStickyHeader={isStickyHeader}
        />

        {rows.length === 0 && (
          <ComponentOverride
            defaultComponent={Typography}
            overrideComponent={customComponents?.typography}
            className="no-rows-text"
            style={{ "--wrapper-width": `${wrapperRef.current?.clientWidth}px` } as CSSProperties}
          >
            No rows
          </ComponentOverride>
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
    isStickyHeader,
    customComponents,
    wrapperRef,
    rowsToDisplay,
    selectionArea,
    loaderRowsCount,
    pageSize,
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
