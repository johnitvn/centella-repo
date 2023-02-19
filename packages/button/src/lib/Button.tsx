import {SizingSchema, ColorSchema, ThemeContext, classMerge} from "@centella/react-tw-core";
import {FC, HtmlHTMLAttributes, useContext} from "react";

export type ButtonTag = "button" | "a" | "div" | "span";

export type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement | HTMLLinkElement | HTMLDivElement | HTMLSpanElement> & {
  as?: ButtonTag;
  role?: string;
  size?: SizingSchema;
  color?: ColorSchema;
  shadow?: SizingSchema;
  rounded?: SizingSchema | "full";
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({as, color, role, size, rounded, shadow, disabled, ...rest}) => {
  const handleClick = () => {
    if (!disabled && rest.onClick) {
      rest.onClick();
    }
  };

  const theme = useContext(ThemeContext);
  const classNames = classMerge(
    theme.button.baseClassName,
    theme.button.rounded[rounded ?? "md"],
    theme.button.shadow[shadow ?? "md"],
    theme.button.size[size ?? "md"],
    theme.button.color[color ?? "default"],
    disabled ? "disabled" : "",
    rest.className
  );
  const Tag = as ?? "button";
  const props = {...rest, className: classNames, role: role ?? theme.button.role};
  return (
    <Tag onClick={handleClick} {...props} disabled={disabled}>
      {rest.children}
    </Tag>
  );
};
