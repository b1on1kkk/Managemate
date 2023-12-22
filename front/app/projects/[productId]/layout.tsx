"use client";

import { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getMembers } from "@/app/redux/features/get_members.slice";
import { getTasks } from "@/app/redux/features/get_tasks.slice";
//

// components
import NewMemberModal from "@/app/components/NewMemberModal/NewMemberModal";
import ProjectHeader from "@/app/components/ProjectHeader/ProjectHeader";
//

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const status = useSelector((state: RootState) => state.service.status);

  const dispatch = useDispatch<AppDispatch>();
  const [choosenIdProject, setChoosenIdProject] = useState<number | null>(null);

  const project_id = useSelector((state: RootState) => state.service.project);

  useEffect(() => {
    if (project_id) {
      dispatch(getMembers(project_id.chosen_project!));
      setChoosenIdProject(project_id.chosen_project);
      dispatch(getTasks(project_id.chosen_project!));
    }
  }, [project_id?.chosen_project]);

  return (
    <main className="flex-1 flex flex-col">
      <ProjectHeader status={status} />
      {children}

      <NewMemberModal status={status} project_id={choosenIdProject} />
    </main>
  );
}
