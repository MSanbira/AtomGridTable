import React, { FC, PropsWithChildren } from "react";
import { AtomGridTableContextProps } from "../types/tableContext.types";
import { AtomGridTableContext } from "./AtomGridTableContext";

export const AtomGridTableProvider: FC<PropsWithChildren<AtomGridTableContextProps>> = (props) => {
  const { children, ...rest } = props;
  return <AtomGridTableContext.Provider value={rest}>{children}</AtomGridTableContext.Provider>;
};
