"use client";

import MenuTitle from "@/app/components/MainLeftAsideMenu/MenuTitle/MenuTitle";
import Link from "next/link";

import { Plus, PanelTop, Layout, ListChecks } from "lucide-react";

import { PROJECT_MENU_ROUTING } from "@/constants/ProjectMenu";

import { usePathname } from "next/navigation";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const splittedArray = pathname.split("/");
  const currentPath = splittedArray[splittedArray.length - 2];

  const fakeArray = new Array(4).fill(0);

  let z_index_counter = 10;

  return (
    <main className="flex-1 flex flex-col">
      <header className="bg-white">
        <div className="px-7 py-7 flex">
          <div className="flex-1 flex gap-3">
            <div className="w-14 h-14 bg-gray-400 rounded-2xl" />
            <div className="flex flex-col justify-between">
              <MenuTitle>Piper Enterprise</MenuTitle>
              <div className="flex items-center gap-6">
                <div className="w-96 h-2 bg-gray-200 rounded-full">
                  <div className="w-20 h-2 bg-indigo-500 rounded-l-full" />
                </div>
                <span className="text-sm text-gray-400 font-semibold">
                  13% complete
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-7">
            <div className="flex -space-x-3">
              {fakeArray.map((_, idx) => {
                const item = (
                  <div
                    className={`w-10 h-10 bg-gray-400 rounded-full border-1 border-white z-${
                      idx === 0 ? z_index_counter - 10 : z_index_counter
                    }`}
                    key={idx}
                  />
                );

                z_index_counter += 10;

                return item;
              })}
              <div
                className={`w-10 h-10 bg-indigo-50 rounded-full border-1 border-indigo-500 z-50 flex justify-center items-center text-sm font-semibold text-indigo-500`}
              >
                +3
              </div>
            </div>

            <div className="px-4 py-3 bg-indigo-500 flex rounded-lg items-center gap-1 text-white text-sm">
              <Plus width={16} height={16} color="white" />
              <span>Add member</span>
            </div>
          </div>
        </div>
        <div className="flex px-7 items-center">
          <div className="flex-1 flex gap-10">
            {PROJECT_MENU_ROUTING.map((item, idx) => {
              const lowercaseItem = item.toLowerCase();

              return (
                <Link
                  href={`/projects/${currentPath}/${lowercaseItem}`}
                  key={idx}
                >
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
      </header>
      {children}
    </main>
  );
}
