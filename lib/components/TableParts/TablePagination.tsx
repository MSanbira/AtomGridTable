import React from "react";
import { PaginationSizeOptions, PaginationStore } from "../../hooks/usePagination";
import { Typography } from "../Typography/Typography";
import { IconButton } from "../IconButton/IconButton";
import { Select } from "../Select/Select";

export const TablePagination = (props: TablePaginationProps) => {
  const {
    paginationStore: { page, pageSize, rowCount, setPage, setPageSize },
    dictionary,
  } = props;

  return (
    <div className="CSUI-layout-table-pagination">
      <div className="_d-flex-ali-center">
        <Typography color="secondary">{dictionary?.showing || "Showing"}</Typography>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          options={PaginationSizeOptions.map((option) => ({
            value: option.toString(),
          }))}
        />
      </div>
      <div className="_d-flex-ali-center-sm-gap">
        <Typography className="one-line-text" color="secondary">
          {page * pageSize + 1} - {Math.min(page * pageSize + pageSize, rowCount)} of {rowCount}
        </Typography>
        <IconButton onClick={() => setPage(page - 1)} disabled={page === 0} icon="<" />
        <IconButton
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(rowCount / pageSize) - 1}
          icon={">"}
        />
      </div>
    </div>
  );
};

export interface TablePaginationProps {
  paginationStore: PaginationStore;
  dictionary?: { showing: string };
}
