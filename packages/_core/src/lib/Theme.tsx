import {createContext, FC, ReactNode} from "react";

export type ColorSchema = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "default";
export type SizingSchema = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type VariantSchema = "filled" | "outline";
export type RoundedSchema = SizingSchema | "full";
export type ColorWithDisableSchema = ColorSchema | "disabled";

export type BaseClassNameOptions = {baseClassName: string | string[]};
export type RoleOptions = {role: string};
export type SizeOptions = {size: {[key in SizingSchema]: string}};
export type ShadowOptions = {shadow: {[key in SizingSchema]: string}};
export type RoundedOptions = {rounded: {[key in RoundedSchema]: string}};
export type ColorOptions = {color: {[key in ColorSchema]: string}};
export type ColorWithDisabledOptions = {color: {[key in ColorWithDisableSchema]: string}};

export type ButtonOptions = BaseClassNameOptions &
  RoleOptions &
  ShadowOptions &
  SizeOptions &
  RoundedOptions &
  ColorWithDisabledOptions;
export type CardOptions = BaseClassNameOptions & ShadowOptions & RoundedOptions & ColorOptions;

export type Theme = {
  button: ButtonOptions;
  card: CardOptions;
};

export type ThemeProviderProps = {
  theme: Theme;
  children: ReactNode | ReactNode[];
};

export const ThemeContext = createContext<Theme>({} as unknown as Theme);
const ThemeProvider: FC<ThemeProviderProps> = ({theme, children}: ThemeProviderProps) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
ThemeProvider.displayName = "CentellaTheme";
export {ThemeProvider};
