import React from "react";

interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  icon,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center mb-6 ${className}`}>
      {icon && <div className="mb-4">{icon}</div>}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-balance mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="font-inter text-lg text-muted-foreground mb-4 text-center max-w-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
