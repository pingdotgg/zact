import type z from "zod";
import { fromZodError } from "zod-validation-error";

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

export type ZactRouteMiddleware<Context extends any> = () => Context;
export interface ZactConfig<Context extends any> {
  middleware?: ZactRouteMiddleware<Context>;
}

type ActionTypeWithContext<
  InputType extends z.ZodTypeAny,
  ResponseType extends any,
  Context extends any
> = (input: z.infer<InputType>, context: Context) => Promise<ResponseType>;

type ActionType<InputType extends z.ZodTypeAny, ResponseType extends any> = (
  input: z.infer<InputType>
) => Promise<ResponseType>;

export type ZactAction<
  InputType extends z.ZodTypeAny,
  ResponseType extends any
> = Brand<ActionType<InputType, ResponseType>, "zact-action">;

export function zact<InputType extends z.ZodTypeAny, Context extends any>(
  validator?: InputType,
  middleware?: ZactRouteMiddleware<Context>
) {
  // This is the "factory" that is created on call of zact. You pass it a "use server" function and it will validate the input before you call it
  return function <ResponseType extends any>(
    action: ActionTypeWithContext<InputType, ResponseType, Context>
  ): ZactAction<InputType, ResponseType> {
    // The wrapper that actually validates
    const validatedAction = async (input: z.infer<InputType>) => {
      let ctx = middleware?.();

      if (validator) {
        // This will throw if the input is invalid
        const result = validator.safeParse(input);

        if (!result.success) {
          const validatedError = fromZodError(result.error);
          throw validatedError;
        }
      }
      return await action(input, ctx);
    };

    return validatedAction as ZactAction<InputType, ResponseType>;
  };
}

/**
 * Initializes Zact with a config
 * @param config
 * @returns
 */
export function initZact<Context>(config?: ZactConfig<Context>) {
  return {
    config,
    zact: <InputType extends z.ZodTypeAny>(validator?: InputType) =>
      zact(validator, config?.middleware),
  };
}
