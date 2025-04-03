import React, { useState } from "react";
import { BasicTableProp } from "./tableConsts";
import AtomGridTable from "../AtomGridTable";
import { Typography } from "../components/Typography/Typography";

export const TableWithActions = () => {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const tableProps = { ...BasicTableProp };
  tableProps.rows.forEach((row, index) => {
    row.onClick = () => setActiveRow(index);
    row.isActive = index === activeRow;
  });

  return (
    <div>
      <AtomGridTable {...tableProps} tableStyleOptions={{ isNoXCellBorders: true }} />
      <Typography>Active Row: {activeRow}</Typography>
    </div>
  );
};
