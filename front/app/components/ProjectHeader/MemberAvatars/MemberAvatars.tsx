import type { Member } from "@/app/redux/features/get_members.slice";

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
          {residueMembersArray.map((_, idx) => {
            const item = (
              <div
                className={`w-10 h-10 bg-gray-400 rounded-full border-1 border-white`}
                key={idx}
              />
            );
            return item;
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
