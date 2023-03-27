# Boring

Nothing to see here...
🤐

```ts
// action.ts
"use server";

import { z } from "zod";
import { zact } from "zact";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const someServerAction = zact(z.object({ stuff: z.string().min(6) }))(
  async (input) => {
    await wait(3000);
    return { message: "hello world" };
  }
);

// component.tsx
("use client");

import { someServerAction } from "./action";
import { useZact } from "zact";

export const zactTestComponent = () => {
  const { mutate, data, isLoading } = useZact(someServerAction);

  return (
    <div className="flex flex-col text-xl gap-4 text-center">
      <button onClick={() => mutate({ stuff: "testtestaet" })}>
        Run server action
      </button>
      {isLoading && <div>Loading...</div>}
      {data?.message}
    </div>
  );
};
```
