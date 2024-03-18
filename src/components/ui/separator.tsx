"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

export const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}) => {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  );
};
