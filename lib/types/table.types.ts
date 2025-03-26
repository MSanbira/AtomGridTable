import { ReactNode } from "react";
import { SortingApiParams, SortingDirection, SortingOptions } from "../hooks/useSorting";
import { PaginationApiParams, PaginationOptions } from "../hooks/usePagination";

export interface TableProps extends TableHandlers {
  colOptions: ColOption[];
  rows: TableRow[];
  className?: string;
  isLoading?: boolean;
  loaderRowsCount?: number;
  selectedRows?: (number | string)[];
  isHasSelect?: boolean;
  tableType?: "basic" | "dashboard" | "dynamicBlock" | "survey";
  selectionArea?: string;
  isFirstRowHeader?: boolean;
  setSelected?: (selected: (number | string)[]) => void;
  paginationOptions?: PaginationOptions;
  sortingOptions?: SortingOptions;
}

interface TableHandlers {
  onPageOptionChange?: (apiParams: PaginationApiParams | unknown, page: number, pageSize: number) => void;
  onSortOptionChange?: (
    apiParams: SortingApiParams | unknown,
    ordering: string,
    direction: SortingDirection | null
  ) => void;
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
