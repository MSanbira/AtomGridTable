import { useCallback, useEffect, useMemo, useState } from "react";
import { RowSlice } from "../types/table.types";
import { DefaultVirtualizationRowBuffer } from "../constants/tableDefaults";

export const useVirtualization = (options: VirtualizationHookOptions) => {
  const { isVirtualization, rowHight, tableWrapperRef, rowsLength } = options;

  const [rowToShowSlice, setRowToShowSlice] = useState<RowSlice | null>(null);

  const rowsToShowNumber = useMemo<number>(() => {
    return Math.round(window.innerHeight / rowHight) + DefaultVirtualizationRowBuffer;
  }, [rowHight]);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (!rowToShowSlice) return;

      const rowOffset = Math.round(e.deltaY / rowHight);
      const start = Math.min(rowsLength - rowsToShowNumber, Math.max(0, rowToShowSlice?.start + rowOffset));
      const end = Math.min(rowsLength, start + rowsToShowNumber);

      console.log("handleScroll", e.deltaY, rowOffset, start, end);

      setRowToShowSlice({
        start,
        end,
      });
    },
    [rowHight, rowToShowSlice, rowsLength, rowsToShowNumber]
  );

  useEffect(() => {
    if (!isVirtualization || !!rowToShowSlice || !rowHight) return;

    const start = 0;
    const end = start + rowsToShowNumber;

    setRowToShowSlice({ start, end });
  }, [isVirtualization, rowToShowSlice, rowHight, rowsToShowNumber]);

  useEffect(() => {
    if (!isVirtualization || !tableWrapperRef.current) return;

    const currentRef = tableWrapperRef.current;

    // TODO: make it work on mobile
    currentRef.addEventListener("wheel", handleScroll);

    return () => {
      currentRef.removeEventListener("wheel", handleScroll);
    };
  }, [isVirtualization, tableWrapperRef, handleScroll]);

  return {
    rowToShowSlice,
  };
};

interface VirtualizationHookOptions {
  isVirtualization: boolean;
  rowHight: number;
  tableWrapperRef: React.RefObject<HTMLDivElement>;
  rowsLength: number;
}
