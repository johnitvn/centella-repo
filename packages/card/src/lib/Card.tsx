import {FC, HtmlHTMLAttributes, useContext} from "react";
import {classMerge, SizingSchema, ThemeContext} from "@centella/react-tw-core";
import {Theme, ThemeProvider} from "@centella/react-tw-core";
import {render} from "@testing-library/react";
import {ReactNode} from "react";
import {themeMock} from "../../../themeMock";

const renderWithTheme = (elm: ReactNode) => render(<ThemeProvider theme={themeMock as Theme}> {elm} </ThemeProvider>);

export type CardProps = HtmlHTMLAttributes<HTMLElement> & {
  size?: SizingSchema;
  shadow?: SizingSchema;
  rounded?: SizingSchema | "full";
};

export const Card: FC<CardProps> = ({role, size, rounded, shadow, ...rest}) => {
  const theme = useContext(ThemeContext);
  const classNames = classMerge(
    theme.card.baseClassName,
    theme.card.rounded[rounded ?? "md"],
    theme.card.shadow[shadow ?? "md"],
    theme.card.color.default,
    rest.className
  );
  const props = {...rest, className: classNames};
  return <section {...props}>{rest.children}</section>;
};
