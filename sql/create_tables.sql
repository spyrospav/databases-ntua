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
