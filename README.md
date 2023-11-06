# Zact - Zod Server ACTions

## DEPRECATED
I don't plan to support this. [next-safe-action](https://github.com/TheEdoRan/next-safe-action) is better and well maintained, credits to @TheEdoRan for building it 🙏

## LEGACY

We like NextJS Server Actions. We wanted to love them. This package makes them validated and typesafe, so you can use them in things that aren't forms.

`npm install zact`

### Backend
```ts
// action.ts
"use server";

import { z } from "zod";
import { zact } from "zact/server";
export const validatedAction = zact(z.object({ stuff: z.string().min(6) }))(
  async (input) => {
    return { message: `hello ${input.stuff}` };
  }
);
```

### Client WITH custom hook
```ts
// component.tsx
"use client";

import { validatedAction } from "./action";
import { useZact } from "zact/client";

export const zactTestComponent = () => {
  const { mutate, data, isRunning, error } = useZact(validatedAction);

  return (
    <div>
      <button onClick={() => mutate({ stuff: "testtestaet" })}>
        Run server action
      </button>
      {isRunning && <div>Loading...</div>}
      {error?.message}
      {data?.message}
    </div>
  );
};
```

### Client WITHOUT custom hook
Yes you can just import them and call them like promises too

```ts
// component.tsx
"use client";

import { validatedAction } from "./action";

export const zactTestComponent = () => {
  return (
    <div>
      <button onClick={() => {
        validatedAction({ stuff: "test" }).then((response) => console.log("response!", response));
      }>
        Run server action
      </button>
    </div>
  );
};
```
