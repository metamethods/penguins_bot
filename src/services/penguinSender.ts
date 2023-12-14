import Client, { prismaClient } from "@";
import { getPenguin } from "@utility/getPenguin";

import Service from "@schemas/Service";
import Log from "@schemas/Log";

import { Level } from "@enums/level";

import type { Channel } from "discord.js";

export default new Service({
  name: "Penguin Sender",
  handler: async () => {
    const channels = await prismaClient.serverConfiguration.findMany({
      select: { penguinChannelId: true, guildId: true }
    });

    const penguin = getPenguin();

    if (!penguin)
      return Log.emit(
        `Couldn't fetch penguin.`,
        Level.Warning
      );

    if (!channels.length)
      return Log.emit("No channels found.", Level.Warning);

    channels.forEach(async ({ penguinChannelId, guildId }) => {
      if (penguinChannelId === "")
        return Log.emit(
          `Guild ${guildId} doesn't have a set penguinChannel`,
          Level.Warning
        );

      let channel: Channel | undefined | null = 
        Client.channels.cache.get(penguinChannelId);

      if (!channel) channel = await Client.channels.fetch(penguinChannelId);

      if (!channel)
        return Log.emit(
          `Channel ${penguinChannelId} not found.`,
          Level.Warning
        );

      if (!channel.isTextBased())
        return Log.emit(
          `Channel ${penguinChannelId} is not a text channel.`,
          Level.Warning
        );

      channel.send({
        embeds: [penguin]
      });
    });
  },
  options: {
    interval: 60_000,
  }
})