# NOTE - I did adjust this SQL script since making the video for step 1
# Dont worry if it looks different from what you see in the video, this version works better

DROP DATABASE IF EXISTS apothecary_project;
CREATE DATABASE apothecary_project;

# CREATE USER IF NOT EXISTS devUser@'%' IDENTIFIED BY 'dev123';
# GRANT ALL PRIVILEGES ON apothecary_project.* TO devUser@'%';


# I was trying to pull user info from the docker compose file but its not working
# CREATE USER IF NOT EXISTS '${SOME_DOCKER_ENV}'@'%' IDENTIFIED BY 'test123';
# GRANT ALL PRIVILEGES ON apothecary_project.* TO '${SOME_DOCKER_ENV}'@'%';

# FLUSH PRIVILEGES;

USE apothecary_project;

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

INSERT INTO `users` (`user_id`, `user_first_name`,`user_last_name`, `user_email`, `user_password`, `user_salt`, `user_role_id`, `user_active`) VALUES 
(1, 'John', 'Doe','john@doe.com', 'test123', 'xxx', '1', true),
(2, 'Jane', 'Doe','jane@doe.com', 'test123', 'xxx', '2', true),
(3, 'Daniela', 'Gonzalez','daniela.gonzalez@gmail.com', 'opensesame', 'xxx', '1', true),
(4, 'Jonathan', 'Christian','JonathanC@gmail.com', 'letmein', 'xxx', '2', true),
(5, 'Claudia', 'Gonzalez','gonzalezC69@yahoo.com', 'test', 'xxx', '2', false);

# UPDATE users SET user_password = '$2a$08$zvWApJkRSK1124iESJU5Puo9mUelLn3sgy9A.dPSySghLe7MMGGGS', user_salt = 'xxx';

CREATE TABLE `suppliers` (
  `supplier_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `supplier_Name` varchar(100) NOT NULL,
  `supplier_email` varchar(200) NOT NULL UNIQUE,
  `supplier_phone` varchar(20) NOT NULL
);

INSERT INTO `suppliers` (`supplier_id`, `supplier_name`, `supplier_email`, `supplier_phone`) VALUES
(1, 'Bramble Berry', 'Support@BrambleBerry.com', '1-800-647-5285'),
(2, 'Essential Oil Company', 'info@essentialoil.com', '1-971-512-1296'),
(3, 'Wholesale Botanicals', 'support@wholesalebotanicals.com', '1-855-999-0444'),
(4, 'Bulk Apothecary', 'CustomerSupport@blukapothecary.com', '1-888-728-7612');

CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL PRIMARY KEY,
  `ingredient_name` varchar(40) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `cost` DECIMAL(10,2) NOT NULL,
  `amount_purchased` varchar(30) NOT NULL,
  FOREIGN KEY (supplier_id) REFERENCES suppliers (supplier_id)
);

INSERT INTO `ingredients` (`ingredient_id`, `ingredient_name`, `cost`, `amount_purchased`, `supplier_id`) VALUES
(1, 'bees wax','287.79', '55lbs', '4'),
(2, 'lavender essential oil', '1478.78', '25lbs', '1'),
(3, 'cocoa butter', '565.95', '55lbs', '3'),
(4, 'rosehip oil', '6240.00', '396lbs', '2');

CREATE TABLE `soaps` (
  `soap_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `soap_name` varchar(100) NOT NULL,
  `description` varchar(150),
  `created_by` int(11) NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users(user_id)
);

INSERT INTO `soaps` (`soap_id`, `soap_name`, `description`, `created_by`) VALUES
(1, 'Lavender Bliss', 'A calming soap with lavender and cocoa butter.', 1),
(2, 'Rose Radiance', 'Moisturizing soap with rosehip oil and beeswax.', 3);


CREATE TABLE `soap_ingredients` (
  `soap_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `amount_used` varchar(30), 
  FOREIGN KEY (soap_id) REFERENCES soaps(soap_id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

INSERT INTO `soap_ingredients` (`soap_id`, `ingredient_id`, `amount_used`) VALUES
(1, 2, '1 oz'),
(1, 3, '2 oz'), 
(2, 4, '1.5 oz'),
(2, 1, '0.5 oz'); 

