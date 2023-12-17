"use client";

import { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getMembers } from "@/app/redux/features/get_members.slice";
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
  const [isMounted, setIsMounted] = useState(true);
  const status = useSelector((state: RootState) => state.service.status);
  const dispatch = useDispatch<AppDispatch>();
  const [choosenIdProject, setChoosenIdProject] = useState<number | null>(null);

  const project_id = useSelector(
    (state: RootState) => state.service.chosen_project
  );

  useEffect(() => {
    if (isMounted) {
      dispatch(getMembers(project_id!));
      setChoosenIdProject(project_id);
      setIsMounted(false);
    }
  }, [isMounted, dispatch, project_id]);

  return (
    <main className="flex-1 flex flex-col">
      <ProjectHeader status={status} />
      {children}

      <NewMemberModal status={status} project_id={choosenIdProject} />
    </main>
  );
}
