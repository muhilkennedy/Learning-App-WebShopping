/* Collection table tp store POS sale data */
CREATE TABLE IF NOT EXISTS pointofsale (pos JSON);
CREATE TABLE IF NOT EXISTS possync (customermobile varchar(15) UNIQUE, tenantid VARCHAR(50) NOT NULL);
CREATE TABLE IF NOT EXISTS possequence (currentsequencevalue double, incrementvalue int DEFAULT 1);

CREATE TABLE IF NOT EXISTS dashboardreport (tenantid varchar(50) NOT NULL UNIQUE, id double NOT NULL AUTO_INCREMENT PRIMARY KEY, totalemail int, totalsms int, emailtoday int, smstoday int, totalpos int, totalonline int, postoday int, onlinetoday int, totalCustomers int, FOREIGN KEY(tenantid) REFERENCES tenant(tenantid));

CREATE TABLE IF NOT EXISTS deliveryconfiguration (tenantid varchar(50) NOT NULL, pincode varchar(20), deliverycharge int, minimumamtforfreedelivery int, deliveryfromtime varchar(20), deliverytilltime varchar(20), minimumdeliveryhours int, active BOOL default true, FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), UNIQUE KEY (tenantid, pincode));

/* initial data load*/
INSERT INTO possequence VALUES (0, 1);

