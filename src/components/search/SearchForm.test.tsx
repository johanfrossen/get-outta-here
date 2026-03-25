import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchForm } from "./SearchForm";

// Mock the airport search hook
vi.mock("@/hooks/useAirportSearch", () => ({
  useAirportSearch: () => ({
    results: [],
    isLoading: false,
    search: vi.fn(),
    clear: vi.fn(),
  }),
}));

describe("SearchForm", () => {
  it("renders all input fields", () => {
    render(<SearchForm onSearch={vi.fn()} isLoading={false} />);
    expect(screen.getAllByLabelText("Departure city").length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText("Destination").length).toBeGreaterThan(0);
    expect(
      screen.getAllByLabelText("Departure date").length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByLabelText("Return date").length).toBeGreaterThan(0);
  });

  it("shows validation errors on empty submit", () => {
    render(<SearchForm onSearch={vi.fn()} isLoading={false} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
  });

  it("disables destination field", () => {
    render(<SearchForm onSearch={vi.fn()} isLoading={false} />);
    const destInputs = screen.getAllByLabelText("Destination");
    destInputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("calls onSearch with valid form data", () => {
    const onSearch = vi.fn();
    render(<SearchForm onSearch={onSearch} isLoading={false} />);

    const cityInputs = screen.getAllByLabelText("Departure city");
    fireEvent.change(cityInputs[0], { target: { value: "Stockholm" } });

    const departureInputs = screen.getAllByLabelText("Departure date");
    fireEvent.change(departureInputs[0], { target: { value: "2026-06-15" } });

    const returnInputs = screen.getAllByLabelText("Return date");
    fireEvent.change(returnInputs[0], { target: { value: "2026-06-22" } });

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(onSearch).toHaveBeenCalledWith({
      from: "Stockholm",
      fromCode: "",
      fromSkyId: "",
      fromEntityId: "",
      departureDate: "2026-06-15",
      returnDate: "2026-06-22",
    });
  });

  it("validates return date is after departure date", () => {
    render(<SearchForm onSearch={vi.fn()} isLoading={false} />);

    const cityInputs = screen.getAllByLabelText("Departure city");
    fireEvent.change(cityInputs[0], { target: { value: "Stockholm" } });

    const departureInputs = screen.getAllByLabelText("Departure date");
    fireEvent.change(departureInputs[0], { target: { value: "2026-06-22" } });

    const returnInputs = screen.getAllByLabelText("Return date");
    fireEvent.change(returnInputs[0], { target: { value: "2026-06-15" } });

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(
      screen.getAllByText("Return date must be after departure").length,
    ).toBeGreaterThan(0);
  });
});
