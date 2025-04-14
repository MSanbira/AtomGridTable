import React, { useState } from "react";
import { BasicTableProp } from "./tableConsts";
import AtomGridTable from "../AtomGridTable";
import { AtomGridTableProvider } from "../context/AtomGridTableProvider";
import { Typography } from "../components/Typography/Typography";

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
