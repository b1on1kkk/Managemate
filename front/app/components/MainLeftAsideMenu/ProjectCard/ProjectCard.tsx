"use client";

import { MoreVertical } from "lucide-react";
import { icons } from "lucide-react";

import type { Project } from "@/app/redux/interfaces/projects_interfaces";

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = icons[project.icon_name as keyof typeof icons];

  return (
    <div className="p-2 flex flex-col gap-2 border-1 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-200 h-12 overflow-hidden justify-between mb-3 select-none">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-lg`}>
          <Icon width={15} height={15} />
        </div>
        <span className={`flex-1`}>{project.title}</span>
        <button className="mr-1 cursor-pointer">
          <MoreVertical width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
