"use client";

import { useState, type FormEvent } from "react";
import { SearchParams } from "@/types";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

interface FormErrors {
  from?: string;
  departureDate?: string;
  returnDate?: string;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [from, setFrom] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

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
      fromCode: "",
      departureDate,
      returnDate,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Desktop layout: horizontal row */}
      <div className="hidden xl:flex gap-[8px] justify-center items-end">
        <DesktopField
          label="From"
          error={errors.from}
        >
          <input
            type="text"
            placeholder="Add destination"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            aria-label="Departure city"
            className="w-[225px] h-[32px] bg-transparent border border-accent rounded-card text-accent text-[12px] font-light italic px-[8px] placeholder:text-accent/60 focus:outline-none focus:ring-1 focus:ring-accent"
          />
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

        <DesktopField
          label="Leaving date"
          error={errors.departureDate}
        >
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            aria-label="Departure date"
            className="w-[225px] h-[32px] bg-transparent border border-accent rounded-card text-accent text-[12px] font-light italic px-[8px] placeholder:text-accent/60 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </DesktopField>

        <DesktopField
          label="Return date"
          error={errors.returnDate}
        >
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            aria-label="Return date"
            className="w-[225px] h-[32px] bg-transparent border border-accent rounded-card text-accent text-[12px] font-light italic px-[8px] placeholder:text-accent/60 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </DesktopField>

        <button
          type="submit"
          disabled={isLoading}
          className="h-[32px] px-[24px] bg-accent text-cta-text rounded-card text-[12px] font-light italic cursor-pointer hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Mobile layout: stacked vertical */}
      <div className="xl:hidden flex flex-col gap-[16px]">
        <MobileField
          label="Where you are getting out from"
          error={errors.from}
        >
          <input
            type="text"
            placeholder="Add destination"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            aria-label="Departure city"
            className="w-full h-[48px] bg-transparent border border-accent rounded-card text-accent text-[16px] font-light italic px-[16px] placeholder:text-accent/60 focus:outline-none focus:ring-1 focus:ring-accent"
          />
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

        <MobileField
          label="Leaving date"
          error={errors.departureDate}
        >
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            aria-label="Departure date"
            className="w-full h-[48px] bg-transparent border border-accent rounded-card text-accent text-[16px] font-light italic px-[16px] placeholder:text-accent/60 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </MobileField>

        <MobileField
          label="Returning date"
          error={errors.returnDate}
        >
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            aria-label="Return date"
            className="w-full h-[48px] bg-transparent border border-accent rounded-card text-accent text-[16px] font-light italic px-[16px] placeholder:text-accent/60 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </MobileField>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[48px] bg-accent text-cta-text rounded-card text-[18px] font-light italic cursor-pointer hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Searching..." : "Search flights"}
        </button>
      </div>
    </form>
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
      <span className="text-text-muted text-[16px] font-sans">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-accent text-[12px]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
