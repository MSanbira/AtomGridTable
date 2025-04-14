import { CheckboxProps } from "../components/Checkbox/Checkbox";
import { IconButtonProps } from "../components/IconButton/IconButton";
import { SelectProps } from "../components/Select/Select";
import { TooltipProps } from "../components/Tooltip/Tooltip";
import { TypographyProps } from "../components/Typography/Typography";
import { TableProps } from "./table.types";

export interface AtomGridTableContextProps {
  defaultTableOptions?: Partial<TableProps>;
  customComponents?: CustomComponents;
}

export interface CustomComponents {
  tooltip?: React.ComponentType<TooltipProps>;
  select?: React.ComponentType<SelectProps>;
  iconButton?: React.ComponentType<IconButtonProps>;
  typography?: React.ComponentType<TypographyProps>;
  skeleton?: React.ComponentType;
  checkbox?: React.ComponentType<CheckboxProps>;
}
