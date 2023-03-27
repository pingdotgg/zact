"use client";

import { t3Test } from "./action";
import { useT3 } from "actions/useT3";
import { useState } from "react";

export const T3TestComponent = () => {
  const [input, setInput] = useState("");
  const { mutate, data, isLoading, error } = useT3(t3Test);

  return (
    <div className="flex flex-col text-xl gap-4 text-center">
      <input
        type={"text"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-slate-300 text-slate-900"
      />
      <button onClick={() => mutate({ stuff: input })}>
        Run server action
      </button>
      {isLoading && <div>Loading...</div>}
      {error?.message}
      {data?.message}
    </div>
  );
};
