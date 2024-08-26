/*
  Warnings:

  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('user', 'collaborator', 'distributor', 'administrator');

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "permissions" JSONB,
DROP COLUMN "name",
ADD COLUMN     "name" "Roles" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleId" SET DEFAULT 3;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
