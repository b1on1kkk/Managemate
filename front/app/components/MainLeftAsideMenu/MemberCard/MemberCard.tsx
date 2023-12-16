"use client";

import { ChevronDown, Phone, AtSign } from "lucide-react";
import { useState } from "react";

import styles from "./MemberCard.module.scss";

export default function MemberCard() {
  const [click, setClick] = useState<boolean>(false);
  // const currentTime = new Date();

  return (
    <div
      className={`${styles.member_card} ${
        click ? styles.member_card_expanded : ""
      }`}
    >
      <div className="flex gap-2 w-full">
        <div className="h-10 w-10 bg-gray-500 rounded-full"></div>
        <div className="flex flex-col flex-1">
          <span className="">Karen Smith</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs">Online - 08:32:45</span>
          </div>
        </div>
        <button
          className={`mx-1 cursor-pointer ${
            click ? "rotate-180" : ""
          } transition-all duration-200`}
          onClick={() => setClick(!click)}
        >
          <ChevronDown color="#5f6f83" width={20} height={20} />
        </button>
      </div>
      {click && (
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <Phone width={17} height={17} className="opacity-80" />
            <span>+375 29 838 8745</span>
          </div>
          <div className="flex justify-between">
            <AtSign width={17} height={17} className="opacity-80" />
            <span>@b1on1kkk</span>
          </div>
          <button className="py-1 bg-red-500 rounded-lg text-white text-center select-none hover:bg-red-600 transition-all duration-200 ease-in">
            Remove from membership
          </button>
        </div>
      )}
    </div>
  );
}
