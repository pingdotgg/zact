"use client";

import { validatedAction } from "./action";
import { useZact } from "zact/client";
import { useState } from "react";

export const T3TestComponent = () => {
  const [input, setInput] = useState("");
  const { mutate, data, isRunning, error } = useZact(validatedAction);

  return (
    <div className="flex flex-col text-xl gap-4 text-center w-full md:max-w-xl">
      <input
        type={"text"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-slate-300 text-slate-900"
      />
      <button onClick={() => mutate({ stuff: input })}>
        Run server action
      </button>
      {isRunning && <div>Loading...</div>}
      {error?.message}
      {data?.message}
    </div>
  );
};
