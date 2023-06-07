-- CreateTable
CREATE TABLE `OrgToCategoryMapping` (
    `organizationId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`organizationId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrgToProbMapping` (
    `organizationId` INTEGER NOT NULL,
    `probId` INTEGER NOT NULL,

    PRIMARY KEY (`organizationId`, `probId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
