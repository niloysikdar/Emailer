import { Send, BarChart3, List } from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Sending History",
    icon: List,
    link: "/dashboard/emails",
    label: "",
  },
  {
    title: "Send Email",
    icon: Send,
    link: "/dashboard/send-email",
    label: "",
  },

  {
    title: "Analytics",
    icon: BarChart3,
    link: "/dashboard/analytics",
    label: "",
  },
];

export type SidebarItem = (typeof SIDEBAR_ITEMS)[number];
