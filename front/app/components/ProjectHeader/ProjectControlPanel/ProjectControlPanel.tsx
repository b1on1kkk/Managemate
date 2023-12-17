import Link from "next/link";
import { usePathname } from "next/navigation";

import { PanelTop, Layout, ListChecks } from "lucide-react";
import { PROJECT_MENU_ROUTING } from "@/constants/ProjectMenu";

export default function ProjectControlPanel() {
  const pathname = usePathname();
  const splittedArray = pathname.split("/");
  const currentPath = splittedArray[splittedArray.length - 2];

  return (
    <div className="flex px-7 items-center">
      <div className="flex-1 flex gap-10">
        {PROJECT_MENU_ROUTING.map((item, idx) => {
          const lowercaseItem = item.toLowerCase();

          return (
            <Link href={`/projects/${currentPath}/${lowercaseItem}`} key={idx}>
              <div
                className={`py-4 text-base font-medium hover:border-b-2 border-indigo-500 ${
                  pathname.includes(lowercaseItem) ? "border-b-2" : ""
                }`}
              >
                {item}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-3">
        <div className="flex px-3 py-2 rounded-lg text-sm items-center bg-indigo-50 hover:bg-indigo-50 transition-all duration-200 ease-in select-none min-w-90 justify-around">
          <PanelTop color="#6366f1" />
          <span className="text-indigo-500">Board</span>
        </div>

        <div className="flex px-3 py-2 rounded-lg text-sm items-center hover:bg-indigo-50 transition-all duration-200 ease-in select-none min-w-90 justify-around">
          <Layout />
          <span>Table</span>
        </div>

        <div className="flex px-3 py-2 rounded-lg text-sm items-center hover:bg-indigo-50 transition-all duration-200 ease-in select-none min-w-90 justify-around">
          <ListChecks />
          <span>List</span>
        </div>
      </div>
    </div>
  );
}
