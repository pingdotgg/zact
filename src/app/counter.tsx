"use client";

import { useState } from "react";
import { doDoubling } from "./action";
import { useMutation } from "@tanstack/react-query";
import { t3Test } from "./t3shit/t3action";

export const Counter = () => {
  const [count, setCount] = useState(1);
  const { mutateAsync } = useMutation(["doubling"], t3Test, {});

  return (
    <div className="flex flex-col text-xl gap-4 text-center">
      {count}
      <button onClick={() => mutateAsync({ stuff: "testing" })}>
        Increase
      </button>
    </div>
  );
};
