import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("h-3 w-3 rounded-full inline-block", {
  variants: {
    status: {
      SENDING: "bg-blue-500",
      DELIVERED: "bg-green-500",
      BOUNCED: "bg-red-500",
    },
  },
  defaultVariants: {
    status: "SENDING",
  },
});

interface StatusBadgeProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

export function DeliveryStatusIndicator({
  status,
  className,
}: StatusBadgeProps) {
  return <div className={cn(buttonVariants({ status }), className)}></div>;
}
