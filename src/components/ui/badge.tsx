import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#2563EB]/10 text-[#2563EB]",
        success: "bg-[#22C55E]/10 text-[#16a34a]",
        warning: "bg-[#F59E0B]/10 text-[#d97706]",
        danger: "bg-[#EF4444]/10 text-[#dc2626]",
        accent: "bg-[#14B8A6]/10 text-[#0d9488]",
        secondary: "bg-slate-100 text-slate-600",
        ai: "bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
