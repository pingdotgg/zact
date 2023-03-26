"use client";

import { useState } from "react";
import { doDoubling } from "./action";

export const Counter = () => {
  const [count, setCount] = useState(1);

  return (
    <div>
      {count}
      <button
        onClick={async () => {
          console.log("doing work");
          const newVal = await doDoubling(count);
          console.log("that worked", newVal);
          setCount(newVal);
        }}
      >
        Increase
      </button>
    </div>
  );
};
