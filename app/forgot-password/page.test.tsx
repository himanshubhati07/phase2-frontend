import { render } from "@testing-library/react";
import { test } from "vitest";
import Page from "./page";

test("renders without crashing", () => {
  render(<Page />);
});
