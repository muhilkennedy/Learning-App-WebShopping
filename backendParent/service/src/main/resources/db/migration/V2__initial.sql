/* Collection table tp store POS sale data */
CREATE TABLE IF NOT EXISTS pointofsale (pos JSON);
CREATE TABLE IF NOT EXISTS possync (customermobile varchar(15) UNIQUE, tenantid VARCHAR(50) NOT NULL);
CREATE TABLE IF NOT EXISTS possequence (currentsequencevalue int, incrementvalue int DEFAULT 1);

CREATE TABLE IF NOT EXISTS dashboardreport (tenantid varchar(50) NOT NULL UNIQUE, id int NOT NULL AUTO_INCREMENT PRIMARY KEY, totalemail int, totalsms int, emailtoday int, smstoday int, totalpos int, totalonline int, postoday int, onlinetoday int, FOREIGN KEY(tenantid) REFERENCES tenant(tenantid));

/* initial data load*/
INSERT INTO possequence VALUES (0, 1);

