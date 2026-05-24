import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1d4ed8] hover:shadow-xl hover:-translate-y-0.5",
        secondary: "bg-[#0F172A] text-white hover:bg-[#1e293b]",
        outline: "border border-slate-200 bg-white/80 backdrop-blur hover:bg-slate-50 hover:border-slate-300",
        ghost: "hover:bg-slate-100/80",
        destructive: "bg-[#EF4444] text-white hover:bg-red-600",
        accent: "bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/25 hover:bg-teal-600",
        glass: "bg-white/60 backdrop-blur-md border border-white/40 shadow-sm hover:bg-white/80",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
