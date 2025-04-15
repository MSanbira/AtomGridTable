import React, { useState } from "react";
import { BasicTableProp } from "./tableConsts";
import AtomGridTable from "../AtomGridTable";
import { AtomGridTableProvider } from "../context/AtomGridTableProvider";
import { Typography, TypographyProps } from "../components/Typography/Typography";
import { AtomGridTableContextProps } from "../types/tableContext.types";

export const TableWithContext = () => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const contextValue: AtomGridTableContextProps = {
    defaultTableOptions: {
      isHasSelect: true,
      selectedRows,
      setSelected: setSelectedRows,
      tableStyleOptions: {
        isZebra: true,
        isSmallCellPadding: true,
        colorScheme: "light",
      },
    },
    customComponents: {
      skeleton: () => <div>☠️</div>,
      typography: (props: TypographyProps) => (
        <p {...props} style={{ fontFamily: "monospace" }}>
          {props.children}
        </p>
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
