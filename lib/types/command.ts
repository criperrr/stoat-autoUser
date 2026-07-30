import { Client } from "stoat.js";
import type { Message } from "stoat.js";
import type { AsyncEventEmitter } from "@vladfrangu/async_event_emitter";

// or just fucking importing it i just didnt find
//  import type { Events } from "../../node_modules/stoat.js/lib/Client.d.ts";

type ClientEventMap =
  Client extends AsyncEventEmitter<infer Events> ? Events : never;
// the client type from the lib extends AsyncEventEmmiter
// even if the Events types is not directly exported, i can use infer to capture the type
// the signature of Client is litteraly export declare class Client extends AsyncEventEmitter<Events>. i can use this Events to infer my own
export type StoatEventName = Extract<keyof ClientEventMap, string>;

// than i just get the keys as strings.

export interface BotCommand {
  event: StoatEventName;
  commandFunction: (message: Message, ...args: any[]) => Promise<void> | void;
}
