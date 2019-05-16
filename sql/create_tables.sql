DROP DATABASE IF EXISTS library;
CREATE DATABASE library;

USE library;

CREATE TABLE member(
    memberID INTEGER NOT NULL AUTO_INCREMENT,
    MFirst VARCHAR(20) NOT NULL,
    MLast VARCHAR(25),
    Street VARCHAR(25),
    Street_num SMALLINT,
    Postal_code SMALLINT,
    MBirthdate VARCHAR(30),
    PRIMARY KEY(memberID)
);

CREATE TABLE publisher(
    pubName VARCHAR(30) NOT NULL,
    estYear INTEGER,
    Street VARCHAR(25),
    Street_num SMALLINT,
    Postal_code SMALLINT,
    PRIMARY KEY(pubName)
);

CREATE TABLE book(
    ISBN VARCHAR(30) NOT NULL,
    title VARCHAR(50) NOT NULL DEFAULT '',
    pubYear INTEGER,
    numPages INTEGER,
    pubName VARCHAR(50),
    PRIMARY KEY(ISBN),
    FOREIGN KEY(pubName) REFERENCES publisher(pubName)
);

CREATE TABLE author(
    authID INTEGER NOT NULL AUTO_INCREMENT,
    AFirst VARCHAR(20) NOT NULL,
    ALast VARCHAR(25),
    ABirthdate VARCHAR(30),
    PRIMARY KEY(authID)
);

CREATE TABLE copies(
    ISBN VARCHAR(30) NOT NULL,
    copyNr INTEGER NOT NULL,
    shelf VARCHAR(15) ,
    PRIMARY KEY (ISBN,copyNr),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN)
);

CREATE TABLE category(
    categoryName VARCHAR(25) NOT NULL,
    supercategoryName VARCHAR(25),
    PRIMARY KEY (categoryName),
    FOREIGN KEY (supercategoryName) REFERENCES category(categoryName)
);

CREATE TABLE employee(
    empID INTEGER NOT NULL,
    EFirst VARCHAR(20) NOT NULL,
    ELast VARCHAR(25),
    SALARY INTEGER,
    PRIMARY KEY(empID)
);

CREATE TABLE permanent_employee(
    empID INTEGER NOT NULL,
    HiringDate VARCHAR(30),
    PRIMARY KEY (empID),
    FOREIGN KEY (empID) REFERENCES employee(empID)
);

CREATE TABLE temporary_employee(
    empID INTEGER NOT NULL,
    ContrantNr INTEGER,
    PRIMARY KEY (empID),
    FOREIGN KEY (empID) REFERENCES employee(empID)
);

CREATE TABLE borrows(
    memberID INTEGER NOT NULL,
    ISBN VARCHAR(30) NOT NULL,
    copyNr INTEGER NOT NULL,
    date_of_borrowing VARCHAR(20) NOT NULL,
    date_of_return VARCHAR(20),
    PRIMARY KEY (memberID, ISBN, copyNr, date_of_borrowing),
    FOREIGN KEY (memberID) REFERENCES member(memberID),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN),
    FOREIGN KEY (ISBN, copyNr) REFERENCES copies(ISBN, copyNr)
);

CREATE TABLE belongs_to(
    ISBN VARCHAR(30) NOT NULL,
    categoryName VARCHAR(25) NOT NULL,
    PRIMARY KEY (ISBN, categoryName),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN),
    FOREIGN KEY (categoryName) REFERENCES category(categoryName)
);

CREATE TABLE written_by(
    ISBN VARCHAR(30) NOT NULL,
    authID INTEGER NOT NULL,
    PRIMARY KEY(ISBN, authID),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN),
    FOREIGN KEY (authID) REFERENCES author(authID)
);

CREATE TABLE reminder(
    memberID INTEGER NOT NULL,
    empID INTEGER NOT NULL,
    ISBN VARCHAR(30) NOT NULL,
    copyNr INTEGER NOT NULL,
    date_of_borrowing VARCHAR(20) NOT NULL,
    date_of_reminder VARCHAR(20) NOT NULL,
    PRIMARY KEY (memberID, empID, ISBN, copyNr, date_of_borrowing, date_of_reminder),
    FOREIGN KEY (empID) REFERENCES employee(empID),
    FOREIGN KEY (memberID) REFERENCES member(memberID),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN),
    FOREIGN KEY (memberID, ISBN, copyNr, date_of_borrowing) REFERENCES borrows(memberID, ISBN, copyNr, date_of_borrowing),
    FOREIGN KEY (ISBN, copyNr) REFERENCES copies(ISBN, copyNr)
);
