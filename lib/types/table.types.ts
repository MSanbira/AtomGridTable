import { ReactNode } from "react";
import { SortingApiParams, SortingDirection, SortingOptions } from "../hooks/useSorting";
import { PaginationApiParams, PaginationOptions } from "../hooks/usePagination";

export interface TableProps extends TableHandlers {
  colOptions: ColOption[];
  rows: TableRow[];
  className?: string;
  isLoading?: boolean;
  isPagination?: boolean;
  isVirtualization?: boolean;
  isHasSelect?: boolean;
  selectedRows?: string[];
  setSelected?: (selected: string[]) => void;
  paginationOptions?: PaginationOptions;
  sortingOptions?: Partial<SortingOptions>;
  virtualizationOptions?: VirtualizationOptions;
  tableStyleOptions?: TableStyleOptions;
  selectionArea?: string;
  tableTheme?: string;
}

interface TableHandlers {
  onPageOptionChange?: (pageOptions: PaginationChangeOptions) => void;
  onSortOptionChange?: (sortOptions: SortingChangeOptions) => void;
  onChange?: (generalOptions: { pageOptions: PaginationChangeOptions; sortOptions: SortingChangeOptions }) => void;
}

export type PaginationChangeOptions = {
  apiParams: PaginationApiParams | unknown;
  page: number;
  pageSize: number;
};

export type SortingChangeOptions = {
  apiParams: SortingApiParams | unknown;
  ordering: string;
  direction: SortingDirection | null;
};

export interface VirtualizationOptions {
  rowHeight?: number;
  isStickyHeader?: boolean;
  tableHeight?: string | number;
}

export interface ColOption {
  label?: string;
  tooltip?: string;
  // will be use as a key for sorting
  name?: string;
  width?: string;
  resizeOptions?: { min: number; max: number };
  isResizable?: boolean;
  isHeadersColumn?: boolean;
}

export interface TableRow extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  cells: (TableCell | undefined)[];
  isActive?: boolean;
  selectIdentifier?: string;
  isHeader?: boolean;
  isSticky?: boolean;
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

export interface TableStyleOptions {
  isFirstRowHeader?: boolean;
  isZebra?: boolean;
  isNoXCellBorders?: boolean;
  isSmallCellPadding?: boolean;
  isStickyHeader?: boolean;
  loaderRowsCount?: number;
  colorScheme?: "light" | "dark";
}

export interface RowSlice {
  start: number;
  end: number;
}
