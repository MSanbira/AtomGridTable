import React, { useState } from "react";
import { BasicTableProp } from "./tableConsts";
import AtomGridTable from "../AtomGridTable";
import { AtomGridTableProvider } from "../context/AtomGridTableProvider";
import { Typography, TypographyProps } from "../components/Typography/Typography";
import { CheckboxProps } from "../components/Checkbox/Checkbox";
import { TooltipProps } from "../components/Tooltip/Tooltip";

export const TableWithContext = () => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const contextValue = {
    defaultTableOptions: {
      isHasSelect: true,
      selectedRows,
      setSelected: setSelectedRows,
      tableStyleOptions: {
        isZebra: true,
        isSmallCellPadding: true,
      },
    },
    customComponents: {
      skeleton: () => <div>☠️</div>,
      typography: (props: TypographyProps) => (
        <p {...props} style={{ color: "red" }}>
          {props.children}
        </p>
      ),
      checkbox: (props: CheckboxProps) => (
        <input type="checkbox" checked={props.checked} onClick={(e) => props.onClick?.(e, !props.checked)} />
      ),
      tooltip: (props: TooltipProps) => (
        <div>
          {props.children}
          {props.title}
        </div>
      ),
    },
  };

  return (
    <div>
      <AtomGridTableProvider {...contextValue}>
        <AtomGridTable {...BasicTableProp} />
      </AtomGridTableProvider>
      <Typography>
        <strong>Selected Row IDs:</strong> {selectedRows.join(", ")}
      </Typography>
    </div>
  );
};
