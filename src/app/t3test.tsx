"use client";

import { t3Test } from "./action";
import { useT3 } from "../t3-package/useT3";

export const T3TestComponent = () => {
  const { mutate, data, isLoading } = useT3(t3Test);

  return (
    <div className="flex flex-col text-xl gap-4 text-center">
      <button onClick={() => mutate({ stuff: "testtestaet" })}>
        Run server action
      </button>
      {isLoading && <div>Loading...</div>}
      {data?.message}
    </div>
  );
};
