import React, { useState, useCallback } from "react";
import { LargeTableProp } from "./tableConsts";
import AtomGridTable from "../AtomGridTable";
import { getRows } from "./apiSimulator";
import { PaginationChangeOptions, SortingChangeOptions, TableRow } from "../types/table.types";
export const TableWithPageAndSort = () => {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = useCallback(
    async (generalOptions: {
      pageOptions: Pick<PaginationChangeOptions, "apiParams">;
      sortOptions: Pick<SortingChangeOptions, "apiParams">;
    }) => {
      const { pageOptions, sortOptions } = generalOptions;
      const { apiParams: paginationApiParams } = pageOptions;
      const { apiParams: sortingApiParams } = sortOptions;

      setIsLoading(true);
      const { rows, totalCount } = await getRows(paginationApiParams, sortingApiParams);
      setRows(rows);
      setTotalCount(totalCount);
      setIsLoading(false);
    },
    []
  );

  return (
    <div style={{ height: "80vh", width: "150%" }}>
      <AtomGridTable
        colOptions={LargeTableProp.colOptions}
        rows={rows}
        paginationOptions={{ rowCount: totalCount }}
        onChange={handleChange}
        isLoading={isLoading}
        tableStyleOptions={{ isZebra: true, isSmallCellPadding: true, isStickyHeader: true }}
      />
    </div>
  );
};
