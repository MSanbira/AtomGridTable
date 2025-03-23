import React, {
  CSSProperties,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Typography } from "./components/Typography/Typography";
import { Tooltip } from "./components/Tooltip/Tooltip";
import { Checkbox } from "./components/Checkbox/Checkbox";
import { getClasses } from "./helpers/classNameHelper";
import { SortingDirection, SortingStore } from "./hooks/useSorting";
import { tableHelper } from "./helpers/tableHelper";
import { Skeleton } from "./components/Skeleton/Skeleton";
import { PaginationStore } from "./hooks/usePagination";
import { InformationToolTipContent } from "./components/Tooltip/InformationToolTipContent";
import { TablePagination } from "./components/TableParts/TablePagination/TablePagination";
import "./styles/index.css";

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

  const wrapperRef = useRef<HTMLDivElement>(null);

  const colOptionsWithSelect = useMemo(() => {
    if (!isHasSelect) return colOptions;

    return [
      {
        width: "auto",
      },
      ...colOptions,
    ];
  }, [colOptions, isHasSelect]);

  const [mouseClientX, setMouseClientX] = useState<number>(0);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const setResizeCellOptions = useCallback(
    (
      options: {
        index: number;
        startX: number;
        initialWidth: number;
      } | null
    ) => {
      wrapperRef.current?.setAttribute("data-resize-cell-options", JSON.stringify(options));
    },
    []
  );

  const handleResize = useCallback(() => {
    const resizeCellOptionsStr = wrapperRef.current?.getAttribute("data-resize-cell-options");
    if (!resizeCellOptionsStr) return;

    const resizeCellOptions = JSON.parse(resizeCellOptionsStr);

    const colResizeOptions = colOptions[resizeCellOptions?.index]?.resizeOptions;
    if (!colResizeOptions) return;

    const delta = mouseClientX - resizeCellOptions.startX;
    const colWidths = wrapperRef.current?.getAttribute("data-col-widths")?.split(";") ?? [];
    const colWidth = colWidths[resizeCellOptions.index];
    const colWidthNumber = colWidth.match(/^\d+px$/g)
      ? parseInt(colWidth.replace("px", ""))
      : resizeCellOptions.initialWidth;
    const clampValue = Math.min(
      Math.max(Math.round(colWidthNumber + delta), colResizeOptions.min),
      colResizeOptions.max
    );

    if (clampValue >= colResizeOptions.max || clampValue <= colResizeOptions.min) return;

    colWidths[resizeCellOptions.index] = `${clampValue}px`;
    wrapperRef.current?.setAttribute("data-col-widths", colWidths.join(";"));
    wrapperRef.current?.style.setProperty("--template-cols", colWidths.join(" "));

    setResizeCellOptions({ ...resizeCellOptions, startX: mouseClientX });
  }, [colOptions, mouseClientX, setResizeCellOptions]);

  const handleRemoveResize = useCallback(() => {
    // to not register a click on a sorting header
    setTimeout(() => {
      setResizeCellOptions(null);
      setIsResizing(false);
    }, 50);
  }, [setResizeCellOptions]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseClientX(e.clientX);
  }, []);

  const handleMouseDownResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      setResizeCellOptions({
        index: index,
        startX: e.clientX,
        initialWidth: e.currentTarget?.parentElement?.clientWidth ?? 100,
      });
      setIsResizing(true);
    },
    [setResizeCellOptions]
  );

  const handleSelectRowClick = useCallback(
    (e: React.MouseEvent, identifier: number | string) => {
      e.stopPropagation();
      const temp = [...selectedRows];
      const index = temp.indexOf(identifier);
      if (e.shiftKey && temp.length) {
        const lastSelectedIndex = temp[temp.length - 1];
        const lastIndex = rows.findIndex((row) => row.selectIdentifier === lastSelectedIndex);
        const currentIndex = rows.findIndex((row) => row.selectIdentifier === identifier);
        const [start, end] = lastIndex > currentIndex ? [currentIndex, lastIndex] : [lastIndex, currentIndex];
        const range = rows.map((row, i) => row.selectIdentifier ?? i).slice(start, end + 1);
        const newSelected = temp.includes(identifier) ? temp.filter((id) => !range.includes(id)) : [...temp, ...range];
        setSelected(newSelected);
        return;
      }

      if (index !== -1) {
        temp.splice(index, 1);
      } else {
        temp.push(identifier);
      }

      setSelected(temp);
    },
    [rows, selectedRows, setSelected]
  );

  const handleSelectAllClick = useCallback(() => {
    if (selectedRows.length) {
      setSelected([]);
    } else {
      setSelected(rows.map((row, i) => row.selectIdentifier ?? i));
    }
  }, [rows, selectedRows, setSelected]);

  useEffect(() => {
    if (isResizing) {
      handleResize();
    }
  }, [mouseClientX, handleResize, isResizing]);

  useEffect(() => {
    document.addEventListener("mouseup", handleRemoveResize);
    return () => document.removeEventListener("mouseup", handleRemoveResize);
  }, [handleRemoveResize]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

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
    colOptions,
    handleSelectRowClick,
    isHasSelect,
    isLoading,
    loaderRowsCount,
    paginationStore,
    rows,
    selectedRows,
    tableHeaders,
    selectionArea,
    getTableRowCell,
    rowsToDisplay,
  ]);

  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      {tableContent}
    </div>
  );
}

interface TableProps {
  colOptions: ColOption[];
  rows: TableRow[];
  className?: string;
  isLoading?: boolean;
  paginationStore?: PaginationStore;
  sortingStore?: SortingStore;
  loaderRowsCount?: number;
  selectedRows?: (number | string)[];
  isHasSelect?: boolean;
  setSelected?: (selected: (number | string)[]) => void;
  tableType?: "basic" | "dashboard" | "dynamicBlock" | "survey";
  selectionArea?: string;
  isFirstRowHeader?: boolean;
}

export interface ColOption {
  label?: string;
  tooltip?: string;
  // will be use as a key for sorting
  name?: string;
  width?: string;
  resizeOptions?: { min: number; max: number };
  isHeadersColumn?: boolean;
}

export interface TableRow extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  cells: (TableCell | undefined)[];
  isSelected?: boolean;
  selectIdentifier?: number | string;
  isHeader?: boolean;
}

export interface TableCell extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode;
  span?: number;
  isOneLine?: boolean;
  isNumber?: boolean;
  isHeader?: boolean;
  isNoPadding?: boolean;
  isDisabled?: boolean;
  isCentered?: boolean;
}
