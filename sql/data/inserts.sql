LOAD DATA LOCAL INFILE './sql/data/publishers.csv' INTO TABLE publisher FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE './sql/data/members.csv' INTO TABLE member FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (memberID, MFirst, MLast, Street, Street_num, Postal_code, MBirthDate);
LOAD DATA LOCAL INFILE './sql/data/books.csv' INTO TABLE book FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (ISBN, title, pubYear, numPages, pubName);
LOAD DATA LOCAL INFILE './sql/data/authors.csv' INTO TABLE author FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (AFirst, ALast, ABirthdate);
LOAD DATA LOCAL INFILE './sql/data/written_by.csv' INTO TABLE written_by FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE './sql/data/employee.csv' INTO TABLE employee FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (EFirst, ELast, Salary);
LOAD DATA LOCAL INFILE './sql/data/permanent.csv' INTO TABLE permanent_employee FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE './sql/data/temporary.csv' INTO TABLE temporary_employee FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE './sql/data/copies.csv' INTO TABLE copies FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (ISBN, copyNr, shelf);
LOAD DATA LOCAL INFILE './sql/data/main_categories.csv' INTO TABLE category FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (categoryName);

LOAD DATA LOCAL INFILE './sql/data/categories.csv' INTO TABLE category FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE './sql/data/belongs_to.csv' INTO TABLE belongs_to FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE './sql/data/borrows.csv' INTO TABLE borrows FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (memberID, ISBN, copyNr, date_of_borrowing);
LOAD DATA LOCAL INFILE './sql/data/old_borrows.csv' INTO TABLE borrows FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (memberID, ISBN, copyNr, date_of_borrowing, date_of_return);
LOAD DATA LOCAL INFILE './sql/data/reminders.csv' INTO TABLE reminder FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
