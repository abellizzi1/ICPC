-- CreateTable
CREATE TABLE `SubmissionImage` (
    `userId` INTEGER NOT NULL,
    `problemId` INTEGER NOT NULL,
    `img` LONGTEXT NOT NULL,

    PRIMARY KEY (`userId`, `problemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganizationToDiffucultyMapping` (
    `organizationId` INTEGER NOT NULL,
    `difficultyId` INTEGER NOT NULL,

    PRIMARY KEY (`organizationId`, `difficultyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
