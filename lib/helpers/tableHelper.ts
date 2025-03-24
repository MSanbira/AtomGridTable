import { ColOption } from "../types/table.types";

const optionalArray = (isReturn: boolean, value: unknown[]): unknown[] => (isReturn ? value : []);

const optionalObjectAsArray = (isReturn: boolean, value: object): unknown[] => (isReturn ? [value] : []);

const numLengthArr = (length: number): number[] => Array.from({ length }, (_, i) => i);

const getColOptionsWithSelect = (colOptions: ColOption[], isHasSelect: boolean): ColOption[] => {
  if (!isHasSelect) return colOptions;

  return [{ width: "auto" }, ...colOptions];
};

export const tableHelper = {
  optionalArray,
  optionalObjectAsArray,
  numLengthArr,
  getColOptionsWithSelect,
};
