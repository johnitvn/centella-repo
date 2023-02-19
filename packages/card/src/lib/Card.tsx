import {FC, HtmlHTMLAttributes, useContext} from "react";
import {classMerge, SizingSchema, ThemeContext} from "@centella/react-tw-core";

export type CardProps = HtmlHTMLAttributes<HTMLElement> & {
  size?: SizingSchema;
  shadow?: SizingSchema;
  rounded?: SizingSchema | "full";
};

export const Card: FC<CardProps> = ({role, size, rounded, shadow, ...rest}) => {
  const theme = useContext(ThemeContext);
  console.log(theme);
  if (!theme.card) {
    throw new Error("Have no theme config for card component");
  }
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
