import React, {
  Context,
  CSSProperties,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Typography } from "./components/Typography/Typography";
import { getClasses } from "./helpers/classNameHelper";
import { tableHelper } from "./helpers/tableHelper";
import { useResizeColumns } from "./hooks/useResizeColumns";
import { TableProps, TableRow } from "./types/table.types";
import { useSelectRows } from "./hooks/useSelectRows";
import { TableHeader } from "./components/TableParts/TableHeader";
import { TableRow as TableRowComponent } from "./components/TableParts/TableRow";
import { TableFooter } from "./components/TableParts/TableFooter";
import { PaginationApiParams, usePagination } from "./hooks/usePagination";
import { SortingApiParams, useSorting } from "./hooks/useSorting";
import { useVirtualization } from "./hooks/useVirtualization";
import { AtomGridTableContext } from "./context/AtomGridTableContext";
import { ComponentOverride } from "./components/ComponentOverride/ComponentOverride";
import { DefaultResizeOptions } from "./constants/tableDefaults";
import "./styles/index.css";
import { AtomGridTableContextProps } from "./types/tableContext.types";

export default function AtomGridTable<
  CustomFilterDependencies = unknown,
  CustomPaginationApiParams = PaginationApiParams,
  CustomSortingApiParams = SortingApiParams,
>(props: TableProps<CustomFilterDependencies, CustomPaginationApiParams, CustomSortingApiParams>) {
  const { defaultTableOptions, customComponents } = useContext(
    AtomGridTableContext as unknown as Context<
      AtomGridTableContextProps<CustomFilterDependencies, CustomPaginationApiParams, CustomSortingApiParams>
    >
  );

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
    isPagination,
    isVirtualization,
    virtualizationOptions,
    filterDependencies,
  } = props;

  const {
    isFirstRowHeader,
    isZebra,
    isNoXCellBorders,
    isSmallCellPadding,
    isStickyHeader: defaultIsStickyHeader,
    loaderRowsCount,
    colorScheme,
    isFullWidth,
  } = {
    ...defaultTableOptions?.tableStyleOptions,
    ...tableStyleOptions,
  };

  const {
    isStickyHeader: isVirtualizationStickyHeader = true,
    rowHeight = isSmallCellPadding ? 32 : 48,
    tableHeight: tableHeightProp = "80dvh",
  } = {
    ...defaultTableOptions?.virtualizationOptions,
    ...virtualizationOptions,
  };

  const isStickyHeader = isVirtualization ? isVirtualizationStickyHeader : defaultIsStickyHeader;
  const tableHeight = isVirtualization
    ? typeof tableHeightProp === "number"
      ? `${tableHeightProp}px`
      : tableHeightProp
    : undefined;

  const colOptions = useMemo(() => {
    return colOptionsProp.map((col) => ({
      ...col,
      resizeOptions: col.resizeOptions ?? (col.isResizable ? DefaultResizeOptions : undefined),
    }));
  }, [colOptionsProp]);

  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const [shouldChange, setShouldChange] = useState<boolean>(true);

  const paginationStore = usePagination<CustomPaginationApiParams>({
    ...paginationOptions,
    setShouldChange,
  });
  const { apiParams: paginationApiParams, page, pageSize, setPage } = paginationStore;

  const handleResetPage = useCallback(() => {
    const customFunction = sortingOptions?.resetPage;
    if (customFunction) {
      customFunction();
      setShouldChange(true);
    } else {
      setPage(0);
    }
  }, [setPage, setShouldChange, sortingOptions?.resetPage]);

  const sortingStore = useSorting<CustomSortingApiParams>({
    ...sortingOptions,
    resetPage: handleResetPage,
  });
  const { apiParams: sortingApiParams, ordering, direction } = sortingStore;

  const { wrapperRef, isResizing, handleMouseDownResize } = useResizeColumns({ colOptions, isHasSelect });
  const { handleSelectRowClick, handleSelectAllClick } = useSelectRows({
    rows,
    selectedRows,
    setSelected,
  });

  const { rowToShowSlice } = useVirtualization({
    isVirtualization: !!isVirtualization,
    rowHeight,
    tableWrapperRef,
    rowsLength: rows.length,
  });

  const isOneLineAll = useMemo<boolean>(() => !!isVirtualization, [isVirtualization]);

  const rowsToDisplay = useMemo<TableRow[]>(() => {
    const tempRows = [...rows];
    if (isFirstRowHeader) {
      tempRows.shift();
    }

    if (rowToShowSlice) {
      return tempRows.slice(rowToShowSlice.start, rowToShowSlice.end);
    }

    return tempRows;
  }, [rows, isFirstRowHeader, rowToShowSlice]);

  useEffect(() => {
    onPageOptionChange?.({ apiParams: paginationApiParams, page, pageSize });
  }, [paginationApiParams, page, pageSize, onPageOptionChange]);

  useEffect(() => {
    onSortOptionChange?.({ apiParams: sortingApiParams, ordering, direction });
  }, [sortingApiParams, ordering, direction, onSortOptionChange]);

  useEffect(() => {
    if (filterDependencies !== undefined) {
      setPage(0);
    }
  }, [filterDependencies, setPage]);

  useEffect(() => {
    if (!shouldChange) {
      return;
    }

    onChange?.({
      pageOptions: { apiParams: paginationApiParams, page, pageSize },
      sortOptions: { apiParams: sortingApiParams, ordering, direction },
      filterDependencies,
    });

    setShouldChange(false);
  }, [
    paginationApiParams,
    page,
    pageSize,
    ordering,
    direction,
    sortingApiParams,
    onChange,
    shouldChange,
    filterDependencies,
  ]);

  const wrapperClasses = getClasses(
    {
      "AGT-table-wrapper": true,
      "is-loading": !!isLoading,
      "is-resizing": isResizing,
      "is-zebra": !!isZebra,
      "is-no-x-cell-borders": !!isNoXCellBorders,
      "is-small-cell-padding": !!isSmallCellPadding,
      "is-full-width": !!isFullWidth,
      [`AGT-color-scheme-${colorScheme}`]: !!colorScheme,
      [`AGT-table-theme-${tableTheme}`]: !!tableTheme,
    },
    className
  );

  const tableContent = useMemo<ReactElement>(() => {
    if (isLoading) {
      return (
        <div className="AGT-table" ref={tableWrapperRef}>
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
            <TableRowComponent key={i} index={i} colOptions={colOptions} isSkeleton isHasSelect={isHasSelect} />
          ))}
        </div>
      );
    }

    return (
      <div className="AGT-table" ref={tableWrapperRef}>
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
            isOneLineAll={isOneLineAll}
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
    isOneLineAll,
  ]);

  return (
    <div className={wrapperClasses} ref={wrapperRef} style={{ "--table-height": tableHeight } as CSSProperties}>
      {tableContent}
      <TableFooter
        isHasSelect={isHasSelect}
        selectedRows={selectedRows}
        paginationStore={paginationStore}
        isPagination={isPagination}
        isLoading={isLoading}
      />
    </div>
  );
}
