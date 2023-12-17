"use client";

import { MoreVertical, Pencil, Trash } from "lucide-react";

import styles from "./ProjectCard.module.scss";
import { useState } from "react";

import { icons } from "lucide-react";

import { Project } from "@/app/redux/features/projects.slice";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";

// import { getProjectMembers } from "@/app/redux/features/user.slice";

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = icons[project.icon_name as keyof typeof icons];

  const [hovered, setHovered] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  function getMembers() {
    // dispatch(getProjectMembers(project.user_id.toString()));
  }

  return (
    <div
      className={`${styles.project_card} ${
        false ? styles.project_card_expanded : ""
      }`}
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
    >
      <div className="flex items-center gap-2" onClick={getMembers}>
        <div
          className={`p-2 ${hovered ? "bg-white" : "bg-sky-100"}  rounded-lg`}
        >
          <Icon width={15} height={15} />
        </div>
        <span className={`flex-1 ${hovered ? "text-white" : ""}`}>
          {project.title}
        </span>
        <button
          className="mr-1 cursor-pointer"
          // onClick={() => setClick(!click)}
        >
          <MoreVertical
            width={20}
            height={20}
            color={hovered ? "white" : "#5f6f83"}
          />
        </button>
      </div>
      {/* {click && (
        <div className="flex gap-2 text-sm items-center">
          <div className={`flex-1 ${hovered ? "text-white" : ""}`}>
            Project settings:
          </div>

          <button className="px-2 py-2 rounded-lg border-1 hover:bg-green-600 transition-all duration-200 ease-in border-green-500">
            <Pencil
              height={13}
              width={13}
              color={hovered ? "white" : "black"}
            />
          </button>

          <button
            className="px-2 py-2 rounded-lg border-1 hover:bg-red-600 transition-all duration-200 ease-in border-red-500"
            // onClick={() => dispatch(removeProject(id))}
          >
            <Trash height={13} width={13} color={hovered ? "white" : "black"} />
          </button>
        </div>
      )} */}
    </div>
  );
}
