# Zact - Zod Server ACTions

We like Next.js Server Actions. We wanted to love them. This package makes them validated and typesafe, so you can use them in things that aren't forms.

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
  const { mutate, data, isRunning } = useZact(validatedAction);

  return (
    <div>
      <button onClick={() => mutate({ stuff: "testtestaet" })}>
        Run server action
      </button>
      {isRunning && <div>Loading...</div>}
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
