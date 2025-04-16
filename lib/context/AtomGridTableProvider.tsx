import React, { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AtomGridTableContextProps } from "../types/tableContext.types";
import { AtomGridTableContext } from "./AtomGridTableContext";

export const AtomGridTableProvider: FC<PropsWithChildren<AtomGridTableContextProps>> = (props) => {
  const { children, ...rest } = props;
  const [globalMouseClientX, setGlobalMouseClientX] = useState<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setGlobalMouseClientX(e.clientX);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <AtomGridTableContext.Provider value={{ ...rest, globalMouseClientX, isHasContext: true }}>
      {children}
    </AtomGridTableContext.Provider>
  );
};
