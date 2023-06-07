-- AlterTable
ALTER TABLE `User` ADD COLUMN `codeforcesUsername` VARCHAR(191) NULL,
    ADD COLUMN `leetcodeUsername` VARCHAR(191) NULL,
    ADD COLUMN `uhuntId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamToOrganization` (
    `teamId` INTEGER NOT NULL,
    `organizationId` INTEGER NOT NULL,

    PRIMARY KEY (`teamId`, `organizationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserToTeam` (
    `teamId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`teamId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserToOrganization` (
    `userId` INTEGER NOT NULL,
    `organizationId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `organizationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
