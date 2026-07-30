import { Message } from "stoat.js";
import { UserBot } from "../client/UserBot";

export async function functionRouter(message: Message, user: UserBot) {
  if (message.authorId !== user.client.user?.id) return;

  const commandPrefix = message.content[0];
  if (!Array.from(user.prefixes).flat(Infinity).includes(commandPrefix)) return;

  const matches = message.content.match(/^\.([^\s]+)\s*(.*)$/);
  if (!matches) return;

  const funcaoKey = matches[1] as keyof typeof user.functions;
  const params = matches[2];
  const funcao = user.functions[funcaoKey]?.commandFunction;

  console.log({
    funcaoKey,
    params,
    funcao,
    ...(user.functions),
  })

  if (typeof funcao != "function" || !funcao) {
    console.error("invalid command.");
    return;
  } else {
    funcao(message, params);
  }
  return;
}
