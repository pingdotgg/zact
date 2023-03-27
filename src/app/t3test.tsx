"use client";

import { useState } from "react";
import { doDoubling } from "./action";
import { useMutation } from "@tanstack/react-query";
import { t3Test } from "./t3shit/t3action";
import { useT3 } from "./t3shit/useT3";

export const T3TestComponent = () => {
  const [count, setCount] = useState(1);

  const { mutate } = useT3(t3Test);

  return (
    <div className="flex flex-col text-xl gap-4 text-center">
      {count}
      <button onClick={() => mutate({ stuff: "testtestaet" })}>Increase</button>
    </div>
  );
};
