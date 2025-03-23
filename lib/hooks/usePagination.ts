import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

export const usePagination = (pageSizeKey: string = "generalPageSizePref") => {
  const [page, setPage] = useState<number>(0);
  const [pageSize = PaginationSizeOptions[0], setPageSize] = useLocalStorage<number>(pageSizeKey);
  const [rowCount, setRowCount] = useState<number>(0);

  const apiParams = useMemo<PaginationApiParams>(
    () => ({
      limit: pageSize,
      offset: page * pageSize,
    }),
    [page, pageSize]
  );

  useEffect(() => {
    if (page !== 0) {
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  return { rowCount, setRowCount, page, setPage, pageSize, setPageSize, apiParams };
};

export const PaginationSizeOptions = [10, 20, 50, 100];

export type PaginationApiParams = { limit: number; offset: number };

export type PaginationStore = ReturnType<typeof usePagination>;
