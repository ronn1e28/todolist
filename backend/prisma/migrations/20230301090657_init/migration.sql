-- CreateTable
CREATE TABLE `User` (
    `name` VARCHAR(50) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `aud` VARCHAR(191) NOT NULL,
    `auth_time` INTEGER NOT NULL,
    `user_id` VARCHAR(150) NOT NULL,
    `issued_at` INTEGER NOT NULL,
    `expires` INTEGER NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `email_Verified` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `User_user_id_key`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
