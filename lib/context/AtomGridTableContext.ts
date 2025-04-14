import { createContext } from "react";
import { AtomGridTableContextProps } from "../types/tableContext.types";

const defaultContext: AtomGridTableContextProps = {};

export const AtomGridTableContext = createContext<AtomGridTableContextProps>(defaultContext);
