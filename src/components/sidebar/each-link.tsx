"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS, type SidebarItem } from "./data";

export function SidebarEachLink({
  item,
  index,
}: {
  item: Omit<SidebarItem, "icon">;
  index: number;
}) {
  const pathname = usePathname();
  const isActive = pathname.includes(item.link);
  const Icon = SIDEBAR_ITEMS[index].icon;

  return (
    <Link
      key={item.link}
      href={item.link}
      className={cn(
        buttonVariants({ variant: isActive ? "default" : "ghost" }),
        isActive &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start",
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      {item.title}
    </Link>
  );
}
