"use client";

import WorkTimeStaticstic from "./WorkTimeStaticstic/WorkTimeStaticstic";
import ProjectAddButton from "./ProjectAddButton/ProjectAddButton";
import TeamMembers from "./TeamMembers/TeamMembers";
import ProjectsList from "./ProjectsList/ProjectsList";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function MainLeftAsideMenu() {
  const members = useSelector(
    (state: RootState) => state.members_reducer.members
  );

  return (
    <aside className="h-full w-88 flex flex-col border-r-1 bg-white p-7 overflow-auto gap-12">
      <div className="flex-1 flex flex-col gap-10">
        <ProjectsList />

        {members.length > 0 && <TeamMembers members={members} />}
      </div>

      <div className="flex flex-col gap-10">
        <WorkTimeStaticstic />

        <ProjectAddButton />
      </div>
    </aside>
  );
}
