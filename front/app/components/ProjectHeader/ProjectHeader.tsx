import { useEffect, useState } from "react";

// components
import { Plus } from "lucide-react";
import MemberAvatars from "./MemberAvatars/MemberAvatars";
import PersantagePanel from "./PersantagePanel/PersantagePanel";
import ProjectControlPanel from "./ProjectControlPanel/ProjectControlPanel";
//

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { setStatus } from "@/app/redux/features/service.slice";
//

// utils
import { DevideIntoGroups } from "@/app/utils/utils";
import type { Member } from "@/app/redux/interfaces/member_interfaces";
import { FindProjectTitleById } from "@/app/utils/utils";
//

export default function ProjectHeader({ status }: { status: boolean }) {
  const [residueLength, setResidueLength] = useState<number | null>(null);
  const [residueMembersArray, setResidueMembersArray] = useState<Member[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector((state: RootState) => state.members.members);

  const project_id = useSelector(
    (state: RootState) => state.service.project?.chosen_project
  );
  const projects = useSelector(
    (state: RootState) => state.project_reducer.projects
  );

  const [projectTitle, projectIcon] = FindProjectTitleById(
    project_id,
    projects
  );

  useEffect(() => {
    if (members && members.length > 0) {
      const [newArray, residue] = DevideIntoGroups(members);
      setResidueMembersArray(newArray);
      setResidueLength(residue);
    }
  }, [members]);

  return (
    <header className="bg-white">
      <div className="px-7 py-7 flex">
        <PersantagePanel title={projectTitle} project_icon={projectIcon} />
        <div className="flex items-center gap-7">
          <MemberAvatars
            members={members}
            residueLength={residueLength}
            residueMembersArray={residueMembersArray}
          />

          <button
            className="px-4 py-3 bg-indigo-500 flex rounded-lg items-center gap-1 text-white text-sm hover:bg-indigo-600 transition-all duration-200 ease-in"
            onClick={() => dispatch(setStatus(!status))}
          >
            <Plus width={16} height={16} color="white" />
            <span>Add member</span>
          </button>
        </div>
      </div>
      <ProjectControlPanel />
    </header>
  );
}
