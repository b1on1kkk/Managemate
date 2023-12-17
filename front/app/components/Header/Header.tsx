"use client";

import Icon from "../Icon/Icon";

import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getUser } from "@/app/redux/features/user.slice";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  axios.defaults.withCredentials = true;

  const [isMounted, setIsMounted] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isMounted) {
      dispatch(getUser());
      setIsMounted(false);
    }
  }, [user, isMounted, dispatch]);

  return (
    <header className="h-24 border-b-1 px-9 py-6 flex gap-10">
      <div className="flex-1 flex items-center">
        <div className="flex bg-gray-100 px-2 py-3 gap-4 rounded-lg w-80">
          <Icon icon_name="Search" />
          <div>
            <input
              type="text"
              className="bg-gray-100 focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      {user && user.length > 0 ? (
        <>
          <div className="flex gap-5 items-center ml-5">
            <div>
              <Icon icon_name="Settings" />
            </div>
            <div>
              <Icon icon_name="Bell" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
            <div>{user[0].name}</div>
          </div>
        </>
      ) : (
        <div className="flex gap-3">
          <button className="cursor-pointer">
            <Link href="/login">
              <div className="flex p-2">
                <Icon icon_name="LogIn" />
              </div>
            </Link>
          </button>
          <button className="cursor-pointer">
            <Link href="/registration">
              <div className="flex p-2">
                <Icon icon_name="UserPlus" />
              </div>
            </Link>
          </button>
        </div>
      )}
    </header>
  );
}
