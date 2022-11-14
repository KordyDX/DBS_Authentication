-- MySQL Script generated by MySQL Workbench
-- Mon Nov 14 10:48:15 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dbs_auth
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dbs_auth
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbs_auth` DEFAULT CHARACTER SET utf8 ;
USE `dbs_auth` ;

-- -----------------------------------------------------
-- Table `dbs_auth`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbs_auth`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(64) NOT NULL,
  `Type` ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
