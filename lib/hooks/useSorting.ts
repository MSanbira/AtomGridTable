import { useCallback, useMemo, useState } from "react";

export enum SortingDirection {
  ASC = "asc",
  DESC = "desc",
}

const DirectionOptions = [SortingDirection.ASC, SortingDirection.DESC, null];

export const useSorting = (options: useSortingOptions = {}) => {
  const { defaultOrdering, defaultDirection, onSort } = options;
  const [ordering, setOrdering] = useState<string>(defaultOrdering ?? "");
  const [direction, setDirection] = useState<SortingDirection | null>(defaultDirection ?? null);

  const apiParams = useMemo<SortingApiParams>(() => {
    if (!direction || !ordering) return { ordering: undefined };

    return { ordering: `${direction === SortingDirection.ASC ? "" : "-"}${ordering}` };
  }, [direction, ordering]);

  const handleChangeSort = useCallback(
    (newOrdering: string) => {
      if (ordering === newOrdering) {
        const currentDirectionIndex = DirectionOptions.indexOf(direction);
        const nextDirection = DirectionOptions[(currentDirectionIndex + 1) % DirectionOptions.length];
        setDirection(nextDirection);
        onSort?.(newOrdering, nextDirection);
      } else {
        setOrdering(newOrdering);
        setDirection(DirectionOptions[0]);
        onSort?.(newOrdering, DirectionOptions[0]);
      }
    },
    [direction, onSort, ordering]
  );

  return { ordering, direction, handleChangeSort, apiParams };
};

export type SortingApiParams = { ordering: string | undefined };

interface useSortingOptions {
  defaultOrdering?: string;
  defaultDirection?: SortingDirection | null;
  onSort?: (ordering: string, direction: SortingDirection | null) => void;
}

export type SortingStore = ReturnType<typeof useSorting>;
