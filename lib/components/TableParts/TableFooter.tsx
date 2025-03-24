import React from "react";
import { Typography } from "../Typography/Typography";
import { TablePagination } from "./TablePagination";
import { PaginationStore } from "../../hooks/usePagination";

export const TableFooter = (props: TableFooterProps) => {
  const { isHasSelect, selectedRows = [], paginationStore } = props;
  if (!isHasSelect && !paginationStore) return null;

  return (
    <div className="_d-flex-ali-center-jc-sb">
      {isHasSelect && (
        <Typography>
          {!!selectedRows.length && `${selectedRows.length} ${selectedRows.length === 1 ? "row" : "rows"} selected`}
        </Typography>
      )}

      {paginationStore && <TablePagination paginationStore={paginationStore} />}
    </div>
  );
};

interface TableFooterProps {
  isHasSelect?: boolean;
  selectedRows?: (string | number)[];
  paginationStore?: PaginationStore;
}
