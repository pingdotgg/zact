"use server";
import z from "zod";

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

type ActionType<InputType extends z.ZodTypeAny, ResponseType extends any> = (
  input: z.infer<InputType>
) => Promise<ResponseType>;

export type T3Action<
  InputType extends z.ZodTypeAny,
  ResponseType extends any
> = Brand<ActionType<InputType, ResponseType>, "t3action">;

function t3<InputType extends z.ZodTypeAny>(validator?: InputType) {
  // This is the "factory" that is created on call of t3. You pass it a "use server" function and it will validate the input before you call it
  return function <ResponseType extends any>(
    action: ActionType<InputType, ResponseType>
  ): T3Action<InputType, ResponseType> {
    // The wrapper that actually validates
    const validatedAction = async (input: z.infer<InputType>) => {
      if (validator) {
        const result = validator.safeParse(input);
        if (!result.success) throw new Error("invalid input");
      }
      return await action(input);
    };

    return validatedAction as T3Action<InputType, ResponseType>;
  };
}

export const t3Test = t3(z.object({ stuff: z.string().min(6) }))(
  async (input) => {
    console.log("doing server things", input);
    return null;
  }
);
