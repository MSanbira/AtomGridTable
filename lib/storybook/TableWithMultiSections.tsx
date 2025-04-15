import React from "react";
import AtomGridTable from "../AtomGridTable";
import { MultiSectionTableProp } from "./tableConsts";

export const TableWithMultiSections = () => (
  <div style={{ height: "50vh" }}>
    <AtomGridTable {...MultiSectionTableProp} tableStyleOptions={{ isStickyHeader: true }} />
  </div>
);
