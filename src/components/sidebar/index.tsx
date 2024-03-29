import { Separator } from "@/components/ui/separator";
import { SIDEBAR_ITEMS } from "./data";
import { SidebarEachLink } from "./each-link";
import { UserProfile } from "./user-profile";

export function Sidebar() {
  return (
    <div className="group flex flex-col justify-between w-64 border-r min-h-dvh fixed top-0 left-0 bg-background z-50">
      <div>
        <div className="flex items-center px-4 py-4 pl-6">
          <p className="text-xl font-bold">Emailer</p>
        </div>

        <Separator />

        <nav className="grid gap-2 p-2">
          {SIDEBAR_ITEMS.map((item, index) => (
            <SidebarEachLink
              key={item.link}
              index={index}
              item={{ title: item.title, link: item.link }}
            />
          ))}
        </nav>
      </div>

      <div className="pb-4">
        <UserProfile />
      </div>
    </div>
  );
}
