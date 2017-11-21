CREATE DATABASE IF NOT EXISTS dbBlog;

USE dbBlog;

/************ Update: Tables ***************/

/******************** Add Table: article ************************/

/* Build Table Structure */
CREATE TABLE article
(
	article_id INTEGER UNSIGNED NOT NULL,
	blog_id INTEGER UNSIGNED NOT NULL,
	date DATETIME NOT NULL,
	category_id INTEGER UNSIGNED NOT NULL,
	content TEXT NOT NULL
) ENGINE=InnoDB;

/* Add Primary Key */
ALTER TABLE article ADD CONSTRAINT pkarticle
	PRIMARY KEY (article_id);

/* Add Comments */
ALTER TABLE article COMMENT = 'Artyku³ ';


/******************** Add Table: article_tags ************************/

/* Build Table Structure */
CREATE TABLE article_tags
(
	tag_id INTEGER UNSIGNED NOT NULL,
	article_id INTEGER UNSIGNED NOT NULL
) ENGINE=InnoDB;

/* Add Comments */
ALTER TABLE article_tags COMMENT = 'Tagi dla artyku³ów';


/******************** Add Table: blog ************************/

/* Build Table Structure */
CREATE TABLE blog
(
	blog_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
	user_id INTEGER UNSIGNED 
		COMMENT 'owner' NOT NULL,
	blog_category_id INTEGER UNSIGNED NOT NULL,
	name VARCHAR(128) NOT NULL,
	last_modification DATETIME NULL,
	cretion_date DATETIME NOT NULL
) ENGINE=InnoDB;


/******************** Add Table: blog_category ************************/

/* Build Table Structure */
CREATE TABLE blog_category
(
	blog_category_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
	name VARCHAR(64) NOT NULL
) ENGINE=InnoDB;

/* Add Comments */
ALTER TABLE blog_category COMMENT = 'Kategoria blogu';


/******************** Add Table: category ************************/

/* Build Table Structure */
CREATE TABLE category
(
	category_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
	blog_id INTEGER UNSIGNED NOT NULL,
	name VARCHAR(32) NOT NULL
) ENGINE=InnoDB;

/* Add Comments */
ALTER TABLE category COMMENT = 'Kategorie wpisów na blogu';


/******************** Add Table: comments ************************/

/* Build Table Structure */
CREATE TABLE comments
(
	Id INTEGER UNSIGNED NOT NULL,
	user_id INTEGER UNSIGNED NOT NULL,
	article_id INTEGER UNSIGNED NOT NULL,
	date DATE NOT NULL,
	comment TEXT NOT NULL
) ENGINE=InnoDB;

/* Add Primary Key */
ALTER TABLE comments ADD CONSTRAINT pkcomments
	PRIMARY KEY (Id);

/* Add Comments */
ALTER TABLE comments COMMENT = 'Komentarze do artyku³ów';


/******************** Add Table: role ************************/

/* Build Table Structure */
CREATE TABLE role
(
	role_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
	name VARCHAR(16) NOT NULL
) ENGINE=InnoDB;

/* Add Comments */
ALTER TABLE role COMMENT = 'Role u¿ytkownika';


/******************** Add Table: tag ************************/

/* Build Table Structure */
CREATE TABLE tag
(
	tag_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
	name VARCHAR(32) NOT NULL
) ENGINE=InnoDB;

/* Add Comments */
ALTER TABLE tag COMMENT = 'Tagi';


/******************** Add Table: user ************************/

/* Build Table Structure */
CREATE TABLE user
(
	user_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
	role_id INTEGER UNSIGNED NOT NULL,
	email VARCHAR(256) NOT NULL,
	nick VARCHAR(64) NOT NULL,
	password VARCHAR(64) NOT NULL
) ENGINE=InnoDB;

/* Add Comments */
ALTER TABLE user COMMENT = 'U¿ytkownik';





/************ Add Foreign Keys ***************/

/* Add Foreign Key: fk_category_id */
ALTER TABLE article ADD CONSTRAINT fk_category_id
	FOREIGN KEY (category_id) REFERENCES category (category_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_tag_id */
ALTER TABLE article_tags ADD CONSTRAINT fk_tag_id
	FOREIGN KEY (tag_id) REFERENCES tag (tag_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_blog_category_id */
ALTER TABLE blog ADD CONSTRAINT fk_blog_category_id
	FOREIGN KEY (blog_category_id) REFERENCES blog_category (blog_category_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_article_id */
ALTER TABLE comments ADD CONSTRAINT fk_article_id
	FOREIGN KEY (article_id) REFERENCES article (article_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_blog_id */
ALTER TABLE category ADD CONSTRAINT fk_blog_id
	FOREIGN KEY (blog_id) REFERENCES blog (blog_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_role_id */
ALTER TABLE user ADD CONSTRAINT fk_role_id
	FOREIGN KEY (role_id) REFERENCES role (role_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_user_id */
ALTER TABLE comments ADD CONSTRAINT fk_user_id
	FOREIGN KEY (user_id) REFERENCES user (user_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;