# usage

```ts
import { UserBot } from "./lib/client/UserBot";
const me = await UserBot.init(
  "your email pass",
  "your stoat pass",
  ".", // command prefixes
);

me.addCommand("ping", {
  event: "messageCreate",
  commandFunction: async (message, params) => {
    console.log("params: ", params);
    message.edit({ content: "pong!" });
  },
});

me.addAlias("ping", "p");
```
