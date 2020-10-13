/* Collection table tp store POS sale data */
CREATE TABLE IF NOT EXISTS POINTOFSALE (POS JSON);
CREATE TABLE IF NOT EXISTS POSSYNC (CUSTOMERMOBILE varchar(15) UNIQUE, TENANTID VARCHAR(50) NOT NULL);
CREATE TABLE IF NOT EXISTS POSSEQUENCE (CURRENTSEQUENCVALUE int, INCREMENTVALUE int DEFAULT 1);

/* initial data load*/
INSERT INTO POSSEQUENCE VALUES (1, 1);