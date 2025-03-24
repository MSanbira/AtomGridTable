import { ReactNode } from "react";
import { PaginationStore } from "../hooks/usePagination";
import { SortingStore } from "../hooks/useSorting";

export interface TableProps {
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
