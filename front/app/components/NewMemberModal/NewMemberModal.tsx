import axios from "axios";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { setStatus } from "@/app/redux/features/service.slice";
import { getAllUser } from "@/app/redux/features/get_all_users.slice";
import { getMembers } from "@/app/redux/features/get_members.slice";
//

// utils
import { FindUser } from "@/app/utils/utils";
//

export default function NewMemberModal({
  status,
  project_id
}: {
  status: boolean;
  project_id: number | null;
}) {
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.get_all_users.users);
  const user = useSelector((state: RootState) => state.user.user);
  const members = useSelector((state: RootState) => state.members.members);

  useEffect(() => {
    if (isMounted) {
      dispatch(getAllUser());
      setIsMounted(false);
    }
  }, [dispatch, users, isMounted]);

  async function RequestToCollaborate(user_id: number, project_id: number) {
    try {
      await axios.post("http://localhost:2000/collaborate", {
        user_id: user_id,
        project_id: project_id,
        role: false
      });

      dispatch(getMembers(project_id));
    } catch (error) {
      return console.log(error);
    }
  }

  return (
    <>
      {status && (
        <div className="flex h-screen w-screen absolute top-0 left-0 justify-center items-center bg-modal_background backdrop-blur-sm z-[100]">
          <div className="text-white w-88 h-96 bg-white p-4 overflow-auto rounded-lg drop-shadow-md">
            {users && users.length > 0 && (
              <>
                {users.map((user_inf, idx) => {
                  return (
                    <div
                      key={idx}
                      className="text-black flex items-center mb-3 gap-3 p-2 hover:bg-gray-200 transition-all duration-200 ease-in rounded-lg"
                    >
                      <div className="w-10 h-10 bg-gray-400 rounded-full" />
                      <div className="flex flex-col flex-1 truncate">
                        <span>{user_inf.name}</span>
                        <span className="text-sm text-gray-400">
                          {user_inf.mail}
                        </span>
                      </div>
                      {user![0].id === user_inf.id ? (
                        <button className="px-3 py-2 rounded-lg text-sm border-1 transition-all duration-200 ease-in text-black min-w-70 border-gray-400">
                          You
                        </button>
                      ) : members && FindUser(members, user_inf) ? (
                        <button className="px-3 py-2 rounded-lg text-sm border-1 transition-all duration-200 ease-in text-black min-w-70 border-gray-400">
                          Added
                        </button>
                      ) : (
                        <button
                          className="px-3 py-2 bg-indigo-500 rounded-lg text-white text-sm hover:bg-indigo-600 transition-all duration-200 ease-in min-w-70"
                          onClick={() =>
                            RequestToCollaborate(user_inf.id, project_id!)
                          }
                        >
                          Add
                        </button>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <button
            className="absolute right-0 top-0 m-4 p-3"
            onClick={() => dispatch(setStatus(!status))}
          >
            <X color="white" />
          </button>
        </div>
      )}
    </>
  );
}
