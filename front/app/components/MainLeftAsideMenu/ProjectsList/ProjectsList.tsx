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
  const user = useSelector((state: RootState) => state.user.user);

  const [isMounted, setIsMounted] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isMounted && user && user.length > 0) {
      dispatch(getProjects(user![0].id));
      setIsMounted(false);
    }
  }, [projects, dispatch, isMounted, user]);

  return (
    <div>
      <MenuTitle>Projects</MenuTitle>
      {projects.length > 0 ? (
        <>
          {projects.map((project, idx) => {
            return (
              <Link
                key={idx}
                href={`/projects/${project.title.replace(/ /g, "_")}/tasks`}
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
