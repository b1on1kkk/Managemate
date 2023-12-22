"use client";

import { icons } from "lucide-react";
import type { Project } from "@/app/redux/interfaces/projects_interfaces";

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = icons[project.icon_name as keyof typeof icons];

  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="p-2 rounded-lg bg-indigo-500 text-white">
        <Icon width={15} height={15} />
      </div>
      <span className={`flex-1`}>{project.title}</span>
    </div>
  );
}
