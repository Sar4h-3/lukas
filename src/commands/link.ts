import {
  EmbedBuilder,
  Message,
  OAuth2Scopes,
  PermissionsBitField,
} from "discord.js";
import { Bot } from "../bot.js";
import { Command } from "../modules/command.js";

export default class Link extends Command {
  constructor(client: Bot) {
    super(client);
  }
  async run(client: Bot, message: Message) {
    const embed: EmbedBuilder = new EmbedBuilder()
      .setTitle("Links")
      .setDescription(
        `[Invite](${client.generateInvite({
          scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
          permissions: PermissionsBitField.All,
        })})\n[GitHub](https://github.com/BlackDemonFire/lukas.git)`,
      )
      .setColor(0xaa7777);
    message.channel.send({ embeds: [embed] });
  }
  help = {
    show: true,
    name: "link",
    usage: `${this.prefix}link`,
    category: "Utility",
  };
}
