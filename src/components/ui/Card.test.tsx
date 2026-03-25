import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies dark background styles", () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.firstChild).toHaveClass("bg-card-bg");
  });
});
