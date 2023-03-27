## TODO

- [ ] Explore how useSwr works without a context
- [x] Figure out if a "use server" function calling a "use server" function goes over network or not
  - JJ says it does NOT go over network
- [ ] Figure out how the fuck we wrap a server function with zod in a way that doesn't suck ass

```ts

export const t3action.validate(z.object({stuff: "aaa"}))(async (input) => {
    "use server";
    // you now can use `input` and it's type is based on z.object's validation. Throws earlier if invalid
});

const roomAction = t3action.validate(z.object({}));

export const addRoom = roomAction(async () => {})
```

Alternative

```ts
export const t3(z.object({stuff: "aaa"}))(async (input) => {
    "use server";
    // you now can use `input` and it's type is based on z.object's validation. Throws earlier if invalid
});

const roomAction = t3(z.object({roomKey: z.string()}));
export const addRoom = roomAction(async () => {});
```
