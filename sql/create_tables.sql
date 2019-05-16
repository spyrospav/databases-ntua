DROP DATABASE IF EXISTS library;
CREATE DATABASE library;

USE library;

CREATE TABLE member(
    memberID INTEGER NOT NULL,
    Mfirst VARCHAR(20) NOT NULL,
    Mlast VARCHAR(25),
    Street VARCHAR(25),
    Street_num SMALLINT,
    Postal_code SMALLINT,
    Mbirthdate VARCHAR(30),
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
    authID INTEGER NOT NULL,
    Afirst VARCHAR(20) NOT NULL,
    Alast VARCHAR(25),
    Abirthdate VARCHAR(30),
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
