-- CreateTable
CREATE TABLE "Key" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_id_key" ON "Key"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Key_key_key" ON "Key"("key");
