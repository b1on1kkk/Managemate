"use client";

import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function Project() {
  const projects = useSelector(
    (state: RootState) => state.project_reducer.projects
  );

  console.log(projects);

  return <main className="flex-1">Chosen Project</main>;
}
