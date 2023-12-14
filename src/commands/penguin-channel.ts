import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { prismaClient } from "index";

import Command from "@schemas/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("set-penguin-channel")
    .setDescription("Gets a penguin")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addChannelOption(option => option
      .setName("channel")
      .setDescription("The channel to send daily penguins in")
      .setRequired(true)
    ),
  handler: async ({ interaction }) => {
    const channel = interaction.options.getChannel("channel", true);

    await prismaClient.serverConfiguration.upsert({
      where: { guildId: interaction.guildId ?? "" },
      update: { penguinChannelId: channel.id },
      create: { guildId: interaction.guildId ?? "", penguinChannelId: channel.id }
    });

    await interaction.reply({
      content: `Penguin channel set to ${channel.toString()}!!`,
      ephemeral: true
    });
  }
})