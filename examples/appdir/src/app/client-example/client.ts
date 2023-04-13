import { createZactClient } from "zact/client";
import { validatedAction, validatedAction2 } from "./actions";

export const client = createZactClient({
  test: validatedAction,
  hello: { world: validatedAction2 },
});
