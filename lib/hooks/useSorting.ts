import { useCallback, useMemo, useState } from "react";

export enum SortingDirection {
  ASC = "asc",
  DESC = "desc",
}

const DirectionOptions = [SortingDirection.ASC, SortingDirection.DESC, null];

export const useSorting = (options: SortingOptions) => {
  const { defaultOrdering, defaultDirection, resetPage, getApiParams } = options;
  const [ordering, setOrdering] = useState<string>(defaultOrdering ?? "");
  const [direction, setDirection] = useState<SortingDirection | null>(
    defaultDirection ?? (defaultOrdering ? SortingDirection.ASC : null)
  );

  const apiParams = useMemo<SortingApiParams | unknown>(() => {
    if (getApiParams) return getApiParams(ordering, direction);

    if (!direction || !ordering) return { ordering: undefined };

    return { ordering: `${direction === SortingDirection.ASC ? "" : "-"}${ordering}` };
  }, [direction, ordering, getApiParams]);

  const handleChangeSort = useCallback(
    (newOrdering: string) => {
      if (ordering === newOrdering) {
        const currentDirectionIndex = DirectionOptions.indexOf(direction);
        const nextDirection = DirectionOptions[(currentDirectionIndex + 1) % DirectionOptions.length];
        setDirection(nextDirection);
      } else {
        setOrdering(newOrdering);
        setDirection(DirectionOptions[0]);
      }
      resetPage();
    },
    [direction, resetPage, ordering]
  );

  return { ordering, direction, handleChangeSort, apiParams };
};

export type SortingApiParams = { ordering: string | undefined };

export type SortingStore = ReturnType<typeof useSorting>;
export interface SortingOptions {
  defaultOrdering?: string;
  defaultDirection?: SortingDirection | null;
  resetPage: () => void;
  getApiParams?: (ordering: string, direction: SortingDirection | null) => unknown;
}
