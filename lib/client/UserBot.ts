import { Client, Message } from "stoat.js";
import { functionRouter } from "../router/commandRouter";
import type { BotCommand } from "../types/command";

export class UserBot {
  client: Client;
  functions: Record<string, BotCommand> = {};
  prefixes: string[] | string = ".";

  constructor() {
    this.client = new Client();
  }

  static async init(email: string, pass: string, prefixes: string[] | string) {
    const user = new UserBot();
    user.prefixes = prefixes;
    try {
      await user.client.login({ email: email, password: pass });
      user.client.on("messageCreate", (message) => {
        return functionRouter(message, user);
      });
    } catch (e) {
      console.log("Please verify your credentials.\nDebug:", e);
    }

    user.addCommand("ping", {
      event: "messageCreate",
      commandFunction: (message) => {
        message.edit({
          content: "pong! congratulations, the userbot is working!",
        });
      },
    });

    console.log("client connected");
    return user;
  }

  async addCommand(commandName: string, command: BotCommand) {
    this.client.on(command.event, async (message: Message) => functionRouter(message, this));
    this.functions[commandName] = command;
    console.log(
      `Imported module ${commandName} when event ${command.event} triggered!`,
    );
  }

  async addAlias(commandName: string, alias: string) {
    if (!this.functions[commandName]) throw new Error("no command to aliasify");
    this.functions[alias] = this.functions[commandName];
  }
}
