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

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<Error | null>(null);

  const mutate = useMemo(
    () => async (input: z.infer<InputType>) => {
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
    },
    []
  );

  return {
    mutate,
    data,
    isLoading,
    error: err,
  };
}
