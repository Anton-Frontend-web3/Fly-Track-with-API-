import { useContext } from "react";
import { ThemeContext } from "./Theme.context";

export function useTheme(){
    return useContext(ThemeContext)
}