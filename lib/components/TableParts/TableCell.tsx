import React, { ReactElement, CSSProperties, useMemo, ReactNode } from "react";
import { getClasses } from "../../helpers/classNameHelper";
import { TableCell as TableCellType, ColOption } from "../../types/table.types";
import { Typography } from "../Typography/Typography";
import { Tooltip } from "../Tooltip/Tooltip";

export const TableCell = (props: TableCellProps) => {
  const { index, cell, withResize, handleMouseDownResize, colOptions } = props;

  const {
    className,
    onClick,
    content,
    isOneLine,
    isNumber,
    isHeader,
    isDisabled,
    isNoPadding,
    isCentered,
    span,
    style,
    ...rest
  } = cell;

  const cellContent = useMemo<ReactNode | null>(() => {
    return ["string", "number"].includes(typeof content) ? (
      <Typography className={getClasses({ "one-line-text": !!isOneLine })}>{content}</Typography>
    ) : (
      content
    );
  }, [content, isOneLine]);

  return (
    <div
      key={index}
      className={getClasses(
        {
          "AGT-module-table-cell": true,
          "has-action": !!onClick,
          "is-number": !!isNumber,
          "is-header": !!isHeader || !!colOptions[index]?.isHeadersColumn,
          "is-no-padding": !!isNoPadding,
          "is-disabled": !!isDisabled,
          "is-centered": !!isCentered,
        },
        className
      )}
      onClick={onClick}
      style={
        {
          "--col-span": span,
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {cellContent && isOneLine ? <Tooltip title={cellContent}>{cellContent as ReactElement}</Tooltip> : cellContent}
      {withResize && <div className="resize-bar" onMouseDown={(e) => handleMouseDownResize(e, index)} />}
    </div>
  );
};

export interface TableCellProps {
  index: number;
  cell: TableCellType;
  colOptions: ColOption[];
  handleMouseDownResize: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  withResize?: boolean;
}
