import { useCallback, useEffect, useRef, useState } from "react";
import { ColOption } from "../types/table.types";

export const useResizeColumns = (props: useResizeColumnsProps) => {
  const { colOptions } = props;

  const [mouseClientX, setMouseClientX] = useState<number>(0);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const setResizeCellOptions = useCallback(
    (
      options: {
        index: number;
        startX: number;
        initialWidth: number;
      } | null
    ) => {
      wrapperRef.current?.setAttribute("data-resize-cell-options", JSON.stringify(options));
    },
    []
  );

  const handleResize = useCallback(() => {
    const resizeCellOptionsStr = wrapperRef.current?.getAttribute("data-resize-cell-options");
    if (!resizeCellOptionsStr) return;

    const resizeCellOptions = JSON.parse(resizeCellOptionsStr);

    const colResizeOptions = colOptions[resizeCellOptions?.index]?.resizeOptions;
    if (!colResizeOptions) return;

    const delta = mouseClientX - resizeCellOptions.startX;
    const colWidths = wrapperRef.current?.getAttribute("data-col-widths")?.split(";") ?? [];
    const colWidth = colWidths[resizeCellOptions.index];
    const colWidthNumber = colWidth.match(/^\d+px$/g)
      ? parseInt(colWidth.replace("px", ""))
      : resizeCellOptions.initialWidth;
    const clampValue = Math.min(
      Math.max(Math.round(colWidthNumber + delta), colResizeOptions.min),
      colResizeOptions.max
    );

    if (clampValue >= colResizeOptions.max || clampValue <= colResizeOptions.min) return;

    colWidths[resizeCellOptions.index] = `${clampValue}px`;
    wrapperRef.current?.setAttribute("data-col-widths", colWidths.join(";"));
    wrapperRef.current?.style.setProperty("--template-cols", colWidths.join(" "));

    setResizeCellOptions({ ...resizeCellOptions, startX: mouseClientX });
  }, [colOptions, mouseClientX, setResizeCellOptions]);

  const handleRemoveResize = useCallback(() => {
    // to not register a click on a sorting header
    setTimeout(() => {
      setResizeCellOptions(null);
      setIsResizing(false);
    }, 50);
  }, [setResizeCellOptions]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseClientX(e.clientX);
  }, []);

  const handleMouseDownResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      setResizeCellOptions({
        index: index,
        startX: e.clientX,
        initialWidth: e.currentTarget?.parentElement?.clientWidth ?? 100,
      });
      setIsResizing(true);
    },
    [setResizeCellOptions]
  );

  useEffect(() => {
    if (isResizing) {
      handleResize();
    }
  }, [mouseClientX, handleResize, isResizing]);

  useEffect(() => {
    document.addEventListener("mouseup", handleRemoveResize);
    return () => document.removeEventListener("mouseup", handleRemoveResize);
  }, [handleRemoveResize]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return {
    wrapperRef,
    isResizing,
    handleMouseDownResize,
  };
};

interface useResizeColumnsProps {
  colOptions: ColOption[];
}
