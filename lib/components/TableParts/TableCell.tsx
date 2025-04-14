import React, { ReactElement, CSSProperties, useMemo, ReactNode, useContext } from "react";
import { getClasses } from "../../helpers/classNameHelper";
import { TableCell as TableCellType, ColOption } from "../../types/table.types";
import { Typography } from "../Typography/Typography";
import { Tooltip } from "../Tooltip/Tooltip";
import { AtomGridTableContext } from "../../context/AtomGridTableContext";
import { ComponentOverride } from "../ComponentOverride/ComponentOverride";

export const TableCell = (props: TableCellProps) => {
  const { index, cell, withResize, handleMouseDownResize, colOptions } = props;
  const { customComponents } = useContext(AtomGridTableContext);

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

  const isContentStringOrNumber = useMemo<boolean>(() => ["string", "number"].includes(typeof content), [content]);

  const cellContent = useMemo<ReactNode | null>(() => {
    return isContentStringOrNumber ? (
      <ComponentOverride
        defaultComponent={Typography}
        overrideComponent={customComponents?.typography}
        className={getClasses({ "AGT-one-line-text": !!isOneLine })}
      >
        {content}
      </ComponentOverride>
    ) : (
      content
    );
  }, [content, isOneLine, isContentStringOrNumber, customComponents]);

  return (
    <div
      key={index}
      className={getClasses(
        {
          "AGT-table-cell": true,
          "has-action": !!onClick,
          "is-number": !!isNumber,
          "is-header": !!isHeader || !!colOptions[index]?.isHeadersColumn,
          "AGT-is-no-padding": !!isNoPadding,
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
      {content && isOneLine && isContentStringOrNumber ? (
        <ComponentOverride
          defaultComponent={Tooltip}
          overrideComponent={customComponents?.tooltip}
          title={content as string | number}
        >
          {cellContent as ReactElement}
        </ComponentOverride>
      ) : (
        cellContent
      )}
      {withResize && <div className="resize-bar" onMouseDown={(e) => handleMouseDownResize?.(e, index)} />}
    </div>
  );
};

export interface TableCellProps {
  index: number;
  cell: TableCellType;
  colOptions: ColOption[];
  handleMouseDownResize?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  withResize?: boolean;
}
