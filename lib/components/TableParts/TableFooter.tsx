import React, { useContext } from "react";
import { Typography } from "../Typography/Typography";
import { TablePagination } from "./TablePagination";
import { PaginationStore } from "../../hooks/usePagination";
import { AtomGridTableContext } from "../../context/AtomGridTableContext";
import { ComponentOverride } from "../ComponentOverride/ComponentOverride";

export const TableFooter = (props: TableFooterProps) => {
  const { isHasSelect, selectedRows = [], paginationStore, isPagination, isLoading } = props;
  const { customComponents } = useContext(AtomGridTableContext);

  if (!isHasSelect && !paginationStore) return null;

  return (
    <div className="AGT-table-footer _d-flex-ali-center-jc-sb">
      {isHasSelect && (
        <ComponentOverride defaultComponent={Typography} overrideComponent={customComponents?.typography}>
          {!!selectedRows.length && `${selectedRows.length} ${selectedRows.length === 1 ? "row" : "rows"} selected`}
        </ComponentOverride>
      )}

      {isPagination && <TablePagination paginationStore={paginationStore} isLoading={isLoading} />}
    </div>
  );
};

interface TableFooterProps {
  paginationStore: PaginationStore;
  isPagination?: boolean;
  isHasSelect?: boolean;
  selectedRows?: (string | number)[];
  isLoading?: boolean;
}
