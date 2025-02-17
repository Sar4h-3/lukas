import { Client, Collection, IntentsBitField, Snowflake } from "discord.js";
import { DB } from "./db.js";
import { Command } from "./modules/command.js";
import { FakeRandom, Random } from "./modules/random.js";
import type { ILanguage } from "./types";

export class Bot extends Client {
  constructor() {
    super({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
      ],
    });
  }
  commands: Collection<string, Command> = new Collection();
  commandusage: Map<Snowflake, Array<number>> = new Map();
  db: DB = new DB();
  languages: Map<string, ILanguage> = new Map();
  random: Random | FakeRandom = process.env.RANDOMKEY
    ? new Random(process.env.RANDOMKEY)
    : new FakeRandom();
}
