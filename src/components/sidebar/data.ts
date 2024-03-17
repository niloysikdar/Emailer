import { Send, BarChart3, List, File } from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Sending History",
    icon: List,
    link: "/dashboard/emails",
  },
  {
    title: "Send Email",
    icon: Send,
    link: "/dashboard/send-email",
  },

  {
    title: "Analytics",
    icon: BarChart3,
    link: "/dashboard/analytics",
  },
  {
    title: "Email Templates",
    icon: File,
    link: "/dashboard/templates",
  },
];

export type SidebarItem = (typeof SIDEBAR_ITEMS)[number];
