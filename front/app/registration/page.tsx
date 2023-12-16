"use client";

import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { useState } from "react";

export default function Registration() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      axios.post("http://localhost:2000/sing_up", {
        project_id: 0,
        name: "alex",
        password: password,
        mail: email,
        hash_key: uuidv4()
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={Submit}>
        <div>
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="password"
            id="password"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}
