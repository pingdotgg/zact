import type z from "zod";
import { fromZodError } from "zod-validation-error";

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

type ActionType<InputType extends z.ZodTypeAny, ResponseType extends any> = (
  input: z.infer<InputType>
) => Promise<ResponseType>;

export type ZactAction<
  InputType extends z.ZodTypeAny,
  ResponseType extends any
> = Brand<ActionType<InputType, ResponseType>, "zact-action">;

export function zact<InputType extends z.ZodTypeAny>(validator?: InputType) {
  // This is the "factory" that is created on call of zact. You pass it a "use server" function and it will validate the input before you call it
  return function <ResponseType extends any>(
    action: ActionType<InputType, ResponseType>
  ): ZactAction<InputType, ResponseType> {
    // The wrapper that actually validates
    const validatedAction = async (input: z.infer<InputType>) => {
      if (validator) {
        // This will throw if the input is invalid
        const result = validator.safeParse(input);

        if (!result.success) {
          const validatedError = fromZodError(result.error);
          throw validatedError;
        }
      }
      return await action(input);
    };

    return validatedAction as ZactAction<InputType, ResponseType>;
  };
}
