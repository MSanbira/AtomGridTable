import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AtomGridTableContextProps } from "../types/tableContext.types";
import { AtomGridTableContext } from "./AtomGridTableContext";
import { PaginationApiParams } from "../hooks/usePagination";
import { SortingApiParams } from "../hooks/useSorting";

export const AtomGridTableProvider = <
  CustomFilterDependencies = unknown,
  CustomPaginationApiParams = PaginationApiParams,
  CustomSortingApiParams = SortingApiParams,
>(
  props: PropsWithChildren<
    AtomGridTableContextProps<CustomFilterDependencies, CustomPaginationApiParams, CustomSortingApiParams>
  >
) => {
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
    <AtomGridTableContext.Provider
      value={{ ...rest, globalMouseClientX, isHasContext: true } as AtomGridTableContextProps}
    >
      {children}
    </AtomGridTableContext.Provider>
  );
};
