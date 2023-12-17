"use client";

import axios, { AxiosError } from "axios";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { getUser } from "../redux/features/user.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:2000/login", {
        mail: email,
        password: password
      });
    } catch (error) {
      const axios_error = error as AxiosError;

      return console.log(axios_error.response?.data);
    }

    setTimeout(() => {
      dispatch(getUser());
      router.push("/");
    }, 800);
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <form onSubmit={Submit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="true"
        />

        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="true"
        />

        <button className="px-4 py-2 border-1 rounded-lg hover:bg-indigo-500 hover:text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
