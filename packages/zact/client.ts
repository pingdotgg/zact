"use client";

import type z from "zod";
import type { ZactAction } from "./server";
import { useMemo, useRef, useState } from "react";

export function useZact<
  InputType extends z.ZodTypeAny,
  ResponseType extends any
>(action: ZactAction<InputType, ResponseType>) {
  const doAction = useRef(action);

  const [data, setData] = useState<ResponseType | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [err, setErr] = useState<Error | null>(null);

  const mutate = useMemo(
    () => async (input: z.infer<InputType>) => {
      setIsRunning(true);
      setErr(null);
      setData(null);
      try {
        const result = await doAction.current(input);
        setData(result);
        setIsRunning(false);
      } catch (e) {
        console.log(e);
        setErr(e as Error);
        setIsRunning(false);
      }
    },
    []
  );

  return {
    mutate,
    data,
    isRunning,
    error: err,
  };
}
