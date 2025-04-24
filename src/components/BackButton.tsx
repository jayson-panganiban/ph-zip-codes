"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export default function BackButton({ className }: BackButtonProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`font-satoshi flex items-center gap-2 text-primary font-regular hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded px-2 py-4 ${
        className ?? ""
      }`}
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
