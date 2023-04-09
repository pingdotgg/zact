import { useZactClient } from "zact/client";
import { validatedAction, validatedAction2 } from "./actions";

export const client = useZactClient({
  test: validatedAction,
  hello: { world: validatedAction2 },
});
