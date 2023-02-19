import {fireEvent} from "@testing-library/react";
import {Button, ButtonTag} from "./Button";
import {classMerge, ColorSchema, SizingSchema, RoundedSchema} from "@centella/react-tw-core";
import {Theme, ThemeProvider} from "@centella/react-tw-core";
import {render} from "@testing-library/react";
import {ReactNode} from "react";
import {themeMock} from "../../../themeMock";
import React from "react";

const renderWithTheme = (elm: ReactNode) => render(<ThemeProvider theme={themeMock as Theme}> {elm} </ThemeProvider>);

describe("Button Component", () => {
  test("renders default button", () => {
    const {getByRole} = renderWithTheme(<Button>Click me</Button>);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    const expectClasses = classMerge(
      themeMock.button.baseClassName,
      themeMock.button.rounded.md,
      themeMock.button.shadow.md,
      themeMock.button.size.md,
      themeMock.button.color.default
    );
    expect(button).toHaveClass(expectClasses);
  });

  describe("renders with children", () => {
    test("renders with single child node", () => {
      const {getByTestId} = renderWithTheme(
        <Button>
          <i data-testid="test-id" className="fa fas">
            Test
          </i>
        </Button>
      );
      const child = getByTestId("test-id");
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent("Test");
    });

    test("renders with multiple child nodes", () => {
      const {getByTestId} = renderWithTheme(
        <Button>
          <i data-testid="test-id-1" className="fa fas">
            Test
          </i>
          <span data-testid="test-id-2">AbCD</span>
        </Button>
      );
      const child1 = getByTestId("test-id-1");
      expect(child1).toBeInTheDocument();
      expect(child1).toHaveTextContent("Test");

      const child2 = getByTestId("test-id-2");
      expect(child2).toBeInTheDocument();
      expect(child2).toHaveTextContent("AbCD");
    });
  });

  test("renders with role prop", () => {
    const role = "role-test";
    const {getByRole} = renderWithTheme(<Button role={role}>Click me</Button>);
    const button = getByRole(role);
    expect(button).toBeInTheDocument();
  });

  test("renders with extra class name", () => {
    const className = "testClassName";
    const {getByRole} = renderWithTheme(<Button className={className}>Click me</Button>);
    const button = getByRole(themeMock.button.role);
    expect(button).toBeInTheDocument();
    const expectClasses = classMerge(
      themeMock.button.baseClassName,
      themeMock.button.rounded.md,
      themeMock.button.shadow.md,
      themeMock.button.size.md,
      themeMock.button.color.default,
      className
    );
    expect(button).toHaveClass(expectClasses);
  });

  test("renders with label and handles click", () => {
    const onClick = jest.fn();
    const label = "Test Button";
    const {getByRole} = renderWithTheme(<Button onClick={onClick}>{label}</Button>);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe("renders with 'as' prop", () => {
    ["button", "a", "div", "span"].forEach((tag) => {
      it(`renders as <${tag}>`, () => {
        const {container} = renderWithTheme(<Button as={tag as ButtonTag}>Click me</Button>);
        const button = container.getElementsByTagName(tag)[0];
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("renders with 'color' prop", () => {
    ["primary", "secondary", "success", "warning", "danger", "info", "default"].forEach((color) => {
      it(`renders as <${color}>`, () => {
        const {getByRole} = renderWithTheme(<Button color={color as ColorSchema}>Click me</Button>);
        const button = getByRole(themeMock.button.role);
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass(themeMock.button.color[color as ColorSchema]);
      });
    });
  });

  describe("renders with 'size' props", () => {
    ["sm", "md", "lg", "xl", "2xl"].forEach((size) => {
      it(`render as size: <${size}>`, () => {
        const {getByRole} = renderWithTheme(<Button size={size as SizingSchema}>Click me</Button>);
        const button = getByRole(themeMock.button.role);
        expect(button).toHaveClass(themeMock.button.size[size as SizingSchema]);
      });
    });
  });

  describe("renders with 'shadow' props", () => {
    ["sm", "md", "lg", "xl", "2xl"].forEach((size) => {
      it(`render as shadow: <${size}>`, () => {
        const {getByRole} = renderWithTheme(<Button shadow={size as SizingSchema}>Click me</Button>);
        const button = getByRole(themeMock.button.role);
        expect(button).toHaveClass(themeMock.button.shadow[size as SizingSchema]);
      });
    });
  });

  describe("renders with 'rounded' props", () => {
    ["sm", "md", "lg", "xl", "2xl", "full"].forEach((rounded) => {
      it(`render as rounded: <${rounded}>`, () => {
        const {getByRole} = renderWithTheme(<Button rounded={rounded as RoundedSchema}>Click me</Button>);
        const button = getByRole(themeMock.button.role);
        expect(button).toHaveClass(themeMock.button.rounded[rounded as RoundedSchema]);
      });
    });
  });

  describe("renders width disabled props", () => {
    test("renders disabled button with disabled attrribute and disabled class", () => {
      const onClick = jest.fn();
      const {getByRole} = renderWithTheme(<Button onClick={onClick} disabled={true} />);
      const button = getByRole(themeMock.button.role);
      expect(button).toBeDisabled();
      expect(button).toHaveClass("disabled");
    });

    test("does not respond to click when disabled", () => {
      const onClick = jest.fn();
      const {getByRole} = renderWithTheme(<Button onClick={onClick} disabled={true} />);
      const button = getByRole(themeMock.button.role);
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });
});
