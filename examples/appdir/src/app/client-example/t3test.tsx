"use client";

import { client } from "./client";
import { useZact } from "zact/client";
import { useState } from "react";

export const T3TestComponent = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const action1 = client.test();
  const action2 = client.hello.world();

  return (
    <div className="flex flex-row gap-8 h-full justify-center items-center flex-1">
      <div className="flex flex-col text-xl gap-4 text-center w-full md:max-w-xl">
        <input
          type={"text"}
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="bg-slate-300 text-slate-900"
        />
        <button onClick={() => action1.mutate({ stuff: input1 })}>
          Run server action 1
        </button>
        {action1.isRunning && <div>Loading...</div>}
        {action1.error?.message}
        {action1.data?.message}
      </div>
      <div className="flex flex-col text-xl gap-4 text-center w-full md:max-w-xl">
        <input
          type={"text"}
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          className="bg-slate-300 text-slate-900"
        />
        <button onClick={() => action2.mutate({ stuff: input2 })}>
          Run server action 2
        </button>
        {action2.isRunning && <div>Loading...</div>}
        {action2.error?.message}
        {action2.data?.message}
      </div>
    </div>
  );
};
