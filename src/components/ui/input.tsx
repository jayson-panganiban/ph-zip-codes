import { cn } from "@/lib/utils";
import * as React from "react";

type InputVariant = "default" | "search";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: InputVariant;
}

function Input({ className, type, variant = "default", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Default style
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Search variant
        variant === "search" &&
          "pr-20 pl-6 py-6 text-2xl rounded-3xl shadow-2xl border-2 border-primary bg-background focus:ring-4 focus:ring-primary/30 focus:border-primary transition-all font-semibold placeholder:font-normal placeholder:text-lg outline-none",
        className
      )}
      {...props}
    />
  );
}

export { Input };
