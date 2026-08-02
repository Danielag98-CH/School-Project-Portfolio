# Apparently we can't drop databases anymore!
# DROP DATABASE IF EXISTS web4_sample_db;

CREATE DATABASE web4_sample_db;
USE web4_sample_db;

CREATE TABLE `user_roles` (
  `user_role_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_role_name` varchar(30) NOT NULL,
  `user_role_desc` varchar(200) NOT NULL
);

INSERT INTO `user_roles` (`user_role_id`, `user_role_name`, `user_role_desc`) VALUES
(1, 'Admin', 'Extra permissions'),
(2, 'Standard User', 'Normal user with no special permissions');

CREATE TABLE users (
  user_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_first_name varchar(30) NOT NULL,
  user_last_name varchar(30) NOT NULL,
  user_email varchar(100) NOT NULL UNIQUE,
  user_password char(255) NOT NULL,
  user_salt char(32) NOT NULL,
  user_role_id INT NOT NULL DEFAULT '1',
  user_active boolean NOT NULL DEFAULT true,
  FOREIGN KEY (user_role_id) REFERENCES user_roles(user_role_id)
);

INSERT INTO users (user_first_name,user_last_name, user_email, user_password, user_salt, user_role_id, user_active) VALUES 
('John', 'Doe','john@doe.com', 'opensesame', 'xxx', '1', true),
('Jane', 'Anderson','jane@doe.com', 'letmein', 'xxx', '2', true),
('Bob', 'Smith','bob@smith.com', 'test', 'xxx', '2', false);