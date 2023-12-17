"use client";

import axios from "axios";
import { useState } from "react";

import styles from "./MemberCard.module.scss";

// redux
import { Member } from "@/app/redux/features/get_members.slice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getMembers } from "@/app/redux/features/get_members.slice";
//

import { ChevronDown, Phone, AtSign } from "lucide-react";

interface TMemberCard {
  member: Member;
  user_id: number | null;
}

export default function MemberCard({ member, user_id }: TMemberCard) {
  const [click, setClick] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const project_id = useSelector(
    (state: RootState) => state.service.chosen_project
  );

  async function RemoveUserFromMemberShip(user_id: number, project_id: number) {
    try {
      await axios.post("http://localhost:2000/remove_collaborate", {
        user_id: user_id,
        project_id: project_id
      });
      dispatch(getMembers(project_id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`${styles.member_card} ${
        click ? styles.member_card_expanded : ""
      }`}
    >
      <div className="flex gap-2 w-full">
        <div className="h-10 w-10 bg-gray-400 rounded-full"></div>
        <div className="flex flex-col flex-1">
          {user_id === member.id ? (
            <span>
              {member.name}{" "}
              <span className="text-xs font-semibold decoration-1 underline underline-offset-2">
                You
              </span>
            </span>
          ) : (
            <span className="">{member.name}</span>
          )}
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs">Online - 08:32:45</span>
          </div>
        </div>
        <button
          className={`mx-1 cursor-pointer ${
            click ? "rotate-180" : ""
          } transition-all duration-200`}
          onClick={() => setClick(!click)}
        >
          <ChevronDown color="#5f6f83" width={20} height={20} />
        </button>
      </div>
      {click && (
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <Phone width={17} height={17} className="opacity-80" />
            <span>{member.mail}</span>
          </div>
          <div className="flex justify-between">
            <AtSign width={17} height={17} className="opacity-80" />
            <span>@b1on1kkk</span>
          </div>
          {user_id !== member.id ? (
            <button
              className="py-1 bg-red-500 rounded-lg text-white text-center select-none hover:bg-red-600 transition-all duration-200 ease-in"
              onClick={() => {
                RemoveUserFromMemberShip(member.id, project_id!);
              }}
            >
              Remove from membership
            </button>
          ) : (
            <button className="py-1 bg-green-500 rounded-lg text-white text-center select-none hover:bg-green-600 transition-all duration-200 ease-in">
              Go to profile
            </button>
          )}
        </div>
      )}
    </div>
  );
}
