-- CreateTable
CREATE TABLE "ServerConfiguration" (
    "serverId" TEXT NOT NULL,
    "penguinChannelId" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ServerConfiguration_pkey" PRIMARY KEY ("serverId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServerConfiguration_serverId_key" ON "ServerConfiguration"("serverId");
