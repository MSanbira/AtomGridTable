import { ReactNode } from "react";
import { SortingApiParams, SortingDirection, SortingOptions } from "../hooks/useSorting";
import { PaginationApiParams, PaginationOptions } from "../hooks/usePagination";

export interface TableProps extends TableHandlers {
  colOptions: ColOption[];
  rows: TableRow[];
  className?: string;
  isLoading?: boolean;
  selectedRows?: (number | string)[];
  isHasSelect?: boolean;
  tableTheme?: string;
  selectionArea?: string;
  setSelected?: (selected: (number | string)[]) => void;
  paginationOptions?: PaginationOptions;
  sortingOptions?: SortingOptions;
  tableStyleOptions?: TableStyleOptions;
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
  isActive?: boolean;
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

export interface TableStyleOptions {
  isFirstRowHeader?: boolean;
  isZebra?: boolean;
  isNoXCellBorders?: boolean;
  isSmallCellPadding?: boolean;
  isStickyHeader?: boolean;
  loaderRowsCount?: number;
}
