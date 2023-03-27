import type z from "zod";
import { T3Action } from "./t3action";
import { useMemo, useRef, useState } from "react";

export function useT3<InputType extends z.ZodTypeAny, ResponseType extends any>(
  action: T3Action<InputType, ResponseType>
) {
  const doAction = useRef(action);
  const [data, setData] = useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = useMemo(
    () => async (input: z.infer<InputType>) => {
      setIsLoading(true);
      const result = await doAction.current(input);
      setData(result);
      setIsLoading(false);
    },
    []
  );

  return { mutate, data, isLoading };
}
