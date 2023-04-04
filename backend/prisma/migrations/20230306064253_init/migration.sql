/*
  Warnings:

  - You are about to alter the column `completed` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `todo` MODIFY `completed` BOOLEAN NOT NULL;
