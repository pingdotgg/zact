"use client";

import type z from "zod";
import type { ZactAction } from "./server";
import { useMemo, useRef, useState } from "react";

export function useZact<
  InputType extends z.ZodTypeAny,
  ResponseType extends any
>(action: ZactAction<InputType, ResponseType>) {
  const doAction = useRef(action);

  const [data, setData] = useState<ResponseType | null>(null);

  const [isRunning, setIsLoading] = useState(false);
  const [err, setErr] = useState<Error | null>(null);

  const mutate = useMemo(
    () => async (input: z.infer<InputType>) => {
      setIsLoading(true);
      setErr(null);
      setData(null);
      try {
        const result = await doAction.current(input);
        setData(result);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setErr(e as Error);
        setIsLoading(false);
      }
    },
    []
  );

  return {
    mutate,
    data,
    isRunning,
    error: err,
  };
}

/**
 * Object containing zact server actions
 */
export type ZactServerRoute = {
  [key: string]: ZactAction<z.ZodTypeAny, unknown> | ZactServerRoute;
};

/**
 * Object containing zact client actions
 */
export type ZactClientRoute<Routes extends ZactServerRoute> = {
  [Key in keyof Routes]: Routes[Extract<Key, string>] extends ZactServerRoute
    ? ZactClientRoute<Routes[Extract<Key, string>]>
    : typeof useZact<
        Routes[Extract<Key, string>] extends ZactAction<infer x, infer y>
          ? x
          : never,
        Routes[Extract<Key, string>] extends ZactAction<infer x, infer y>
          ? y
          : never
      >;
};

/**
 * Use Zact Client
 * @param serverRoutes Server Routes
 * @returns Client Routes
 */
export function createZactClient<Routes extends ZactServerRoute>(
  serverRoutes: Routes
): ZactClientRoute<Routes> {
  const clientRoutes: ZactClientRoute<Routes> = {};
  Object.keys(serverRoutes).forEach((key: string) => {
    const routeOrAction = serverRoutes[key];
    if (typeof routeOrAction === "object") {
      clientRoutes[key] = createZactClient(routeOrAction);
    } else {
      const useZactCreate = () => useZact(routeOrAction);
      clientRoutes[key] = useZactCreate;
    }
  });
  return clientRoutes;
}
