import { GatewayIntentBits } from "discord.js";
import { PrismaClient } from "@prisma/client";

import Client from "@classes/Client";
import Log from "@schemas/Log";

import dotenv from "dotenv";

import { Level } from "@enums/level";

Log.emit(`Require main path is ${require.main?.path}`, Level.Debug);

dotenv.config();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ]
}, process.env.TOKEN ?? "", process.env.ID ?? "");

export const prismaClient = new PrismaClient();

export const penguinImages: string[] = [];

export default client;

client.start();