import { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

export const usePagination = (options: PaginationOptions) => {
  const {
    rowCount = 0,
    pageSizeKey = "AGTGeneralPageSizePref",
    pageSizeOptions = DefaultPaginationSizeOptions,
    getApiParams,
  } = options;

  const [page, setPage] = useState<number>(0);
  const [pageSize = pageSizeOptions[0], setPageSize] = useLocalStorage<number>(pageSizeKey);

  const apiParams = useMemo<PaginationApiParams | unknown>(() => {
    if (!getApiParams) return { limit: pageSize, offset: page * pageSize };

    return getApiParams(page, pageSize);
  }, [page, pageSize, getApiParams]);

  const handleSetPageSize = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize);
      setPage(0);
    },
    [setPageSize]
  );

  return { rowCount, page, setPage, pageSize, setPageSize: handleSetPageSize, apiParams, pageSizeOptions };
};

export const DefaultPaginationSizeOptions = [10, 20, 50, 100];
export type PaginationApiParams = { limit: number; offset: number };
export type PaginationStore = ReturnType<typeof usePagination>;

export interface PaginationOptions {
  rowCount?: number;
  pageSizeKey?: string;
  // TODO: set in context as well
  pageSizeOptions?: number[];
  getApiParams?: (page: number, pageSize: number) => unknown;
}
