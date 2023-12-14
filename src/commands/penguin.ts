import { SlashCommandBuilder } from "discord.js";
import { getPenguin } from "@utility/getPenguin";

import Command from "@schemas/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("penguin")
    .setDescription("Gets a penguin"),
  handler: async ({ interaction }) => {
    const penguin = getPenguin();

    if (!penguin)
      return await interaction.reply({
        content: "Couldn't fetch penguin for you.",
        ephemeral: true
      });

    await interaction.reply({
      embeds: [penguin]
    });
  }
})