"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SIDEBAR_ITEMS } from "../sidebar/data";

export function TopTitleBar() {
  const pathname = usePathname();
  const title = SIDEBAR_ITEMS.find((item) =>
    pathname.includes(item.link),
  )?.title;

  return (
    <div className="w-full fixed top-0 left-64 z-50 bg-background">
      <div className="flex items-center px-4 py-4 pl-8 w-full">
        <p className="text-xl font-semibold">{title}</p>
      </div>

      <Separator />
    </div>
  );
}
