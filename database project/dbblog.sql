-- MySQL Script generated by MySQL Workbench
-- Mon Dec  4 13:55:38 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dbBlog
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dbBlog` ;

-- -----------------------------------------------------
-- Schema dbBlog
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbBlog` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `dbBlog` ;

-- -----------------------------------------------------
-- Table `dbBlog`.`blog_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbBlog`.`blog_category` ;

CREATE TABLE IF NOT EXISTS `dbBlog`.`blog_category` (
  `blog_category_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`blog_category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbBlog`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbBlog`.`role` ;

CREATE TABLE IF NOT EXISTS `dbBlog`.`role` (
  `role_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbBlog`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbBlog`.`user` ;

CREATE TABLE IF NOT EXISTS `dbBlog`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` INT UNSIGNED NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `nick` VARCHAR(64) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_role_id` (`role_id` ASC),
  CONSTRAINT `fk_role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `dbBlog`.`role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbBlog`.`blog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbBlog`.`blog` ;

CREATE TABLE IF NOT EXISTS `dbBlog`.`blog` (
  `blog_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL COMMENT 'owner',
  `blog_category_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `last_modification` DATETIME NULL DEFAULT NULL,
  `creation_date` DATETIME NOT NULL,
  PRIMARY KEY (`blog_id`),
  INDEX `fk_blog_category_id` (`blog_category_id` ASC),
  INDEX `fk_blog_user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_blog_category_id`
    FOREIGN KEY (`blog_category_id`)
    REFERENCES `dbBlog`.`blog_category` (`blog_category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_blog_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `dbBlog`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbBlog`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbBlog`.`category` ;

CREATE TABLE IF NOT EXISTS `dbBlog`.`category` (
  `category_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `blog_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`category_id`),
  INDEX `fk_blog_id` (`blog_id` ASC),
  CONSTRAINT `fk_blog_id`
    FOREIGN KEY (`blog_id`)
    REFERENCES `dbBlog`.`blog` (`blog_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbBlog`.`article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbBlog`.`article` ;

CREATE TABLE IF NOT EXISTS `dbBlog`.`article` (
  `article_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `blog_id` INT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(128) NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`article_id`),
  INDEX `fk_category_id` (`category_id` ASC),
  INDEX `fk_article_blog_id_idx` (`blog_id` ASC),
  CONSTRAINT `fk_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `dbBlog`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_blog_id`
    FOREIGN KEY (`blog_id`)
    REFERENCES `dbBlog`.`blog` (`blog_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbBlog`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbBlog`.`tag` ;

CREATE TABLE IF NOT EXISTS `dbBlog`.`tag` (
  `tag_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`tag_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbBlog`.`article_tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbBlog`.`article_tags` ;

CREATE TABLE IF NOT EXISTS `dbBlog`.`article_tags` (
  `tag_id` INT UNSIGNED NOT NULL,
  `article_id` INT UNSIGNED NOT NULL,
  INDEX `fk_tag_id` (`tag_id` ASC),
  INDEX `fk_article_id_idx` (`article_id` ASC),
  CONSTRAINT `fk_tag_id`
    FOREIGN KEY (`tag_id`)
    REFERENCES `dbBlog`.`tag` (`tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_id`
    FOREIGN KEY (`article_id`)
    REFERENCES `dbBlog`.`article` (`article_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbBlog`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbBlog`.`comments` ;

CREATE TABLE IF NOT EXISTS `dbBlog`.`comments` (
  `comment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `article_id` INT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL,
  `comment` TEXT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_comments_article_id` (`article_id` ASC),
  INDEX `fk_comments_user_id` (`user_id` ASC),
  CONSTRAINT `fk_comments_article_id`
    FOREIGN KEY (`article_id`)
    REFERENCES `dbBlog`.`article` (`article_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `dbBlog`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `dbBlog`.`blog_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `dbBlog`;
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (1, 'Inne');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (2, 'Lifestyle');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (3, 'Podróże');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (4, 'Pasje i twórczość');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (5, 'Kulinarne');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (6, 'Blogi nastolatków');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (7, 'Moda i uroda');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (8, 'Specjalistyczne i firmowe');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (9, 'Anime i Manga');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (10, 'Artystyczne');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (11, 'DIY');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (12, 'Elektronika');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (13, 'Edukacja');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (14, 'Fotografia');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (15, 'Sport');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (16, 'Blogi literackie');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (17, 'Dziecko');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (18, 'O mnie');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (19, 'Opowiadania');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (20, 'Praca');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (21, 'Motoryzacja');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (22, 'Informatyka');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (23, 'Pasje');
INSERT INTO `dbBlog`.`blog_category` (`blog_category_id`, `name`) VALUES (24, 'Gry');

COMMIT;


-- -----------------------------------------------------
-- Data for table `dbBlog`.`role`
-- -----------------------------------------------------
START TRANSACTION;
USE `dbBlog`;
INSERT INTO `dbBlog`.`role` (`role_id`, `name`) VALUES (1, 'User');
INSERT INTO `dbBlog`.`role` (`role_id`, `name`) VALUES (2, 'Moderator');
INSERT INTO `dbBlog`.`role` (`role_id`, `name`) VALUES (3, 'Administrator');

COMMIT;


-- -----------------------------------------------------
-- Data for table `dbBlog`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `dbBlog`;
INSERT INTO `dbBlog`.`user` (`user_id`, `role_id`, `email`, `nick`, `password`) VALUES (1, 1, 'b.ujazdowski@gmail.com', 'SharpShooter', '$2y$10$SI2XkOA9x3IIP/k6BP0ce.Cxhg2O51lGcF6/QsKZsjgPAydJMcDNO');

COMMIT;


-- -----------------------------------------------------
-- Data for table `dbBlog`.`blog`
-- -----------------------------------------------------
START TRANSACTION;
USE `dbBlog`;
INSERT INTO `dbBlog`.`blog` (`blog_id`, `user_id`, `blog_category_id`, `name`, `last_modification`, `creation_date`) VALUES (1, 1, 1, 'Mój pierwszy blog', '', '22-11-2017 16:32:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `dbBlog`.`category`
-- -----------------------------------------------------
START TRANSACTION;
USE `dbBlog`;
INSERT INTO `dbBlog`.`category` (`category_id`, `blog_id`, `name`) VALUES (1, 1, 'Moja kategoria');

COMMIT;


-- -----------------------------------------------------
-- Data for table `dbBlog`.`article`
-- -----------------------------------------------------
START TRANSACTION;
USE `dbBlog`;
INSERT INTO `dbBlog`.`article` (`article_id`, `blog_id`, `date`, `category_id`, `title`, `content`) VALUES (1, 1, '22-11-2017 16:30:00', 1, 'Mój pierwszy artykuł', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,');

COMMIT;


-- -----------------------------------------------------
-- Data for table `dbBlog`.`tag`
-- -----------------------------------------------------
START TRANSACTION;
USE `dbBlog`;
INSERT INTO `dbBlog`.`tag` (`tag_id`, `name`) VALUES (1, 'wpis');

COMMIT;


-- -----------------------------------------------------
-- Data for table `dbBlog`.`article_tags`
-- -----------------------------------------------------
START TRANSACTION;
USE `dbBlog`;
INSERT INTO `dbBlog`.`article_tags` (`tag_id`, `article_id`) VALUES (1, 1);

COMMIT;

