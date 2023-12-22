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
    icon: <LayoutDashboard />
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <Waypoints />
  },
  {
    path: "/timer",
    name: "Timer",
    icon: <Timer />
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: <CalendarDays />
  },
  {
    path: "/statistics",
    name: "Statistics",
    icon: <LineChart />
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <MessageSquare />
  },
  {
    path: "/help",
    name: "Help",
    icon: <HelpCircle />
  },
  {
    path: "/log_out",
    name: "Log out",
    icon: <LogOut />
  }
];
