import React from "react";

import type { Member } from "@/app/redux/features/get_members.slice";

import MemberCard from "../MemberCard/MemberCard";

interface TTeamMembers {
  members: Member[] | null;
  user_id: number | null;
}

export default function TeamMembers({ members, user_id }: TTeamMembers) {
  return (
    <div>
      <div className="mt-3">
        {members && members.length > 0 && (
          <>
            {members.map((member, idx) => {
              return <MemberCard key={idx} member={member} user_id={user_id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}
