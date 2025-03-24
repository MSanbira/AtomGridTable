import { useCallback } from "react";
import { Identifier } from "../types/general.types";
import { TableRow } from "../types/table.types";

export const useSelectRows = (props: useSelectRowsProps) => {
  const { selectedRows, setSelected, rows } = props;

  const handleSelectRowClick = useCallback(
    (e: React.MouseEvent, identifier: number | string) => {
      e.stopPropagation();
      const temp = [...selectedRows];
      const index = temp.indexOf(identifier);
      if (e.shiftKey && temp.length) {
        const lastSelectedIndex = temp[temp.length - 1];
        const lastIndex = rows.findIndex((row) => row.selectIdentifier === lastSelectedIndex);
        const currentIndex = rows.findIndex((row) => row.selectIdentifier === identifier);
        const [start, end] = lastIndex > currentIndex ? [currentIndex, lastIndex] : [lastIndex, currentIndex];
        const range = rows.map((row, i) => row.selectIdentifier ?? i).slice(start, end + 1);
        const newSelected = temp.includes(identifier) ? temp.filter((id) => !range.includes(id)) : [...temp, ...range];
        setSelected(newSelected);
        return;
      }

      if (index !== -1) {
        temp.splice(index, 1);
      } else {
        temp.push(identifier);
      }

      setSelected(temp);
    },
    [rows, selectedRows, setSelected]
  );

  const handleSelectAllClick = useCallback(() => {
    if (selectedRows.length) {
      setSelected([]);
    } else {
      setSelected(rows.map((row, i) => row.selectIdentifier ?? i));
    }
  }, [rows, selectedRows, setSelected]);

  return { handleSelectRowClick, handleSelectAllClick };
};

interface useSelectRowsProps {
  rows: TableRow[];
  selectedRows: Identifier[];
  setSelected: (selected: Identifier[]) => void;
}
