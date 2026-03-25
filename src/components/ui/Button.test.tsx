import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with children text", () => {
    render(<Button>Book: Barcelona</Button>);
    expect(screen.getByText("Book: Barcelona")).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-accent");
  });

  it("applies outline variant", () => {
    render(<Button variant="outline">Click me</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-accent");
  });
});
