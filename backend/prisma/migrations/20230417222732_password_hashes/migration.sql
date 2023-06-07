/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `OrganizationToDiffucultyMapping` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Difficulty` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `password`;

-- DropTable
DROP TABLE `OrganizationToDiffucultyMapping`;

-- CreateTable
CREATE TABLE `Password` (
    `hash` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Password_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProblemToCategory` (
    `problemId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`problemId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganizationToDifficultyMapping` (
    `organizationId` INTEGER NOT NULL,
    `difficultyId` INTEGER NOT NULL,

    PRIMARY KEY (`organizationId`, `difficultyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompletedProblems` (
    `userId` INTEGER NOT NULL,
    `problemId` INTEGER NOT NULL,
    `timestamp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `problemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GraduatedArchive` (
    `userId` INTEGER NOT NULL,
    `major` VARCHAR(191) NOT NULL,
    `yearGraduated` INTEGER NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Password` ADD CONSTRAINT `Password_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
