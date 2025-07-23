import { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";
import { DefaultPaginationSizeOptions } from "../constants/tableDefaults";

export const usePagination = <CustomPaginationApiParams>(options: PaginationOptions<CustomPaginationApiParams>) => {
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

  const apiParams = useMemo<CustomPaginationApiParams>(() => {
    if (!getApiParams) return { limit: pageSize, offset: pageToUse * pageSize } as CustomPaginationApiParams;

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

export interface PaginationOptions<CustomPaginationApiParams> {
  rowCount?: number;
  pageSizeKey?: string;
  pageSizeOptions?: number[];
  getApiParams?: (page: number, pageSize: number) => CustomPaginationApiParams;
  pageState?: {
    page: number;
    setPage: (page: number) => void;
  };
}
