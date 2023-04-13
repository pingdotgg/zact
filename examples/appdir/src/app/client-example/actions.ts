"use server";

import { z } from "zod";
import { initZact } from "zact/server";

const config = {
  middleware: () => {
    // Small chance of error
    if (Math.random() > 0.8) {
      throw Error("Random Failure");
    }
    return { random: Math.random() > 0.5 };
  },
};
const { zact } = initZact(config);

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const validatedAction = zact(z.object({ stuff: z.string().min(6) }))(
  async (input, ctx) => {
    console.log("[SERVER]: Received input", input);
    console.log("[SERVER]: Context is", ctx);

    await wait(3000);

    return { message: `test ${input.stuff}` };
  }
);

export const validatedAction2 = zact(z.object({ stuff: z.string().min(6) }))(
  async (input, ctx) => {
    console.log("[SERVER]: Received input", input);
    console.log("[SERVER]: Context is", ctx);

    await wait(3000);

    return { message: `hello ${input.stuff}` };
  }
);
