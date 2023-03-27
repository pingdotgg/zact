"use server";

import { z } from "zod";
import { t3 } from "actions/t3action";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const t3Test = t3(z.object({ stuff: z.string().min(6) }))(
  async (input) => {
    console.log("[SERVER]: Received input", input);

    await wait(3000);

    return { message: `hello ${input.stuff}` };
  }
);
