DROP DATABASE IF EXISTS library;
CREATE DATABASE library;

USE library;

CREATE TABLE member(
    memberID INTEGER NOT NULL AUTO_INCREMENT,
    MFirst VARCHAR(20) NOT NULL,
    MLast VARCHAR(25),
    Street VARCHAR(25),
    Street_num SMALLINT,
    Postal_code VARCHAR(10),
    MBirthdate DATE,
    current_borrows SMALLINT DEFAULT 0,
    PRIMARY KEY(memberID)
);

ALTER TABLE member AUTO_INCREMENT = 1001;

CREATE TABLE publisher(
    pubName VARCHAR(50) NOT NULL,
    estYear YEAR,
    Street VARCHAR(25),
    Street_num SMALLINT,
    Postal_code VARCHAR(10),
    PRIMARY KEY(pubName)
);

CREATE TABLE book(
    ISBN VARCHAR(30) NOT NULL,
    title VARCHAR(70) NOT NULL,
    pubYear YEAR,
    numPages SMALLINT,
    pubName VARCHAR(50),
    remaining INTEGER DEFAULT 0,
    PRIMARY KEY(ISBN),
    FOREIGN KEY(pubName) REFERENCES publisher(pubName) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE author(
    authID INTEGER NOT NULL AUTO_INCREMENT,
    AFirst VARCHAR(20) NOT NULL,
    ALast VARCHAR(25) NOT NULL,
    /*AFull VARCHAR (50) AS (AFirst + ALast),*/
    ABirthdate DATE,
    PRIMARY KEY(authID)
);

CREATE TABLE written_by(
    ISBN VARCHAR(30) NOT NULL,
    authID INTEGER NOT NULL,
    PRIMARY KEY(ISBN, authID),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (authID) REFERENCES author(authID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE copies(
    ISBN VARCHAR(30) NOT NULL,
    copyNr INTEGER NOT NULL,
    available BOOLEAN DEFAULT true,
    shelf VARCHAR(15) ,
    PRIMARY KEY (ISBN,copyNr),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE borrows(
    memberID INTEGER NOT NULL,
    ISBN VARCHAR(30) NOT NULL,
    copyNr INTEGER NOT NULL,
    date_of_borrowing DATE NOT NULL,
    due_date DATE AS (DATE_ADD(date_of_borrowing, INTERVAL 30 DAY)),
    date_of_return DATE,
    PRIMARY KEY (memberID, ISBN, copyNr, date_of_borrowing),
    FOREIGN KEY (memberID) REFERENCES member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (ISBN) REFERENCES book(ISBN) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ISBN, copyNr) REFERENCES copies(ISBN, copyNr) ON UPDATE CASCADE
);

CREATE TABLE category(
    categoryName VARCHAR(25),
    supercategoryName VARCHAR(25),
    PRIMARY KEY (categoryName),
    FOREIGN KEY (supercategoryName) REFERENCES category(categoryName)
);

CREATE TABLE belongs_to(
    ISBN VARCHAR(30) NOT NULL,
    categoryName VARCHAR(25),
    PRIMARY KEY (ISBN, categoryName),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (categoryName) REFERENCES category(categoryName) ON DELETE CASCADE
);

CREATE TABLE employee(
    empID INTEGER NOT NULL AUTO_INCREMENT,
    EFirst VARCHAR(20) NOT NULL,
    ELast VARCHAR(25),
    Salary INTEGER,
    PRIMARY KEY(empID)
);

CREATE TABLE permanent_employee(
    empID INTEGER NOT NULL,
    HiringDate DATE,
    PRIMARY KEY (empID),
    FOREIGN KEY (empID) REFERENCES employee(empID) ON DELETE CASCADE
);

CREATE TABLE temporary_employee(
    empID INTEGER NOT NULL,
    ContractNr INTEGER AS (empID+3000),
    PRIMARY KEY (empID),
    FOREIGN KEY (empID) REFERENCES employee(empID) ON DELETE CASCADE
);

CREATE TABLE reminder(
    memberID INTEGER NOT NULL,
    empID INTEGER NOT NULL,
    ISBN VARCHAR(30) NOT NULL,
    copyNr INTEGER NOT NULL,
    date_of_borrowing DATE NOT NULL,
    date_of_reminder DATE NOT NULL,
    PRIMARY KEY (memberID, empID, ISBN, copyNr, date_of_borrowing, date_of_reminder),
    FOREIGN KEY (empID) REFERENCES employee(empID),
    FOREIGN KEY (memberID) REFERENCES member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (ISBN) REFERENCES book(ISBN) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (memberID, ISBN, copyNr, date_of_borrowing) REFERENCES borrows(memberID, ISBN, copyNr, date_of_borrowing)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ISBN, copyNr) REFERENCES copies(ISBN, copyNr)
);

CREATE VIEW member_view AS
SELECT memberID, MFirst, MLast, Street, Street_num, Postal_code, MBirthdate
FROM member;

CREATE VIEW book_view AS
SELECT title, B.ISBN, pubName, pubYear, numPages, remaining, COUNT(*) AS total
FROM book AS B, copies AS C
WHERE B.ISBN = C.ISBN
GROUP BY ISBN;

CREATE TRIGGER increaseRemainingCopiesAdd
AFTER INSERT ON copies
FOR EACH ROW
    UPDATE book AS b
    SET remaining = remaining +1
    WHERE b.ISBN = new.ISBN;

DELIMITER $$
CREATE TRIGGER decreaseRemainingCopiesBorrow
AFTER INSERT ON borrows
FOR EACH ROW
BEGIN
IF (new.date_of_return IS NULL) THEN
    UPDATE book AS b
    SET remaining = remaining - 1
    WHERE b.ISBN = new.ISBN;
END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER increaseRemainingCopiesBorrow
AFTER UPDATE ON borrows
FOR EACH ROW
BEGIN
IF (new.date_of_return IS NOT NULL AND old.date_of_return IS NULL) THEN
    UPDATE book AS b
    SET remaining = remaining + 1
    WHERE b.ISBN = new.ISBN;
END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER increaseCurrentBorrows
AFTER INSERT ON borrows
FOR EACH ROW
BEGIN
IF (new.date_of_return IS NULL) THEN
    UPDATE member AS m
    SET m.current_borrows = m.current_borrows + 1
    WHERE m.memberID = new.memberID;
END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER decreaseCurrentBorrows
AFTER UPDATE ON borrows
FOR EACH ROW
BEGIN
IF (new.date_of_return IS NOT NULL AND old.date_of_return IS NULL) THEN
    UPDATE member AS m
    SET m.current_borrows = m.current_borrows - 1
    WHERE m.memberID = new.memberID;
END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER checkCurrentBorrows
BEFORE UPDATE ON member
FOR EACH ROW
BEGIN
    IF (old.current_borrows=5 AND new.current_borrows=6) THEN
    SIGNAL SQLSTATE '10000'
        SET MESSAGE_TEXT = 'User has already 5 borrowed books';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER makeCopyUnavailable
AFTER INSERT ON borrows
FOR EACH ROW
BEGIN
IF (new.date_of_return IS NULL) THEN
    UPDATE copies AS c
    SET c.available = false
    WHERE c.ISBN = new.ISBN AND c.copyNr = new.copyNr;
END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER makeCopyAvailable
AFTER UPDATE ON borrows
FOR EACH ROW
BEGIN
IF (new.date_of_return IS NOT NULL AND old.date_of_return IS NULL) THEN
    UPDATE copies AS c
    SET c.available = true
    WHERE c.ISBN = new.ISBN AND c.copyNr = new.copyNr;
END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER addPublisher
BEFORE INSERT on book
FOR EACH ROW
BEGIN
IF (new.pubName NOT IN (SELECT P.pubName FROM publisher as P)) THEN
    INSERT INTO publisher(pubName) VALUES (new.pubName);
END IF;
END$$
DELIMITER ;

CREATE TRIGGER DeleteBorrows
BEFORE DELETE on book
FOR EACH ROW
    DELETE FROM borrows
    WHERE ISBN = old.ISBN;


DELIMITER $$
CREATE TRIGGER updateMemberAtDeleteBorrows
BEFORE DELETE on borrows
FOR EACH ROW
BEGIN
IF (old.date_of_return IS NULL) THEN
    UPDATE member as M
    SET M.current_borrows = M.current_borrows - 1
    WHERE M.memberID = old.memberID;
END IF;
END$$
DELIMITER ;
