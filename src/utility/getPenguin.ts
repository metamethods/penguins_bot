import { EmbedBuilder } from "discord.js";
import { penguinImages } from "index";

export function getPenguin(): EmbedBuilder | null {
  const randomPenguinImage = penguinImages[Math.floor(Math.random() * penguinImages.length)];

  if (!randomPenguinImage)
    return null;

  return new EmbedBuilder()
    .setTitle("Penguin")
    .setDescription("Here is a penguin for you.")
    .setImage(randomPenguinImage);
}