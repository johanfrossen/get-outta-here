import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataRow } from "./DataRow";

describe("DataRow", () => {
  it("renders label and value", () => {
    render(<DataRow label="Departure from" value="Barcelona" />);
    expect(screen.getByText("Departure from")).toBeInTheDocument();
    expect(screen.getByText("Barcelona")).toBeInTheDocument();
  });
});
