"use client";

import styles from "./LeftsideNavbar.module.scss";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

// icons
import { UsersRound } from "lucide-react";
//

// constants
import { ASIDE_MENU_NAVBAR } from "../../../constants/AsideMenuNavBar";
//

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { getUser } from "@/app/redux/features/user.slice";
//

export default function LeftsideNavbar() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

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

      <div className="m-3 flex items-center">
        <button
          className="opacity-60"
          onClick={() => {
            axios.post("http://localhost:2000/logout");

            setTimeout(() => {
              dispatch(getUser());
            }, 500);
          }}
        >
          {ASIDE_MENU_NAVBAR[ASIDE_MENU_NAVBAR.length - 1].icon}
        </button>
      </div>
    </aside>
  );
}
