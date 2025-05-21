import { useCallback, useEffect, useMemo, useState } from "react";
import { RowSlice } from "../types/table.types";
import { DefaultVirtualizationRowBuffer } from "../constants/tableDefaults";

export const useVirtualization = (options: VirtualizationHookOptions) => {
  const { isVirtualization, rowHeight, tableWrapperRef, rowsLength } = options;

  const [rowToShowSlice, setRowToShowSlice] = useState<RowSlice | null>(null);

  const rowsToShowNumber = useMemo<number>(() => {
    return Math.round(window.innerHeight / rowHeight) + DefaultVirtualizationRowBuffer;
  }, [rowHeight]);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (!rowToShowSlice) return;

      const rowOffset = Math.round(e.deltaY / rowHeight);
      const start = Math.min(rowsLength - rowsToShowNumber, Math.max(0, rowToShowSlice?.start + rowOffset));
      const end = Math.min(rowsLength, start + rowsToShowNumber);

      console.log("handleScroll", e.deltaY, rowOffset, start, end);

      setRowToShowSlice({
        start,
        end,
      });
    },
    [rowHeight, rowToShowSlice, rowsLength, rowsToShowNumber]
  );

  useEffect(() => {
    if (!isVirtualization || !!rowToShowSlice || !rowHeight) return;

    const start = 0;
    const end = start + rowsToShowNumber;

    setRowToShowSlice({ start, end });
  }, [isVirtualization, rowToShowSlice, rowHeight, rowsToShowNumber]);

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
  rowHeight: number;
  tableWrapperRef: React.RefObject<HTMLDivElement>;
  rowsLength: number;
}
