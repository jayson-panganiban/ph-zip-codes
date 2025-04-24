import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import React, { useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  "aria-label"?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  onClear,
  onKeyDown,
  autoFocus,
  className = "",
  inputClassName = "",
  "aria-label": ariaLabel,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative flex-1 w-full ${className}`}>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        variant="search"
        className={inputClassName}
        aria-label={ariaLabel || placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
      />
      {value && onClear && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute right-14 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground hover:bg-muted"
          onClick={() => {
            onClear();
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
        >
          <X className="w-6 h-6" />
        </Button>
      )}
      <Button
        type="submit"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow"
        aria-label="Search"
        tabIndex={-1}
        disabled
      >
        <Search className="w-6 h-6" />
      </Button>
    </div>
  );
}