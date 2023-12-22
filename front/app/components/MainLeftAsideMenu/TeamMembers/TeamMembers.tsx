import type { Member } from "@/app/redux/interfaces/member_interfaces";

import MemberCard from "../MemberCard/MemberCard";

interface TTeamMembers {
  members: Member[] | null;
  user_id: number | null;
  user_role: number;
}

export default function TeamMembers({
  members,
  user_id,
  user_role
}: TTeamMembers) {
  return (
    <div>
      <div className="mt-3">
        {members && members.length > 0 && (
          <>
            {members.map((member, idx) => {
              return (
                <MemberCard
                  key={idx}
                  member={member}
                  user_id={user_id}
                  user_role={user_role}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
