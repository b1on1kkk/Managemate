"use client";

import MenuTitle from "../MenuTitle/MenuTitle";
import Link from "next/link";
import ProjectCard from "../ProjectCard/ProjectCard";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";

import { useState, useEffect } from "react";

import { getProjects } from "@/app/redux/features/projects.slice";

export default function ProjectsList() {
  const projects = useSelector(
    (state: RootState) => state.project_reducer.projects
  );

  const [isMounted, setIsMounted] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isMounted) {
      dispatch(getProjects());
      setIsMounted(false);
    }
  }, [projects, dispatch, isMounted]);

  // if (projects.length > 0) console.log(JSON.parse(projects[0].tasks));

  return (
    <div>
      <MenuTitle>Projects</MenuTitle>
      {projects.length > 0 ? (
        <>
          {projects.map((project, idx) => {
            return (
              <Link
                key={idx}
                href={`/Projects/${project.title.replace(/ /g, "_")}`}
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
  );
}
