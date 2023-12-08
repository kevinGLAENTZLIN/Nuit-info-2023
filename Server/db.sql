DROP DATABASE IF EXISTS nuitinfo;
CREATE DATABASE nuitinfo;
USE nuitinfo;

CREATE TABLE `user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(100) NOT NULL,
  `activate_code` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `user_daily_data` (
  `user_id` INT UNSIGNED NOT NULL,
  `year` INT UNSIGNED NOT NULL,
  `week` INT UNSIGNED NOT NULL,
  `data` JSON NOT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
  PRIMARY KEY (`user_id`, `year`, `week`)
);


-- test

INSERT INTO `user` (`email`, `password`) VALUES ('martin.d-herouville@epitech.eu', '$2a$10$uh/6kOxhYtTB6c7r1vVCd.T5Q4MZeYC86zbrpoY9goK35rBfwbM.W');
