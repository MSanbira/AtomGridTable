import React, { CSSProperties, useContext } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { getClasses } from "../../helpers/classNameHelper";
import { TableCell } from "./TableCell";
import { ColOption, TableRow as TableRowType } from "../../types/table.types";
import { AtomGridTableContext } from "../../context/AtomGridTableContext";
import { ComponentOverride } from "../ComponentOverride/ComponentOverride";

interface TableRowProps {
  row: TableRowType;
  index: number;
  isHasSelect?: boolean;
  colOptions: ColOption[];
  selectedRows?: (string | number)[];
  handleSelectRowClick?: (e: React.MouseEvent, identifier: string | number) => void;
  handleMouseDownResize?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
}

export const TableRow = ({
  row,
  index,
  isHasSelect,
  colOptions,
  selectedRows = [],
  handleSelectRowClick,
  handleMouseDownResize,
}: TableRowProps) => {
  const { isActive, onClick, isHeader, className, selectIdentifier, cells, ...rest } = row;
  const { customComponents } = useContext(AtomGridTableContext);

  return (
    <div
      className={getClasses(
        {
          "AGT-table-row": true,
          "is-active": !!isActive,
          "has-action": !!onClick,
          "is-header": !!isHeader,
        },
        className
      )}
      onClick={onClick}
      style={{ ...rest.style, "--grid-row": `${index + 2} / ${index + 3}` } as CSSProperties}
      {...rest}
    >
      {isHasSelect && (
        <TableCell
          key={0}
          index={-1}
          cell={{
            content: (
              <ComponentOverride
                defaultComponent={Checkbox}
                overrideComponent={customComponents?.checkbox}
                checked={selectedRows.includes(selectIdentifier ?? index)}
                onClick={(e) => handleSelectRowClick?.(e, selectIdentifier ?? index)}
              />
            ),
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
          />
        );
      })}
    </div>
  );
};
