"use client";
import { useEffect, useState } from "react";

// components
import MenuTitle from "../../MainLeftAsideMenu/MenuTitle/MenuTitle";
import Icon from "../../Icon/Icon";
//

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
//

// utils
import { DoneProjectsCounter } from "@/app/utils/utils";
//

export default function PersantagePanel({
  title,
  project_icon
}: {
  title: string | undefined;
  project_icon: string | undefined;
}) {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [persantage, setPersantage] = useState<string>("");

  useEffect(() => {
    setPersantage(DoneProjectsCounter(tasks));
  }, [tasks]);

  return (
    <div className="flex-1 flex gap-3">
      <div className="p-5 bg-sky-100 rounded-2xl">
        <Icon icon_name={project_icon ? project_icon : "HelpCircle"} />
      </div>
      <div className="flex flex-col justify-between">
        <MenuTitle>
          {title ? title : "Choose project to see its name"}
        </MenuTitle>
        <div className="flex items-center gap-6">
          <div className="w-100 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-indigo-500 rounded-full transition-all duration-200"
              style={{
                width: `${
                  parseInt(
                    persantage !== "NaN" && persantage !== "" ? persantage : "0"
                  ) * 4
                }px`
              }}
            />
          </div>
          <span className="text-sm text-gray-400 font-semibold transition-all duration-200">
            {persantage !== "NaN" && persantage !== "" ? persantage : "0"}%
            complete
          </span>
        </div>
      </div>
    </div>
  );
}
