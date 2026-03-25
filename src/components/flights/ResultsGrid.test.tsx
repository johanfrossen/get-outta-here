import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResultsGrid } from "./ResultsGrid";

describe("ResultsGrid", () => {
  it("shows empty state before search", () => {
    render(
      <ResultsGrid flights={[]} isLoading={false} hasSearched={false} />,
    );
    expect(
      screen.getByText("Where are you getting outta here to?"),
    ).toBeInTheDocument();
  });

  it("shows skeleton cards when loading", () => {
    const { container } = render(
      <ResultsGrid flights={[]} isLoading={true} hasSearched={true} />,
    );
    const skeletons = container.querySelectorAll(".skeleton-shimmer");
    expect(skeletons.length).toBe(8);
  });

  it("shows no-results message when search yields nothing", () => {
    render(
      <ResultsGrid flights={[]} isLoading={false} hasSearched={true} />,
    );
    expect(screen.getByText(/No flights found/)).toBeInTheDocument();
  });
});
