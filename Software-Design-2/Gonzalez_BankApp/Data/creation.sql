-- CREATE TABLE `Customer`
-- (
--     `CustId` INT NOT NULL AUTO_INCREMENT,
--     `FirstName` VARCHAR(255) NOT NULL,
--     `LastName` VARCHAR(255) NOT NULL,
--     `DOB` DATE NOT NULL,
--     `Address` VARCHAR(255) NOT NULL,
--     `City` VARCHAR(255) NOT NULL,
--     `State` VARCHAR(255) NOT NULL,
--     `Country` VARCHAR(255) NOT NULL,
--     `PostalCode` VARCHAR(10) NOT NULL,
--     `DateJoined` DATE NOT NULL,
--     `CreditScore` INT NOT NULL,
--     CONSTRAINT `PK_Customer` PRIMARY KEY  (`CustId`)
-- );

-- CREATE TABLE `Account`
-- (
--     `AccountId` INT NOT NULL AUTO_INCREMENT,
--     `Type` VARCHAR(50) NOT NULL,
--     `DateCreated` DATE NOT NULL,
--     `Balance` NUMERIC(10,2) NOT NULL,    
--     CONSTRAINT `PK_Account` PRIMARY KEY  (`AccountId`)
-- );

-- CREATE TABLE `CreditCard`
-- (
--     `CardId` INT NOT NULL AUTO_INCREMENT,
--     `CardNumber` VARCHAR(40) NOT NULL,
--     `CardType` VARCHAR(20) NOT NULL,
--     `ExpDate` DATE NOT NULL,
--     `AvailCredit` NUMERIC(10,2) NOT NULL,
--     `CreditLimit` NUMERIC(10,2) NOT NULL,
--     CONSTRAINT `PK_CreditCard` PRIMARY KEY  (`CardId`)
-- );

-- CREATE TABLE `CustomerAccount`
-- (
--     `CustId` INT NOT NULL,
--     `AccountId` INT NOT NULL,
--     CONSTRAINT `PK_CustomerAccount` PRIMARY KEY  (`CustId`, `AccountId`)
-- );

-- CREATE TABLE `CustomerCreditCard`
-- (
--     `CustId` INT NOT NULL,
--     `CardId` INT NOT NULL,
--     CONSTRAINT `PK_CustomerCreditCard` PRIMARY KEY  (`CustId`, `CardId`)
-- );

-- ALTER TABLE `CustomerAccount` ADD CONSTRAINT `FK_CustomerAccountCustId`
--     FOREIGN KEY (`CustId`) REFERENCES `Customer` (`CustId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ALTER TABLE `CustomerAccount` ADD CONSTRAINT `FK_CustomerAccountAccountId`
--     FOREIGN KEY (`AccountId`) REFERENCES `Account` (`AccountId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ALTER TABLE `CustomerCreditCard` ADD CONSTRAINT `FK_CustomerCreditCard`
--     FOREIGN KEY (`CustId`) REFERENCES `Customer` (`CustId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ALTER TABLE `CustomerCreditCard` ADD CONSTRAINT `FK_CustomerCreditCard`
--     FOREIGN KEY (`CardId`) REFERENCES `CreditCard` (`CardId`) ON DELETE NO ACTION ON UPDATE NO ACTION;


-- INSERTING CUSTOMERS

INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Ronald', 'McDonald', '06/05/2000', '123 Dury Lane', 'Chicago', 'IL', 'US', '60680', '09/20/2015', 730);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Grimmace', 'Thompson', '01/01/1260', '000 Dury Lane', 'Chicago', 'IL', 'US', '60680', '01/1/2012', 0);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Big Bird', 'Emu', '04/20/1980', '1010 Sesame Street', 'Chicago', 'IL', 'US', '60680', '01/1/2014', 870);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Cookie Monster', 'Carl', '04/20/1000', '430 Sesame Street', 'Chicago', 'IL', 'US', '60680', '07/07/2010', 990);

INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Oscar', 'The Grouch', '02/02/1001', '202 Sesame Street', 'Chicago', 'IL', 'US', '60680', '09/06/2010', 960);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Bert', 'Sampson', '03/30/1990', '101 Sesame Street', 'Chicago', 'IL', 'US', '60680', '11/12/2006', 680);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Earnie', 'Sampson', '06/24/1992', '101 Sesame Street', 'Chicago', 'IL', 'US', '60680', '09/14/2007', 670);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Janice', 'Wellwater', '03/30/1955', '342 Walnut Street', 'Chicago', 'IL', 'US', '60680', '11/22/2014', 522);

INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Jack', 'Riverwater', '08/14/1975', '412 Stanford Street', 'Chicago', 'IL', 'US', '60680', '10/08/2008', 880);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Travis', 'Bassmaster', '04/16/1980', '225 Lemon Street', 'Tomah', 'WI', 'US', '54660', '07/11/2012', 100);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Ballista', 'McMary', '05/30/1977', '345 Salmon Street', 'Tomah', 'WI', 'US', '54660', '06/07/2011', 300);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Sandra', 'Benson', '02/03/1992', '543 Trout Street', 'Tomah', 'WI', 'US', '54660', '06/12/2014', 20);

INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Dan', 'Daniels', '04/17/1994', '845 Shark Street', 'Tomah', 'WI', 'US', '54660', '12/12/2013', 70);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Paul', 'Paulson', '12/27/1993', '309 Wheat Street', 'Tomah', 'WI', 'US', '54660', '07/22/2015', 220);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Quam', 'Quail', '03/03/1982', '906 Wheel Street', 'Tomah', 'WI', 'US', '54660', '04/23/2014', 344);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Landy', 'Lanson', '09/15/1997', '435 Goldfish Street', 'Tomah', 'WI', 'US', '54660', '02/17/2014', 472);

INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Ryan', 'Henry', '04/17/1994', '845 Whale Street', 'Chciago', 'IL', 'US', '60680', '12/12/2006', 670);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Bob', 'Jo', '12/27/1993', '309 Brown Street', 'Chciago', 'IL', 'US', '60680', '07/22/2007', 920);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Samuel', 'Dandennery', '03/03/1982', '906 Steel Street', 'Chciago', 'IL', 'US', '60680', '04/23/2008', 744);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Brian', 'Bugle', '09/15/1997', '435 GoldFinch Street', 'Chciago', 'IL', 'US', '60680', '02/17/2009', 872);

INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Cyan', 'Henry', '04/17/1944', '845 Yellow Street', 'Chicago', 'IL', 'US', '60680', '11/12/2009', 454);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Lobber', 'Jo', '12/27/1943', '309 Sunny Street', 'Chicago', 'IL', 'US', '60680', '06/22/2012', 929);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Sander', 'Dandennery', '03/03/1942', '906 Green Street', 'Chicago', 'IL', 'US', '60680', '03/23/2013', 754);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Brian', 'Bagel', '09/15/1947', '435 Purple Street', 'Chicago', 'IL', 'US', '60680', '01/17/2011', 739);

INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Stella', 'Ryan', '04/17/1984', '845 Gold Street', 'Chicago', 'IL', 'US', '60680', '10/12/2010', 444);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Steven', 'Joles', '12/27/1983', '309 Silver Street', 'Chicago', 'IL', 'US', '60680', '05/22/2017', 876);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Dusty', 'Dan', '03/03/1982', '906 Bronze Street', 'Chicago', 'IL', 'US', '60680', '04/20/2018', 871);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Brian', 'Blueberry', '09/15/1987', '435 Iron Street', 'Chicago', 'IL', 'US', '60680', '02/17/2016', 872);

INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Henry', 'Bromberry', '04/17/1995', '845 Primary Street', 'Chicago', 'IL', 'US', '60680', '09/12/2010', 600);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Jo', 'Lobber', '12/27/1994', '309 Composite Street', 'Chicago', 'IL', 'US', '60680', '04/26/2013', 689);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Lazlo', 'Bane', '03/03/1991', '906 Pink Street', 'Chicago', 'IL', 'US', '60680', '05/23/2019', 934);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Brian', 'Brazen', '09/15/1997', '435 Chapstick Street', 'Chicago', 'IL', 'US', '60680', '06/17/2020', 876);

INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Sara', 'Blommer', '04/17/1994', '845 Drumstick Street', 'Chicago', 'IL', 'US', '60680', '07/15/2004', 442);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Jason', 'Joggin', '12/27/1993', '309 Guitar Street', 'Chicago', 'IL', 'US', '60680', '02/22/2001', 824);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Dranner', 'Dacey', '03/03/1992', '906 Lambda Street', 'Chicago', 'IL', 'US', '60680', '05/10/2002', 764);
INSERT INTO `Customer` (`FirstName`, `LastName`, `DOB`, `Address`, `City`, `State`, `Country`, `PostalCode`, `DateJoined`, `CreditScore`) VALUES ('Brian', 'Bison', '09/15/1997', '435 Pi Street', 'Chicago', 'IL', 'US', '60680', '06/19/2003', 782);


-- Ronald
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (123789.99, 'Checking', '09/20/2015');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (987321.99, 'Savings', '09/20/2015');

-- Grimmace
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (333333.66, 'Checking', '01/1/2012');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (666666.66, 'Savings', '01/1/2012');

-- Big Bird
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (4000, 'Checking', '01/1/2014');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (40000, 'Savings', '01/1/2014');

-- Cookie Monster
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '07/07/2010');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5.00, 'Savings', '07/07/2010');

-- FOR JOINT ACCOUNTS, MAKE SURE THAT WE HAVE THEM MADE AT DATES THAT MAKE SENSE.
-- MAKE SURE THAT THESE ACCOUNTS WERE MADE ON THE SAME DAY THAT THESE PEOPLE SIGNED UP WITH THE BANK.

-- Oscar
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '09/06/2010');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (15000.00, 'Savings', '09/06/2010');

-- Bert
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5312.00, 'Checking', '11/12/2006');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (25000.00, 'Savings', '11/12/2006');

-- Earnie
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '09/14/2007');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (25000.00, 'Savings', '09/14/2007');

-- Janice
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (4568.00, 'Checking', '11/22/2014');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (35365.00, 'Savings', '11/22/2014');

-- Jack
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (6543.00, 'Checking', '10/08/2008');
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5.00, 'Savings', '10/08/2008');

-- Travis
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (999.99, 'Checking', '07/11/2012');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (0.99, 'Savings', '07/11/2012');

-- START HAVE BOTH BANK ACCOUNTS LINKED WITH TRAVIS
-- Ballista
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '06/07/2011');
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5.00, 'Savings', '06/07/2011');

-- Sandra
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '06/12/2014');
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5.00, 'Savings', '06/12/2014');

-- Dan
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '12/12/2013');
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5.00, 'Savings', '12/12/2013');

-- END HAVE BOTH BANK ACCOUNTS LINKED WITH TRAVIS

-- Paul
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (1256.00, 'Checking', '07/22/2015');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (55548.00, 'Savings', '07/22/2015');

-- Quam
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '04/23/2014');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5541.00, 'Savings', '04/23/2014');

-- Landy
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '02/17/2014');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (500.00, 'Savings', '02/17/2014');

-- Ryan
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (32219.00, 'Checking', '12/12/2006');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (105000.00, 'Savings', '12/12/2006');

-- Bob
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (30.00, 'Checking', '07/22/2007');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5000.00, 'Savings', '07/22/2007');

-- Samuel
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (70.00, 'Checking', '04/23/2008');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (700.00, 'Savings', '04/23/2008');

-- Brian Bugle
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (7526.00, 'Checking', '02/17/2009');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (27564.00, 'Savings', '02/17/2009');

-- Cyan
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '11/12/2009');
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5.00, 'Savings', '11/12/2009');

-- Lobber
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '06/22/2012');
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5.00, 'Savings', '06/22/2012');

-- Sander
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '03/23/2013');
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5.00, 'Savings', '03/23/2013');

-- Brian Bagel
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (42065.00, 'Checking', '01/17/2011');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (211500.00, 'Savings', '01/17/2011');

-- Stella
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (2542.00, 'Checking', '10/12/2010');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5652.00, 'Savings', '10/12/2010');

-- Steven
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (2145.00, 'Checking', '05/22/2017');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5245.00, 'Savings', '05/22/2017');

-- Dusty
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (826.00, 'Checking', '04/20/2018');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5215.00, 'Savings', '04/20/2018');

-- Brian Blueberry
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (12000.00, 'Checking', '02/17/2016');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (56585.00, 'Savings', '02/17/2016');

-- Henry
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (215.00, 'Checking', '09/12/2010');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (7020.00, 'Savings', '09/12/2010');

-- Jo
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (412.00, 'Checking', '04/26/2013');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (45629.00, 'Savings', '04/26/2013');

-- Lazlo
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (312.00, 'Checking', '05/23/2019');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (5254.00, 'Savings', '05/23/2019');

-- Brian Brazen
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (8452.00, 'Checking', '06/17/2020');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (84526.00, 'Savings', '06/17/2020');

-- Sara
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (2000.00, 'Checking', '07/15/2004');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (2546.00, 'Savings', '07/15/2004');

-- Jason
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (3000.00, 'Checking', '02/22/2001');
-- INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (9820.00, 'Savings', '02/22/2001'); -- added comment to this because Jason shares both checking & savings account with Sara.

-- Dranner
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (2581.00, 'Checking', '05/10/2002');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (6254.00, 'Savings', '05/10/2002');

-- Brian Bison
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (30000.00, 'Checking', '06/19/2003');
INSERT INTO `Account` (`Balance`, `Type`, `DateCreated`) VALUES (545268.00, 'Savings', '06/19/2003');




-- Ronald
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (1, 1);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (1, 2);

-- Grimmace
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (2, 3);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (2, 4);

-- Big Bird
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (3, 5);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (3, 6);

-- Cookie Monster
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (4, 3); -- checking linked w/ Grimmace
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (4, 7);

-- Oscar
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (5, 8);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (5, 9);

-- Bert
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (6, 10);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (6, 11);

-- Earnie
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (7, 10); -- checking linked w/ Bert
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (7, 12);

-- Janice
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (8, 13);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (8, 14);

-- Jack
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (9, 15);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (9, 14); -- savings linked w/ Janice

-- Travis
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (10, 16);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (10, 17);

-- Ballista
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (11, 16); -- checking linked w/ Travis
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (11, 17); -- savings linked w/ Travis

-- Sandra
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (12, 16); -- checking linked w/ Travis
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (12, 17); -- savings linked w/ Travis

-- Dan
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (13, 16); -- checking linked w/ Travis
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (13, 17); -- savings linked w/ Travis

-- Paul
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (14, 18);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (14, 19);

-- Quam
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (15, 18); -- checking linked w/ Paul
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (15, 20);

-- Landy
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (16, 8); -- checking linked w/ Oscar
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (16, 21);

-- Ryan
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (17, 22);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (17, 23);

-- Bob
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (18, 24);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (18, 25);

-- Samuel
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (19, 26);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (19, 27);

-- Brian Bugle
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (20, 28);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (20, 29);

-- Cyan
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (21, 22); -- checking linked w/ Ryan
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (21, 23); -- savings linked w/ Ryan

-- Lobber
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (22, 24); -- checking linked w/ Bob
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (22, 25); -- savings linked w/ Bob

-- Sander
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (23, 26); -- checking linked w/ Samuel
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (23, 27); -- savings linked w/ Samuel

-- Brian Bagel
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (24, 30);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (24, 31);

-- Stella
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (25, 32);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (25, 33);

-- Steven
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (26, 34);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (26, 35);

-- Dusty
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (27, 36);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (27, 37);

-- Brian Blueberry
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (28, 38);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (28, 39);

-- Henry
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (29, 40);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (29, 41);

-- Jo
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (30, 42);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (30, 43);

-- Lazlo
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (31, 44);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (31, 45);

-- Brian Brazen
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (32, 46);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (32, 47);

-- Sara
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (33, 48);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (33, 49);

-- Jason
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (34, 48); -- checking linked w/ Sara
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (34, 49); -- savings linked w/ Sara

-- Dranner
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (35, 50);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (35, 51);

-- Brian Bison
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (36, 52);
INSERT INTO `CustomerAccount` (`CustId`, `AccountId`) VALUES (36, 53);


INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (4328656398588378, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5325453877662782, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (4593748888284356, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5358542236897382, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (4868249426959368, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5975922349248793, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (2288973546726938, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5785797699695957, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5968859256752335, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3343772289734928, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5749235456847562, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (9483763865835229, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5762363548733865, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (9538277583445722, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (2286974272384564, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (9555694665693698, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (8293965583972282, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3736673258984549, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (4949492226775296, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6569922276655349, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (2523275964663299, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (8984288297727273, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5469878254287729, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (4525648288854356, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (9968664258773369, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (2728327956469544, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6665839427855465, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6656966822776444, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3333936679832384, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (7485325457865769, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (8838456779624735, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (7887472334363969, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (7732267587653959, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5598688999454583, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5293847662375789, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (9863856355333695, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5392874229924948, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (4725364422562928, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6923853998886857, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5775275927992324, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (9492647569655524, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3939682694253795, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5374236885583886, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (8255298686394364, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (7558336426778377, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (8347662269846389, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (7449824536732427, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6838629257696883, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (2224542295924242, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (2464763652783467, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3923694659945558, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5982667945378353, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6393384736497832, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (2734478756888732, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (8299286778946833, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3847778423335676, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3723453752466547, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (7622979496729292, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (9576696389675973, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6373977755455837, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (4559284877479424, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (7753386225993388, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (2937953374998372, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (8674468436572677, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3688792465828496, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3565495633232799, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5267678589534396, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (9759695957743342, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6267727666794344, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (2749286752973338, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3876236745298372, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6655542734647399, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (8623766443697654, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (3336677947863996, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (6537579723985987, 'Visa', '04/01/2024', 500.00, 2000.00);

INSERT INTO `CreditCard` (`CardNumber`, `CardType`, `ExpDate`, `AvailCredit`, `CreditLimit`) VALUES (5253534232682349, 'Visa', '04/01/2024', 500.00, 2000.00);



INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (1, 1);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (1, 2);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (1, 3);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (2, 4);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (2, 5);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (2, 6);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (3, 7);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (3, 8);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (4, 9);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (4, 10);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (4, 11);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (5, 12);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (5, 13);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (6, 14);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (6, 15);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (7, 16);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (7, 17);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (7, 18);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (8, 19);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (9, 20);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (10, 21);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (10, 22);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (10, 23);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (10, 24);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (11, 25);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (12, 26);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (13, 27);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (14, 28);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (15, 29);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (16, 30);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (17, 31);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (18, 32);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (19, 33);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (20, 34);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (20, 35);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (20, 36);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (21, 37);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (22, 38);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (23, 39);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (24, 40);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (24, 41);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (24, 42);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (24, 43);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (24, 44);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (25, 45);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (25, 46);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (25, 47);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (25, 48);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (26, 49);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (26, 50);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (26, 51);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (26, 52);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (27, 53);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (27, 54);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (28, 55);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (28, 56);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (29, 57);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (29, 58);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (30, 59);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (30, 60);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (30, 61);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (31, 62);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (32, 63);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (32, 64);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (32, 65);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (33, 66);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (33, 67);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (34, 68);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (34, 69);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (34, 70);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (35, 71);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (35, 72);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (36, 73);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (36, 74);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (36, 75);

INSERT INTO `CustomerCreditCard` (`CustId`, `CardId`) VALUES (36, 76);