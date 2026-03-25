"use client";

import { useState, useMemo, useRef, type FormEvent } from "react";
import { SearchParams } from "@/types";
import { useAirportSearch, Airport } from "@/hooks/useAirportSearch";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

interface FormErrors {
  from?: string;
  departureDate?: string;
  returnDate?: string;
}

const INPUT_FOCUS =
  "focus:shadow-[0_0_10px_rgba(255,149,149,0.3)] motion-reduce:focus:shadow-none";

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [from, setFrom] = useState("");
  const [fromCode, setFromCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { results: airports, search: searchAirports, clear: clearAirports } = useAirportSearch();

  const isFormValid = useMemo(
    () =>
      from.trim().length > 0 &&
      departureDate.length > 0 &&
      returnDate.length > 0 &&
      returnDate >= departureDate,
    [from, departureDate, returnDate],
  );

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!from.trim()) newErrors.from = "Departure city is required";
    if (!departureDate) newErrors.departureDate = "Departure date is required";
    if (!returnDate) newErrors.returnDate = "Return date is required";
    if (departureDate && returnDate && returnDate < departureDate) {
      newErrors.returnDate = "Return date must be after departure";
    }
    return newErrors;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    onSearch({
      from: from.trim(),
      fromCode,
      departureDate,
      returnDate,
    });
  }

  function handleFromChange(value: string) {
    setFrom(value);
    setFromCode("");
    searchAirports(value);
    setShowDropdown(true);
  }

  function selectAirport(airport: Airport) {
    setFrom(`${airport.city || airport.name} (${airport.code})`);
    setFromCode(airport.code);
    setShowDropdown(false);
    clearAirports();
  }

  const fromInputClass = `bg-transparent border border-accent rounded-card text-accent font-light italic px-[8px] placeholder:text-accent/60 focus:outline-none focus:ring-1 focus:ring-accent transition-shadow ${INPUT_FOCUS}`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Desktop layout */}
      <div className="hidden xl:flex gap-[8px] justify-center items-end">
        <DesktopField label="From" error={errors.from}>
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Add destination"
              value={from}
              onChange={(e) => handleFromChange(e.target.value)}
              onFocus={() => airports.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              aria-label="Departure city"
              autoComplete="off"
              className={`w-[225px] h-[32px] text-[12px] ${fromInputClass}`}
            />
            {showDropdown && airports.length > 0 && (
              <AirportDropdown
                airports={airports}
                onSelect={selectAirport}
                compact
              />
            )}
          </div>
        </DesktopField>

        <DesktopField label="To">
          <input
            type="text"
            value="Any Mediterranean city"
            disabled
            aria-label="Destination"
            className="w-[225px] h-[32px] bg-transparent border border-accent rounded-card text-accent text-[12px] font-light italic px-[8px] opacity-60 cursor-not-allowed"
          />
        </DesktopField>

        <DesktopField label="Leaving date" error={errors.departureDate}>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            aria-label="Departure date"
            className={`w-[225px] h-[32px] text-[12px] ${fromInputClass}`}
          />
        </DesktopField>

        <DesktopField label="Return date" error={errors.returnDate}>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            aria-label="Return date"
            className={`w-[225px] h-[32px] text-[12px] ${fromInputClass}`}
          />
        </DesktopField>

        <button
          type="submit"
          disabled={isLoading}
          className={`h-[32px] px-[24px] bg-accent text-cta-text rounded-card text-[12px] font-light italic cursor-pointer hover:bg-accent/90 disabled:opacity-50 transition-colors ${isFormValid ? "search-btn-pulse" : ""}`}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Mobile layout */}
      <div className="xl:hidden flex flex-col gap-[16px]">
        <MobileField
          label="Where you are getting out from"
          error={errors.from}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Add destination"
              value={from}
              onChange={(e) => handleFromChange(e.target.value)}
              onFocus={() => airports.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              aria-label="Departure city"
              autoComplete="off"
              className={`w-full h-[48px] text-[16px] px-[16px] ${fromInputClass}`}
            />
            {showDropdown && airports.length > 0 && (
              <AirportDropdown airports={airports} onSelect={selectAirport} />
            )}
          </div>
        </MobileField>

        <MobileField label="Destination">
          <input
            type="text"
            value="Any Mediterranean city"
            disabled
            aria-label="Destination"
            className="w-full h-[48px] bg-transparent border border-accent rounded-card text-accent text-[16px] font-light italic px-[16px] opacity-60 cursor-not-allowed"
          />
        </MobileField>

        <MobileField label="Leaving date" error={errors.departureDate}>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            aria-label="Departure date"
            className={`w-full h-[48px] text-[16px] px-[16px] ${fromInputClass}`}
          />
        </MobileField>

        <MobileField label="Returning date" error={errors.returnDate}>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            aria-label="Return date"
            className={`w-full h-[48px] text-[16px] px-[16px] ${fromInputClass}`}
          />
        </MobileField>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full h-[48px] bg-accent text-cta-text rounded-card text-[18px] font-light italic cursor-pointer hover:bg-accent/90 disabled:opacity-50 transition-colors ${isFormValid ? "search-btn-pulse" : ""}`}
        >
          {isLoading ? "Searching..." : "Search flights"}
        </button>
      </div>
    </form>
  );
}

function AirportDropdown({
  airports,
  onSelect,
  compact = false,
}: {
  airports: Airport[];
  onSelect: (a: Airport) => void;
  compact?: boolean;
}) {
  return (
    <div
      className="absolute top-full left-0 right-0 z-50 mt-[4px] bg-background border border-accent/40 rounded-card overflow-hidden shadow-lg"
      role="listbox"
    >
      {airports.map((airport) => (
        <button
          key={airport.code}
          type="button"
          role="option"
          aria-selected={false}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSelect(airport)}
          className={`w-full text-left px-[8px] hover:bg-card-bg transition-colors cursor-pointer ${compact ? "py-[6px]" : "py-[10px]"}`}
        >
          <span className="text-accent text-[12px] font-light italic">
            {airport.code}
          </span>
          <span className="text-text-primary text-[12px] font-light italic ml-[8px]">
            {airport.name}
            {airport.city ? `, ${airport.city}` : ""}
          </span>
          {airport.country && (
            <span className="text-text-muted text-[10px] font-light italic ml-[4px]">
              ({airport.country})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function DesktopField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <span className="text-text-primary text-[12px] font-light italic">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-accent text-[10px]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function MobileField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <span className="text-text-muted text-[16px] font-sans">{label}</span>
      {children}
      {error && (
        <span className="text-accent text-[12px]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
