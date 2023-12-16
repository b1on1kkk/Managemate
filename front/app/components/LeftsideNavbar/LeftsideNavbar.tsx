"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { UsersRound } from "lucide-react";
import { ASIDE_MENU_NAVBAR } from "../../../constants/AsideMenuNavBar";

import styles from "./LeftsideNavbar.module.scss";

export default function LeftsideNavbar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <aside
      className={`${styles.aside_menu} ${
        isHovered ? styles.menu_expanded : ""
      }`}
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
    >
      <div className="flex">
        <div className="p-3 bg-indigo-500 rounded-3xl">
          <UsersRound color="white" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {ASIDE_MENU_NAVBAR.map((item, idx) => {
          if (item.name !== "Log out") {
            return (
              <Link
                href={item.path}
                key={idx}
                className={`${styles.menu_link} ${
                  (pathname.includes(item.path) && item.path !== "/") ||
                  (pathname === "/" && item.name === "Dashboard")
                    ? styles.menu_link_active
                    : ""
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          }
        })}
      </div>

      <div className="m-3">
        <span className="opacity-60">
          {ASIDE_MENU_NAVBAR[ASIDE_MENU_NAVBAR.length - 1].icon}
        </span>
      </div>
    </aside>
  );
}
