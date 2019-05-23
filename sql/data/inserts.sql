LOAD DATA LOCAL INFILE './sql/data/publisher.csv' INTO TABLE publisher FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE './sql/data/members.csv' INTO TABLE member FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

INSERT INTO library.book(ISBN, title, pubYear, numPages, pubName) VALUES(9789603307, 'Digital Signal Proccessing', 1999, 978, 'Fountas');
INSERT INTO library.book(ISBN, title, pubYear, numPages, pubName) VALUES(9710603307, 'Signals and Systems', 1995, 1015, 'Fountas');
INSERT INTO library.book(ISBN, title, pubYear, numPages, pubName) VALUES(9712647888, 'Circuit Analysis', 1990, 568, 'Fountas');
INSERT INTO library.book(ISBN, title, pubYear, numPages, pubName) VALUES(9730553210, 'Mathematical Analysis I', 2003, 1235, 'Simmetria');

INSERT INTO library.author(AFirst, ALast, ABirthdate) VALUES('Alan','Oppenheim','1937-11-7');
INSERT INTO library.author(AFirst, ALast, ABirthdate) VALUES('Themistoklis','Rassias','1951-4-2');

INSERT INTO library.written_by(ISBN, authID) VALUES(9789603307,1);
INSERT INTO library.written_by(ISBN, authID) VALUES(9730553210,2);
