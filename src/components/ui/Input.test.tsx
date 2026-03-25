import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="From" placeholder="Add destination" />);
    expect(screen.getAllByText("From").length).toBeGreaterThan(0);
  });

  it("renders with placeholder", () => {
    render(<Input label="From" placeholder="Add destination" />);
    expect(screen.getByPlaceholderText("Add destination")).toBeInTheDocument();
  });

  it("generates id from label", () => {
    render(<Input label="Leaving date" />);
    const input = screen.getByRole("textbox");
    expect(input.id).toBe("leaving-date");
  });
});
