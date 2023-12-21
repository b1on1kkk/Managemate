"use client";

import MainLeftAsideMenu from "../components/MainLeftAsideMenu/MainLeftAsideMenu";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import Loading from "../components/Loading/Loading";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      {user ? (
        <>
          <MainLeftAsideMenu />
          {children}
        </>
      ) : (
        // <Loading />
        <Loading />
      )}
    </>
  );
}
