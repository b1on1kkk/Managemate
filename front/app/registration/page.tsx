"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getUser } from "../redux/features/user.slice";
//

export default function Registration() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      axios.post("http://localhost:2000/sing_up", {
        name: name,
        password: password,
        mail: email,
        hash_key: uuidv4()
      });
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      dispatch(getUser());
      router.push("/");
    }, 800);
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <form onSubmit={Submit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="true"
        />

        <button className="px-4 py-2 border-1 rounded-lg hover:bg-indigo-500 hover:text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
