import type { Member } from "@/app/redux/interfaces/member_interfaces";

import Image from "next/image";

interface TMemberAvatars {
  members: Member[] | null;
  residueLength: number | null;
  residueMembersArray: Member[];
}

export default function MemberAvatars({
  members,
  residueLength,
  residueMembersArray
}: TMemberAvatars) {
  return (
    <div className="flex -space-x-3">
      {members && members.length > 0 && (
        <>
          {residueMembersArray.map((member, idx) => {
            return (
              <div
                className={`w-10 h-10 rounded-full border-1 border-white flex items-center justify-center bg-indigo-500`}
                key={idx}
              >
                <Image
                  src={member.avatar}
                  alt="member_avatar"
                  width={32}
                  height={32}
                  className="mb-1"
                />
              </div>
            );
          })}
        </>
      )}
      {residueLength && residueLength > 0 ? (
        <div
          className={`w-10 h-10 bg-indigo-50 rounded-full border-1 border-indigo-500 z-50 flex justify-center items-center text-sm font-semibold text-indigo-500`}
        >
          +{residueLength}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
