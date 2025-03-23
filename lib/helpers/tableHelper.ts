const optionalArray = (isReturn: boolean, value: unknown[]): unknown[] => (isReturn ? value : []);

const optionalObjectAsArray = (isReturn: boolean, value: object): unknown[] => (isReturn ? [value] : []);

const numLengthArr = (length: number): number[] => Array.from({ length }, (_, i) => i);

export const tableHelper = {
  optionalArray,
  optionalObjectAsArray,
  numLengthArr,
};
