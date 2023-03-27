"use server";
import z from "zod";

function t3<T extends z.ZodTypeAny>(validator?: T) {
  // This is the "factory" that is created on call of t3. You pass it a "use server" function and it will validate the input before you call it
  return function (action: (input: z.infer<T>) => Promise<unknown>) {
    // The wrapper that actually validates
    return async (input: z.infer<T>) => {
      if (validator) {
        const result = validator.safeParse(input);
        if (!result.success) throw new Error("invalid input");
      }
      return await action(input);
    };
  };
}

export const t3Test = t3(z.object({ stuff: z.string().min(6) }))(
  async (input) => {
    console.log("doing server things", input);
  }
);
