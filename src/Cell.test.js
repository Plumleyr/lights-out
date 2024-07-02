import { render } from "@testing-library/react";
import Cell from "./Cell";

it("should render without crashing", () => {
  render(<Cell isLit={true} />);
});

it("should match snapshot", () => {
  const { asFragment } = render(<Cell isLit={true} />);
  expect(asFragment()).toMatchSnapshot();
});
