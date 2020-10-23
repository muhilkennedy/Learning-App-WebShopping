/* Collection table tp store POS sale data */
CREATE TABLE IF NOT EXISTS pointofsale (pos JSON);
CREATE TABLE IF NOT EXISTS possync (customermobile varchar(15) UNIQUE, tenantid VARCHAR(50) NOT NULL);
CREATE TABLE IF NOT EXISTS possequence (currentsequencevalue int, incrementvalue int DEFAULT 1);

/* initial data load*/
INSERT INTO possequence VALUES (1, 1);