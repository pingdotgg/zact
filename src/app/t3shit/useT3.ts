import { ZodTypeAny } from "zod";
import { T3Action } from "./t3action";
import { useRef } from "react";

export function useT3<InputType extends ZodTypeAny, ResponseType extends any>(
  action: T3Action<InputType, ResponseType>
) {
  const doAction = useRef(action);

  return { mutate: doAction.current };
}
