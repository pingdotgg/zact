"use client";

import type z from "zod";
import type { ZactAction } from "./server";
import { useCallback, useRef, useState } from "react";

export function useZact<
  InputType extends z.ZodTypeAny,
  ResponseType extends any
>(action: ZactAction<InputType, ResponseType>) {
  const doAction = useRef(action);

  const [data, setData] = useState<ResponseType | null>(null);

  const [isRunning, setIsLoading] = useState(false);
  const [err, setErr] = useState<Error | null>(null);

  const mutate = useCallback(async (input: z.infer<InputType>) => {
    setIsLoading(true);
    setErr(null);
    setData(null);
    try {
      const result = await doAction.current(input);
      setData(result);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setErr(e as Error);
      setIsLoading(false);
    }
  }, []);

  return {
    mutate,
    data,
    isRunning,
    error: err,
  };
}
