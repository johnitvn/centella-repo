import {createContext, FC, ReactNode, useContext} from "react";

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
export type TabOptions = BaseClassNameOptions & {
  role: {
    container: string;
    tabTrigger: string;
    tabTriggers: string;
    tabPanels: string;
    tabPanel: string;
  };
};

export type Theme = {
  button?: ButtonOptions;
  card?: CardOptions;
  tab?: TabOptions;
};

export type ThemeProviderProps = {
  theme: Theme;
  children: ReactNode | ReactNode[];
};

const ThemeContext = createContext<Theme>({} as unknown as Theme);
ThemeContext.displayName = "Centella";
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;

export {ThemeContext};
