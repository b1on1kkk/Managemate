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
    path: "/Projects",
    name: "Projects",
    icon: <Waypoints color="black" />
  },
  {
    path: "/Timer",
    name: "Timer",
    icon: <Timer color="black" />
  },
  {
    path: "/Calendar",
    name: "Calendar",
    icon: <CalendarDays color="black" />
  },
  {
    path: "/Statistics",
    name: "Statistics",
    icon: <LineChart color="black" />
  },
  {
    path: "/Chat",
    name: "Chat",
    icon: <MessageSquare color="black" />
  },
  {
    path: "/Help",
    name: "Help",
    icon: <HelpCircle color="black" />
  },
  {
    path: "/Log_out",
    name: "Log out",
    icon: <LogOut color="black" />
  }
];
