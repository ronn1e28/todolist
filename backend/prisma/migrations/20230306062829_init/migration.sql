/*
  Warnings:

  - Added the required column `completed` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` ADD COLUMN `completed` VARCHAR(10) NOT NULL;
