"use server";

import { z } from "zod";
import { zact } from "zact/server";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const validatedAction = zact(z.object({ stuff: z.string().min(6) }))(
  async (input) => {
    console.log("[SERVER]: Received input", input);

    await wait(3000);

    return { message: `hello ${input.stuff}` };
  }
);
