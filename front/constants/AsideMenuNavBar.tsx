import {
  LayoutDashboard,
  Waypoints,
  Timer,
  CalendarDays,
  LineChart,
  MessageSquare,
  HelpCircle,
  LogOut
} from "lucide-react";

interface T_ASIDE_MENU_NAVBAR {
  path: string;
  name: string;
  icon: JSX.Element;
}

export const ASIDE_MENU_NAVBAR: T_ASIDE_MENU_NAVBAR[] = [
  {
    path: "/",
    name: "Dashboard",
    icon: <LayoutDashboard color="black" />
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <Waypoints color="black" />
  },
  {
    path: "/timer",
    name: "Timer",
    icon: <Timer color="black" />
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: <CalendarDays color="black" />
  },
  {
    path: "/statistics",
    name: "Statistics",
    icon: <LineChart color="black" />
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <MessageSquare color="black" />
  },
  {
    path: "/help",
    name: "Help",
    icon: <HelpCircle color="black" />
  },
  {
    path: "/log_out",
    name: "Log out",
    icon: <LogOut color="black" />
  }
];
