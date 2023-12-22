"use client";

import Link from "next/link";
import ProjectCard from "../ProjectCard/ProjectCard";

import type { Project } from "@/app/redux/interfaces/projects_interfaces";

interface TProjectsList {
  projects: Project[];
  set_chosen_project: (role: number, chosen_project: number) => void;
}

export default function ProjectsList({
  projects,
  set_chosen_project
}: TProjectsList) {
  return (
    <>
      <div className="mt-3">
        {projects.length > 0 ? (
          <>
            {projects.map((project, idx) => {
              return (
                <Link
                  key={idx}
                  href={`/projects/${project.title.replace(/ /g, "_")}/tasks`}
                  onClick={() => set_chosen_project(project.role, project.id)}
                >
                  <ProjectCard project={project} />
                </Link>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
