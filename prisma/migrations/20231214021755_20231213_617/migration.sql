/*
  Warnings:

  - The primary key for the `ServerConfiguration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `serverId` on the `ServerConfiguration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guildId]` on the table `ServerConfiguration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guildId` to the `ServerConfiguration` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ServerConfiguration_serverId_key";

-- AlterTable
ALTER TABLE "ServerConfiguration" DROP CONSTRAINT "ServerConfiguration_pkey",
DROP COLUMN "serverId",
ADD COLUMN     "guildId" TEXT NOT NULL,
ADD CONSTRAINT "ServerConfiguration_pkey" PRIMARY KEY ("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "ServerConfiguration_guildId_key" ON "ServerConfiguration"("guildId");
