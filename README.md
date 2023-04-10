# Boring

Nothing to see here...
🤐

`npm install zact`

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

```ts
// component.tsx
"use client";

import { validatedAction } from "./action";
import { useZact } from "zact";

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

or setup a client with multiple actions:

```ts
// actions.ts
"use server";

import { z } from "zod";
import { zact } from "zact/server";
const validatedActionA = zact(z.object({ stuff: z.string().min(6) }))(
  async (input) => {
    return { message: `hello ${input.stuff}` };
  }
);
const validatedActionB = zact(z.object({ stuff: z.string().min(6) }))(
  async (input) => {
    return { message: `hello ${input.stuff}` };
  }
);
```

```ts
// client.ts
"use client";

import { useZactClient } from "zact/client";
import { validatedActionA, validatedActionB } from "./actions";

export const client = useZactClient({
  a: validatedActionA,
  other: { b: validatedActionB },
});
```

```ts
// component.tsx
"use client";

import { client } from "./client";

export const zactTestComponent = () => {
  const { mutate, data, isRunning } = client.other.b();

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
