import { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";
import { DefaultPaginationSizeOptions } from "../constants/tableDefaults";

export const usePagination = (options: PaginationOptions) => {
  const {
    rowCount = 0,
    pageSizeKey = "AGTGeneralPageSizePref",
    pageSizeOptions = DefaultPaginationSizeOptions,
    getApiParams,
    pageState: { page: overridePage, setPage: overrideSetPage } = {},
  } = options;

  const [page, setPage] = useState<number>(overridePage ?? 0);
  const [pageSize = pageSizeOptions[0], setPageSize] = useLocalStorage<number>(pageSizeKey);

  const pageToUse = useMemo(() => (overridePage !== undefined ? overridePage : page), [overridePage, page]);

  const handleSetPage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      overrideSetPage?.(newPage);
    },
    [overrideSetPage]
  );

  const apiParams = useMemo<PaginationApiParams | unknown>(() => {
    if (!getApiParams) return { limit: pageSize, offset: pageToUse * pageSize };

    return getApiParams(pageToUse, pageSize);
  }, [pageToUse, pageSize, getApiParams]);

  const handleSetPageSize = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize);
      handleSetPage(0);
    },
    [setPageSize, handleSetPage]
  );

  return {
    rowCount,
    page: pageToUse,
    setPage: handleSetPage,
    pageSize,
    setPageSize: handleSetPageSize,
    apiParams,
    pageSizeOptions,
  };
};

export type PaginationApiParams = { limit: number; offset: number };
export type PaginationStore = ReturnType<typeof usePagination>;

export interface PaginationOptions {
  rowCount?: number;
  pageSizeKey?: string;
  pageSizeOptions?: number[];
  getApiParams?: (page: number, pageSize: number) => unknown;
  pageState?: {
    page: number;
    setPage: (page: number) => void;
  };
}
