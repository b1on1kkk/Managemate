"use client";

import { useState, useEffect } from "react";

// components
import WorkTimeStaticstic from "./WorkTimeStaticstic/WorkTimeStaticstic";
import ProjectAddButton from "./ProjectAddButton/ProjectAddButton";
import TeamMembers from "./TeamMembers/TeamMembers";
import ProjectsList from "./ProjectsList/ProjectsList";
import Loading from "../Loading/Loading";
import MenuTitle from "./MenuTitle/MenuTitle";
//

// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getProjects } from "@/app/redux/features/projects.slice";
import { setProject } from "@/app/redux/features/service.slice";
//

import type { Users } from "@/app/redux/interfaces/users_interfaces";

export default function MainLeftAsideMenu() {
  const [isMounted, setIsMounted] = useState(true);
  const [userState, setUserState] = useState<Users[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const members = useSelector((state: RootState) => state.members.members);
  const members_pending = useSelector(
    (state: RootState) => state.members.pending
  );

  const projects = useSelector(
    (state: RootState) => state.project_reducer.projects
  );
  const project_pending = useSelector(
    (state: RootState) => state.project_reducer.pending
  );
  const project_service_data = useSelector(
    (state: RootState) => state.service.project
  );

  console.log(members);

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (isMounted && user && user.length > 0) {
      dispatch(getProjects(user[0].id));
      setUserState(user);
      setIsMounted(false);
    }
  }, [projects, dispatch, isMounted, user]);

  return (
    <aside className="h-full w-88 flex flex-col border-r-1 bg-white p-7 overflow-auto gap-12">
      <div className="flex-1 flex flex-col gap-10">
        <div>
          <MenuTitle>Projects</MenuTitle>
          {project_pending === "pending" ? (
            <Loading />
          ) : (
            <ProjectsList
              projects={projects}
              set_chosen_project={(role, chosen_project) =>
                dispatch(setProject({ role, chosen_project }))
              }
            />
          )}
        </div>

        {project_service_data && project_service_data.chosen_project && (
          <div>
            <MenuTitle>Team members</MenuTitle>
            {members_pending === "pending" ? (
              <Loading />
            ) : (
              <>
                {userState.length > 0 && (
                  <TeamMembers
                    members={members}
                    user_id={userState[0].id}
                    user_role={project_service_data.role}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-10">
        <WorkTimeStaticstic />

        <ProjectAddButton />
      </div>
    </aside>
  );
}
