"use client";

import { Aperture } from "lucide-react";

import { ASIDE_MENU_NAVBAR } from "../../constants/AsideMenuNavBar";

import Link from "next/link";

import styles from "./LeftsideNavbar.module.scss";

import { usePathname } from "next/navigation";

export default function LeftsideNavbar() {
  const pathname = usePathname();

  return (
    <aside className="h-full fixed top-0 bottom-0 left-0 p-6 flex flex-col items-center gap-16 bg-white border-r-1">
      <div className="p-4 bg-indigo-500 rounded-3xl">
        <Aperture color="white" />
      </div>

      <div className="flex-1 flex flex-col gap-6 w-full items-center">
        {ASIDE_MENU_NAVBAR.map((item, idx) => {
          if (item.name !== "Log out") {
            return (
              <Link
                href={item.path}
                key={idx}
                className={
                  pathname === item.path
                    ? styles.menu_icon_active
                    : styles.menu_icon
                }
              >
                <span>{item.icon}</span>
              </Link>
            );
          }
        })}
      </div>

      <div className="mb-2">
        <span className="opacity-40">
          {ASIDE_MENU_NAVBAR[ASIDE_MENU_NAVBAR.length - 1].icon}
        </span>
      </div>
    </aside>
  );
}
