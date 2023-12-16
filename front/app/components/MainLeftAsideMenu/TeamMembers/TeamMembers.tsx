import React from "react";

import MenuTitle from "../MenuTitle/MenuTitle";
import MemberCard from "../MemberCard/MemberCard";

import type { Members } from "@/app/redux/features/project_members.slice";

export default function TeamMembers({ members }: { members: Members[] }) {
  // const fakeArray2 = new Array(2).fill(0);
  return (
    <div>
      <MenuTitle>Team members</MenuTitle>
      <div>
        {members.map((_, idx) => {
          return <MemberCard key={idx} />;
        })}
      </div>
    </div>
  );
}
