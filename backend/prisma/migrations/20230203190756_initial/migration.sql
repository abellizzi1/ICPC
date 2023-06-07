-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `isAdmin` INTEGER NOT NULL,
    `isHeadCoach` INTEGER NOT NULL,
    `isAssistantCoach` INTEGER NOT NULL,
    `isCoach` INTEGER NOT NULL,
    `isMentor` INTEGER NOT NULL,
    `isStudent` INTEGER NOT NULL,
    `isActive` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
