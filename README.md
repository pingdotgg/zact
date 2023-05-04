# Zact - Zod Server ACTions

We like Next.js Server Actions. We wanted to love them. This package makes them validated and type-safe, so you can use them in things that aren’t forms.

```shell
npm install zact
```

### Back End

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

### Client WITH Custom Hook

```ts
// component.tsx
"use client";

import { validatedAction } from "./action";
import { useZact } from "zact/client";

export const zactTestComponent = () => {
  const { mutate, data, isRunning } = useZact(validatedAction);

  return (
    <div className="flex flex-col text-xl gap-4 text-center">
      <button onClick={() => mutate({ stuff: "testtestaet" })}>
        Run server action
      </button>
      {isRunning && <div>Loading...</div>}
      {data?.message}
    </div>
  );
};
```

### Client WITHOUT Custom Hook

Yes, you can also just import them and call them like promises:

```ts
// component.tsx
"use client";

import { validatedAction } from "./action";

export const zactTestComponent = () => {
  return (
    <div className="flex flex-col text-xl gap-4 text-center">
      <button onClick={() => {
        validatedAction({ stuff: "testtestaet" }).then((response) => console.log("response!", response));
      }>
        Run server action
      </button>
    </div>
  );
};
```
