import { Loader2 } from "lucide-react";

export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center ${className}`}>
      <Loader2 className="animate-spin w-8 h-8 text-primary" aria-label="Loading" />
    </span>
  );
}