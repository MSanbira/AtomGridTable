import React, { useContext } from "react";
import { PaginationStore } from "../../hooks/usePagination";
import { Typography } from "../Typography/Typography";
import { IconButton } from "../IconButton/IconButton";
import { Select } from "../Select/Select";
import { ArrowLeftPageIcon, ArrowRightPageIcon } from "../../icons/ArrowIcons";
import { AtomGridTableContext } from "../../context/AtomGridTableContext";
import { ComponentOverride } from "../ComponentOverride/ComponentOverride";
import { IconButtonType } from "../../types/general.types";

export const TablePagination = (props: TablePaginationProps) => {
  const {
    paginationStore: { page, pageSize, rowCount, setPage, setPageSize, pageSizeOptions },
    dictionary,
    isLoading,
  } = props;
  const { customComponents } = useContext(AtomGridTableContext);

  if (isLoading) {
    return null;
  }

  return (
    <div className="AGT-table-pagination">
      <div className="_d-flex-ali-center-sm-gap">
        <ComponentOverride
          defaultComponent={Typography}
          overrideComponent={customComponents?.typography}
          color="secondary"
        >
          {dictionary?.showing || "Showing"}
        </ComponentOverride>
        <ComponentOverride
          defaultComponent={Select}
          overrideComponent={customComponents?.select}
          value={pageSize.toString()}
          onChange={(e) => setPageSize(Number(e.target.value))}
          options={pageSizeOptions.map((option) => ({
            value: option.toString(),
          }))}
        />
      </div>
      <div className="_d-flex-ali-center-sm-gap">
        <ComponentOverride
          defaultComponent={Typography}
          overrideComponent={customComponents?.typography}
          className="AGT-one-line-text"
          color="secondary"
        >
          {page * pageSize + 1} - {Math.min(page * pageSize + pageSize, rowCount)} of {rowCount}
        </ComponentOverride>
        <ComponentOverride
          defaultComponent={IconButton}
          overrideComponent={customComponents?.iconButton}
          onClick={() => setPage(page - 1, false)}
          disabled={page === 0}
          icon={<ArrowLeftPageIcon />}
          iconType={IconButtonType.ArrowLeft}
        />
        <ComponentOverride
          defaultComponent={IconButton}
          overrideComponent={customComponents?.iconButton}
          onClick={() => setPage(page + 1, false)}
          disabled={page === Math.ceil(rowCount / pageSize) - 1}
          icon={<ArrowRightPageIcon />}
          iconType={IconButtonType.ArrowRight}
        />
      </div>
    </div>
  );
};

export interface TablePaginationProps {
  paginationStore: PaginationStore;
  dictionary?: { showing: string };
  isLoading?: boolean;
}
