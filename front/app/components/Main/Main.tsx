"use client";

import Header from "../Header/Header";

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
//

export default function Main({ children }: { children: React.ReactNode }) {
  const status = useSelector((state: RootState) => state.service.status);

  return (
    <main
      className={`pl-16 flex h-full ${status ? "z-[100]" : "z-10"} relative`}
    >
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-auto bg-gray-100 flex">{children}</div>
      </div>
    </main>
  );
}
