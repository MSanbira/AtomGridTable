import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ColOption } from "../types/table.types";
import { tableHelper } from "../helpers/tableHelper";
import { AtomGridTableContext } from "../context/AtomGridTableContext";

export const useResizeColumns = (props: useResizeColumnsProps) => {
  const { colOptions, isHasSelect } = props;
  const { globalMouseClientX, isHasContext } = useContext(AtomGridTableContext);
  const [mouseClientX, setMouseClientX] = useState<number>(0);

  const clientX = useMemo(() => {
    return globalMouseClientX ?? mouseClientX;
  }, [globalMouseClientX, mouseClientX]);

  const [isResizing, setIsResizing] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const colOptionsWithSelect = useMemo(() => {
    return tableHelper.getColOptionsWithSelect(colOptions, !!isHasSelect);
  }, [colOptions, isHasSelect]);

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

    const colIndex = resizeCellOptions?.index - (isHasSelect ? 1 : 0);
    const colResizeOptions = colOptions[colIndex]?.resizeOptions;
    if (!colResizeOptions) return;

    const delta = clientX - resizeCellOptions.startX;
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

    setResizeCellOptions({ ...resizeCellOptions, startX: clientX });
  }, [colOptions, clientX, setResizeCellOptions, isHasSelect]);

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
  }, [clientX, handleResize, isResizing]);

  useEffect(() => {
    document.addEventListener("mouseup", handleRemoveResize);
    return () => document.removeEventListener("mouseup", handleRemoveResize);
  }, [handleRemoveResize]);

  useEffect(() => {
    if (isHasContext) {
      document.removeEventListener("mousemove", handleMouseMove);
      return;
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, isHasContext]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const colWidths = colOptionsWithSelect.map((col) => col.width || "minmax(150px, 1fr)");
    wrapperRef.current.setAttribute("data-col-widths", colWidths.join(";"));
    wrapperRef.current.style.setProperty("--template-cols", colWidths.join(" "));
  }, [colOptionsWithSelect, wrapperRef]);

  return {
    wrapperRef,
    isResizing,
    handleMouseDownResize,
  };
};

interface useResizeColumnsProps {
  colOptions: ColOption[];
  isHasSelect?: boolean;
}
