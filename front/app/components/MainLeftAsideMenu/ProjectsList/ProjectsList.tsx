"use client";

import Link from "next/link";
import ProjectCard from "../ProjectCard/ProjectCard";

import axios from "axios";

import type { Project } from "@/app/redux/interfaces/projects_interfaces";

import { Trash } from "lucide-react";

interface TProjectsList {
  projects: Project[];
  set_chosen_project: (role: number, chosen_project: number) => void;
}

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { getProjects } from "@/app/redux/features/projects.slice";
import { useRouter } from "next/navigation";
import { deletePrevMembers } from "@/app/redux/features/get_members.slice";

export default function ProjectsList({
  projects,
  set_chosen_project
}: TProjectsList) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  async function DeleteProjectHandler(project_id: number) {
    try {
      await axios.post("http://localhost:2000/delete_project", { project_id });
      dispatch(getProjects(user![0].id));
      dispatch(deletePrevMembers(""));
      router.push("/projects");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="mt-3">
        {projects.length > 0 ? (
          <>
            {projects.map((project, idx) => {
              return (
                <div
                  className="p-2 flex gap-2 border-1 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-200 overflow-hidden mb-3 select-none"
                  key={idx}
                >
                  <Link
                    href={`/projects/${project.title.replace(/ /g, "_")}/tasks`}
                    onClick={() => set_chosen_project(project.role, project.id)}
                    className="flex-1"
                  >
                    <ProjectCard project={project} />
                  </Link>
                  <button
                    className="cursor-pointer p-1 hover:border-red-500 hover:text-red-500"
                    onClick={() => DeleteProjectHandler(project.id)}
                  >
                    <Trash width={20} height={20} />
                  </button>
                </div>
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
