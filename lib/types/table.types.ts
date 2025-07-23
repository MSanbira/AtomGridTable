import { ReactNode } from "react";
import { SortingDirection, SortingOptions } from "../hooks/useSorting";
import { PaginationOptions } from "../hooks/usePagination";

export interface TableProps<CustomFilterDependencies, CustomPaginationApiParams, CustomSortingApiParams>
  extends TableHandlers<CustomFilterDependencies, CustomPaginationApiParams, CustomSortingApiParams> {
  colOptions: ColOption[];
  rows: TableRow[];
  className?: string;
  isLoading?: boolean;
  isPagination?: boolean;
  isVirtualization?: boolean;
  isHasSelect?: boolean;
  selectedRows?: string[];
  setSelected?: (selected: string[]) => void;
  paginationOptions?: PaginationOptions<CustomPaginationApiParams>;
  sortingOptions?: Partial<SortingOptions<CustomSortingApiParams>>;
  virtualizationOptions?: VirtualizationOptions;
  tableStyleOptions?: TableStyleOptions;
  selectionArea?: string;
  tableTheme?: string;
  filterDependencies?: CustomFilterDependencies;
}

interface TableHandlers<CustomFilterDependencies, CustomPaginationApiParams, CustomSortingApiParams> {
  onPageOptionChange?: (pageOptions: PaginationChangeOptions<CustomPaginationApiParams>) => void;
  onSortOptionChange?: (sortOptions: SortingChangeOptions<CustomSortingApiParams>) => void;
  onChange?: (generalOptions: {
    pageOptions: PaginationChangeOptions<CustomPaginationApiParams>;
    sortOptions: SortingChangeOptions<CustomSortingApiParams>;
    filterDependencies?: CustomFilterDependencies;
  }) => void;
}

export type PaginationChangeOptions<CustomPaginationApiParams> = {
  apiParams: CustomPaginationApiParams;
  page: number;
  pageSize: number;
};

export type SortingChangeOptions<CustomSortingApiParams> = {
  apiParams: CustomSortingApiParams;
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
  isFullWidth?: boolean;
}

export interface RowSlice {
  start: number;
  end: number;
}
