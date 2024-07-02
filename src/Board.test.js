import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

it("should render without crashing", () => {
  render(<Board ncols={2} nrows={2} chanceLightStartsOn={1} />);
});

it("should render match snapshot", () => {
  const { asFragment, debug } = render(
    <Board ncols={2} nrows={2} chanceLightStartsOn={1} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should flip appropriate tiles on click", () => {
  const { getByTestId } = render(
    <Board ncols={2} nrows={2} chanceLightStartsOn={1} />
  );
  const cell = getByTestId("0-0");
  const cellToRight = getByTestId("0-1");
  const cellBelow = getByTestId("1-0");
  const otherCell = getByTestId("1-1");
  expect(cell).toBeInTheDocument();
  expect(cellToRight).toBeInTheDocument();
  expect(cellBelow).toBeInTheDocument();
  expect(otherCell).toBeInTheDocument();

  fireEvent.click(cell);
  expect(cell).not.toHaveClass("Cell-lit");
  expect(cellToRight).not.toHaveClass("Cell-lit");
  expect(cellBelow).not.toHaveClass("Cell-lit");
  expect(otherCell).toHaveClass("Cell-lit");
});
