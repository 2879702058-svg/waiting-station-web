import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "quiet";
  type?: "button" | "submit";
};

export function Button({ children, onClick, variant = "primary", type = "button" }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}

export function Notice({ children }: { children: ReactNode }) {
  return <aside className="notice">{children}</aside>;
}

export function Chip({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" className={`chip ${selected ? "chip-selected" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
