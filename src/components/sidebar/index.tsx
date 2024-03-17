import { Separator } from "@/components/ui/separator";
import { SIDEBAR_ITEMS } from "./data";
import { SidebarEachLink } from "./each-link";

export function Sidebar() {
  return (
    <div className="group flex flex-col w-64 border-r min-h-dvh fixed top-0 left-0 bg-background z-50">
      <div className="flex items-center px-4 py-4 pl-6">
        <p className="text-xl font-bold">Emailer</p>
      </div>

      <Separator />

      <nav className="grid gap-2 p-2">
        {SIDEBAR_ITEMS.map((item, index) => (
          <SidebarEachLink
            key={item.link}
            index={index}
            item={{ title: item.title, link: item.link, label: item.label }}
          />
        ))}
      </nav>
    </div>
  );
}
