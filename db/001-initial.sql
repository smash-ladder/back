SET NAMES utf8mb4;
START TRANSACTION;

CREATE TABLE changelog (
  id INT UNSIGNED NOT NULL PRIMARY KEY,
  timestamp INT UNSIGNED
);

INSERT INTO changelog VALUES (1, UNIX_TIMESTAMP());

CREATE TABLE smash_player (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(200) NOT NULL UNIQUE,
  email VARCHAR(80) NULL,
  name VARCHAR(80) NULL,
  created_at INT UNSIGNED NOT NULL,
  modified_at INT UNSIGNED NOT NULL
);

CREATE TABLE smash_challenge (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  created_at INT UNSIGNED NOT NULL,
  ladder_id VARCHAR(30) NOT NULL,
  from_id INT UNSIGNED NOT NULL,
  to_id INT UNSIGNED NOT NULL
);

CREATE TABLE smash_match (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  created_at INT UNSIGNED NOT NULL,
  ladder_id VARCHAR(30) NOT NULL,
  winner_id INT UNSIGNED NOT NULL,
  loser_id INT UNSIGNED NOT NULL,
  lives_left INT UNSIGNED NOT NULL,
  stage VARCHAR(50) NULL,
  winner_character VARCHAR(50) NOT NULL,
  loser_character VARCHAR(50) NOT NULL
);
COMMIT;

