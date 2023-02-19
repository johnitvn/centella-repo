import {classMerge, SizingSchema, RoundedSchema} from "@centella/react-tw-core";
import {Theme, ThemeProvider} from "@centella/react-tw-core";
import {render} from "@testing-library/react";
import React from "react";
import {ReactNode} from "react";
import {themeMock} from "../../../themeMock";
import {Card} from "./Card";

const renderWithTheme = (elm: ReactNode) => render(<ThemeProvider value={themeMock as Theme}> {elm} </ThemeProvider>);

describe.only("Card Component", () => {
  test("renders default card", () => {
    const {getByTestId} = renderWithTheme(<Card data-testid="card-test">Card Content</Card>);
    const card = getByTestId("card-test");
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent("Card Content");
    const expectClasses = classMerge(
      themeMock.card.baseClassName,
      themeMock.card.rounded.md,
      themeMock.card.shadow.md,
      themeMock.card.color.default
    );
    expect(card).toHaveClass(expectClasses);
  });

  describe("renders with children", () => {
    test("renders with single child node", () => {
      const {getByTestId} = renderWithTheme(
        <Card>
          <i data-testid="test-id" className="fa fas">
            Test
          </i>
        </Card>
      );
      const child = getByTestId("test-id");
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent("Test");
    });

    test("renders with multiple child nodes", () => {
      const {getByTestId} = renderWithTheme(
        <Card>
          <i data-testid="test-id-1" className="fa fas">
            Test
          </i>
          <span data-testid="test-id-2">AbCD</span>
        </Card>
      );
      const child1 = getByTestId("test-id-1");
      expect(child1).toBeInTheDocument();
      expect(child1).toHaveTextContent("Test");

      const child2 = getByTestId("test-id-2");
      expect(child2).toBeInTheDocument();
      expect(child2).toHaveTextContent("AbCD");
    });
  });

  test("renders with extra class name", () => {
    const className = "testClassName";
    const {getByTestId} = renderWithTheme(<Card data-testid="card-test" className={className}></Card>);
    const card = getByTestId("card-test");
    expect(card).toBeInTheDocument();
    const expectClasses = classMerge(
      themeMock.card.baseClassName,
      themeMock.card.rounded.md,
      themeMock.card.shadow.md,
      themeMock.card.color.default,
      className
    );
    expect(card).toHaveClass(expectClasses);
  });

  describe("renders with 'shadow' props", () => {
    ["sm", "md", "lg", "xl", "2xl"].forEach((size) => {
      it(`render as shadow: <${size}>`, () => {
        const {getByTestId} = renderWithTheme(<Card data-testid="test" shadow={size as SizingSchema}></Card>);
        const card = getByTestId("test");
        expect(card).toHaveClass(themeMock.card.shadow[size as SizingSchema]);
      });
    });
  });

  describe("renders with 'rounded' props", () => {
    ["sm", "md", "lg", "xl", "2xl", "full"].forEach((rounded) => {
      it(`render as rounded: <${rounded}>`, () => {
        const {getByTestId} = renderWithTheme(
          <Card data-testid="test" rounded={rounded as SizingSchema | "full"}></Card>
        );
        const card = getByTestId("test");
        expect(card).toHaveClass(themeMock.button.rounded[rounded as RoundedSchema]);
      });
    });
  });
});
