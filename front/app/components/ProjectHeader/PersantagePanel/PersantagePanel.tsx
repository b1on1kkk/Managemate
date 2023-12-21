"use client";
import { useEffect, useState } from "react";

// components
import MenuTitle from "../../MainLeftAsideMenu/MenuTitle/MenuTitle";
//

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
//

// utils
import { DoneProjectsCounter } from "@/app/utils/utils";
//

export default function PersantagePanel({ title }: { title: string }) {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [persantage, setPersantage] = useState<string>("");

  useEffect(() => {
    setPersantage(DoneProjectsCounter(tasks));
  }, [tasks]);

  console.log(persantage);

  return (
    <div className="flex-1 flex gap-3">
      <div className="w-14 h-14 bg-gray-400 rounded-2xl" />
      <div className="flex flex-col justify-between">
        <MenuTitle>{title}</MenuTitle>
        <div className="flex items-center gap-6">
          <div className="w-100 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-indigo-500 rounded-full transition-all duration-200"
              style={{
                width: `${
                  parseInt(persantage !== "NaN" ? persantage : "0") * 4
                }px`
              }}
            />
          </div>
          <span className="text-sm text-gray-400 font-semibold transition-all duration-200">
            {persantage !== "NaN" ? persantage : "0"}% complete
          </span>
        </div>
      </div>
    </div>
  );
}
