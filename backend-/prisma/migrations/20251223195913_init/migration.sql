-- CreateTable
CREATE TABLE `user_` (
    `Id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `firstname` VARCHAR(150) NOT NULL,
    `mail` VARCHAR(100) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `address` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `user__mail_key`(`mail`),
    PRIMARY KEY (`Id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `Id_product` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `stock` INTEGER NOT NULL,
    `weigth` DECIMAL(15, 2) NULL,
    `height` DECIMAL(15, 2) NULL,
    `material` VARCHAR(100) NULL,
    `brand` VARCHAR(50) NULL,

    PRIMARY KEY (`Id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `Id_user` INTEGER NOT NULL,
    `Id_product` INTEGER NOT NULL,

    PRIMARY KEY (`Id_user`, `Id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_Id_user_fkey` FOREIGN KEY (`Id_user`) REFERENCES `user_`(`Id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_Id_product_fkey` FOREIGN KEY (`Id_product`) REFERENCES `product`(`Id_product`) ON DELETE RESTRICT ON UPDATE CASCADE;
