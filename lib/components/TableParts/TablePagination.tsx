import React from "react";
import { PaginationStore } from "../../hooks/usePagination";
import { Typography } from "../Typography/Typography";
import { IconButton } from "../IconButton/IconButton";
import { Select } from "../Select/Select";
import { ArrowLeftPageIcon, ArrowRightPageIcon } from "../../icons/ArrowIcons";

export const TablePagination = (props: TablePaginationProps) => {
  const {
    paginationStore: { page, pageSize, rowCount, setPage, setPageSize, pageSizeOptions },
    dictionary,
  } = props;

  return (
    <div className="AGT-table-pagination">
      <div className="_d-flex-ali-center-sm-gap">
        <Typography color="secondary">{dictionary?.showing || "Showing"}</Typography>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          options={pageSizeOptions.map((option) => ({
            value: option.toString(),
          }))}
        />
      </div>
      <div className="_d-flex-ali-center-sm-gap">
        <Typography className="AGT-one-line-text" color="secondary">
          {page * pageSize + 1} - {Math.min(page * pageSize + pageSize, rowCount)} of {rowCount}
        </Typography>
        <IconButton onClick={() => setPage(page - 1)} disabled={page === 0} icon={<ArrowLeftPageIcon />} />
        <IconButton
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(rowCount / pageSize) - 1}
          icon={<ArrowRightPageIcon />}
        />
      </div>
    </div>
  );
};

export interface TablePaginationProps {
  paginationStore: PaginationStore;
  dictionary?: { showing: string };
}
