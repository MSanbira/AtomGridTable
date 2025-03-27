import React, { useState } from "react";
import { Identifier } from "../types/general.types";
import AtomGridTable from "../AtomGridTable";
import { BasicTableProp } from "./tableConsts";
import { Typography } from "../components/Typography/Typography";

export const TableWithSelectedRows = () => {
  const [selectedRows, setSelectedRows] = useState<Identifier[]>([]);

  return (
    <div>
      <AtomGridTable {...BasicTableProp} selectedRows={selectedRows} setSelected={setSelectedRows} isHasSelect={true} />
      <Typography>
        <strong>Selected Row IDs:</strong> {selectedRows.join(", ")}
      </Typography>
    </div>
  );
};
