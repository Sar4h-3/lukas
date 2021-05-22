import { Bot } from "bot";
import { Message, MessageEmbed } from "discord.js";
import { GifCommand } from "../modules/command";

export default class Cuddle extends GifCommand {
    constructor(client: Bot) {
        super(client);
    }
    help = {
        show: true,
        name: "cuddle",
        usage: `${this.prefix}cuddle [user]`,
        category: "gifs"
    }
    async run(client: Bot, message: Message, args: string[], language: language) {
        var gif: string = client.db.getgif("cuddle", client.db.getgiftype(message.author));
        var userA: string = client.db.getname(message.author);
        var color: string = client.db.getcolor(message.author);
        if (userA == "") userA = message.guild ? message.member.displayName : message.author.username;
        var userB: string = await super.parseUser(client, message, args, language);
        if (userB == "") {
            var responseString: string = (await client.random.choice(language.command.cuddle.singleUser)).replace(/{a}/g, userA);
        } else {
            responseString = (await client.random.choice(language.command.cuddle.multiUser)).replace(/{a}/g, userA).replace(/{b}/g, userB);
        }
        var embed = new MessageEmbed()
            .setImage(gif)
            .setAuthor("cuddle")
            .setDescription(responseString)
            .setColor(color);
        message.channel.send(embed);
    }
}
