
import { createContext} from "react"
export type ThemeType = 'dark' | 'light'

export interface IThemeType {
    theme: ThemeType;
    toggleTheme: () => void
}

export const ThemeContext = createContext<IThemeType>({} as IThemeType)