INSERT INTO library.member(MFirst, MLast, Street, Street_num, Postal_code, MBirthdate) VALUES('Spyros', 'Pavlatos', 'Prigkipos', 40, 16673, '1998-6-6');
INSERT INTO library.member(MFirst, MLast, Street, Street_num, Postal_code, MBirthdate) VALUES('Jason', 'Bakaliaros', 'Drosias', 5, 17114, '1998-5-2');
INSERT INTO library.member(MFirst, MLast, Street, Street_num, Postal_code, MBirthdate) VALUES('Chariton', 'Charitonidis', 'Saronidas', 3, 13451, '1998-7-15');

INSERT INTO library.publisher(pubName, estYear, Street, Street_num, Postal_code) VALUES('Fountas', 1995, 'Athinas', 47, 11177);
INSERT INTO library.publisher(pubName, estYear, Street, Street_num, Postal_code) VALUES('Tziolas', 1995, 'Akadimias', 12, 11174);


INSERT INTO library.book(ISBN, title, pubYear, numPages, pubName) VALUES(9789603307, 'Digital Signal Proccessing', 1999, 978, 'Fountas');
INSERT INTO library.book(ISBN, title, pubYear, numPages, pubName) VALUES(9710603307, 'Signals and Systems', 1995, 1015, 'Fountas');
INSERT INTO library.book(ISBN, title, pubYear, numPages, pubName) VALUES(9712647888, 'Circuit Analysis', 1990, 568, 'Fountas');

INSERT INTO library.author(AFirst, ALast, ABirthdate) VALUES('Alan','Oppenheim','1937-11-7');

INSERT INTO library.written_by(ISBN, authID) VALUES(9789603307,1);
