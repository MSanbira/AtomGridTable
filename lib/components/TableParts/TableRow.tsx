import React, { CSSProperties, useContext, useMemo } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { getClasses } from "../../helpers/classNameHelper";
import { TableCell } from "./TableCell";
import { ColOption, TableRow as TableRowType } from "../../types/table.types";
import { AtomGridTableContext } from "../../context/AtomGridTableContext";
import { ComponentOverride } from "../ComponentOverride/ComponentOverride";
import { tableHelper } from "../../helpers/tableHelper";
import { Skeleton } from "../Skeleton/Skeleton";

export const TableRow = (props: TableRowProps) => {
  const {
    row: rowProp = { cells: [] },
    index,
    isHasSelect,
    colOptions,
    selectedRows = [],
    handleSelectRowClick,
    handleMouseDownResize,
    isSkeleton,
    isOneLineAll,
  } = props;
  const { customComponents } = useContext(AtomGridTableContext);

  const row = useMemo<TableRowType>(() => {
    if (!isSkeleton) return rowProp;

    return {
      cells: tableHelper.numLengthArr(colOptions.length + (isHasSelect ? 1 : 0)).map((i) => ({
        content: (
          <ComponentOverride key={i} defaultComponent={Skeleton} overrideComponent={customComponents?.skeleton} />
        ),
      })),
    };
  }, [isSkeleton, rowProp, colOptions.length, isHasSelect, customComponents]);

  const { isActive, onClick, isHeader, className, selectIdentifier, cells, isSticky, ...rest } = row;

  return (
    <div
      className={getClasses(
        {
          "AGT-table-row": true,
          "is-active": !!isActive,
          "has-action": !!onClick,
          "is-header": !!isHeader,
          "is-sticky": !!isSticky,
        },
        className
      )}
      onClick={onClick}
      style={{ ...rest.style, "--grid-row": `${index + 2} / ${index + 3}` } as CSSProperties}
      {...rest}
    >
      {isHasSelect && !isSkeleton && (
        <TableCell
          key={0}
          index={-1}
          cell={{
            content: (
              <ComponentOverride
                defaultComponent={Checkbox}
                overrideComponent={customComponents?.checkbox}
                checked={selectedRows.includes(selectIdentifier ?? index.toString())}
                onClick={(e) => handleSelectRowClick?.(e, selectIdentifier ?? index.toString())}
              />
            ),
            isCentered: true,
          }}
          colOptions={colOptions}
          handleMouseDownResize={handleMouseDownResize}
        />
      )}

      {cells.map((cell, cellIndex) => {
        if (!cell) return null;

        return (
          <TableCell
            key={cellIndex}
            index={cellIndex}
            cell={cell}
            colOptions={colOptions}
            handleMouseDownResize={handleMouseDownResize}
            isOneLineAll={isOneLineAll}
          />
        );
      })}
    </div>
  );
};

interface TableRowProps {
  index: number;
  row?: TableRowType;
  isHasSelect?: boolean;
  colOptions: ColOption[];
  selectedRows?: (string | number)[];
  handleSelectRowClick?: (e: React.MouseEvent, identifier: string) => void;
  handleMouseDownResize?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  isSkeleton?: boolean;
  isOneLineAll?: boolean;
}
