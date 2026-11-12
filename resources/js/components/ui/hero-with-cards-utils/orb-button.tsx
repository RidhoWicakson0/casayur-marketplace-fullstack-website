import { cn } from "@/lib/utils";

export const OrbButton = ({ 
  children, 
  className, 
  size = "md",
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: "sm" | "md" }) => {
  return (
    <button
      className={cn(
        "rounded-full bg-emerald-600 font-bold text-white shadow-lg transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95",
        size === "sm" ? "px-4 py-2 text-sm" : "px-8 py-4",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
