import Link from "next/link";

interface CardProps {
  title: string;
  zipCode?: string;
  subtitle?: string;
  additionalInfo?: React.ReactNode;
  link?: string;
  linkText?: string;
  children?: React.ReactNode;
  titleClassName?: string;
}

export default function Card({
  title,
  zipCode,
  subtitle,
  additionalInfo,
  link,
  linkText,
  children,
  titleClassName,
}: CardProps) {
  const cardContent = (
    <>
      {children}
      <h2
        className={`text-xl font-semibold mb-2 text-center ${
          titleClassName ?? ""
        }`}
      >
        {title}
      </h2>
      {zipCode && (
        <div className="text-2xl font-extrabold text-primary mb-2 tracking-widest text-center select-all">
          {zipCode}
        </div>
      )}
      {subtitle && (
        <p className="text-muted-foreground text-sm mb-2 text-center">
          {subtitle}
        </p>
      )}
      {additionalInfo && (
        <p className="text-xs text-muted-foreground mb-4 text-center">
          {additionalInfo}
        </p>
      )}
      {link && <span className="sr-only">{linkText ?? "View Details"}</span>}
    </>
  );

  if (link) {
    return (
      <Link
        href={link}
        className="bg-card border border-border rounded-xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={`${title}${
          subtitle ? `, ${subtitle}${zipCode ? `, ${zipCode}` : ""}` : ""
        }`}
      >
        {cardContent}
        <span className="mt-auto text-primary text-sm underline">
          {linkText ?? "View Details →"}
        </span>
      </Link>
    );
  }

  // Informational card, optionally focusable
  return (
    <div
      className="bg-card border border-border rounded-xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-[1.03] hover:shadow-lg"
      tabIndex={0}
      aria-label={`${title}${
        subtitle ? `, ${subtitle}${zipCode ? `, ${zipCode}` : ""}` : ""
      }`}
    >
      {cardContent}
    </div>
  );
}
