/* BASE TRANSACTION TABLES */
CREATE TABLE IF NOT EXISTS TENANT (TENANTID varchar(50) NOT NULL PRIMARY KEY, TENANTUNIQUENAME varchar(50) NOT NULL UNIQUE, ACTIVE BOOL DEFAULT TRUE, PURGETENANT BOOL DEFAULT FALSE, PUBLICKEY varchar(2000), PRIVATEKEY varchar(2000));
CREATE TABLE IF NOT EXISTS TENANTDETAILS (TENANTID varchar(50) NOT NULL UNIQUE, TENANTDETAILID int NOT NULL AUTO_INCREMENT PRIMARY KEY, TENANTCONTACT varchar(10), TENANTEMAIL varchar(100), TENANTBUSINESSEMAIL varchar(100) NOT NULL, BUSINESSEMAILPASSWORD varchar(2000) NOT NULL, TENANTSTREET varchar(100), TENANTCITY varchar(50), TENANTPIN varchar(10), TENANTLOGO MEDIUMBLOB, TENANTFACEBOOK varchar(100), TENANTTWITTER varchar(100), TENANTINSTA varchar(100), CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID));
CREATE TABLE IF NOT EXISTS TENANTCORSMAPPING (TENANTID varchar(50) NOT NULL, ORIGIN varchar(300), CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID));
CREATE TABLE IF NOT EXISTS SCHEDULEDTASKAUDIT (TENANTID varchar(50) NOT NULL, AUDITID int NOT NULL AUTO_INCREMENT PRIMARY KEY, TASKNAME varchar(75) NOT NULL, STARTTIME DATETIME DEFAULT CURRENT_TIMESTAMP, ENDTIME DATETIME , STATUS varchar(25), FAILUREINFO varchar(1000), CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID));
CREATE TABLE IF NOT EXISTS FEATURETOGGLE (FEATUREID int NOT NULL AUTO_INCREMENT PRIMARY KEY, FEATURENAME varchar(30) NOT NULL UNIQUE, ACTIVE BOOL DEFAULT FALSE);
CREATE TABLE IF NOT EXISTS HOMEPAGEMEDIA (TENANTID varchar(50) NOT NULL, MEDIAID int NOT NULL AUTO_INCREMENT PRIMARY KEY, IMAGE MEDIUMBLOB, TITLE varchar(50), DESCRIPTION varchar(100), MESSAGE varchar(30), SHOPNOW BOOL DEFAULT FALSE, CONTACT BOOL DEFAULT FALSE, SLIDESHOW BOOL DEFAULT TRUE, CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID));
/* product ID field has to be implemented later in HOMEPAGEFEATURED table*/
CREATE TABLE IF NOT EXISTS HOMEPAGEFEATURED (TENANTID varchar(50) NOT NULL, CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID));
CREATE TABLE IF NOT EXISTS EMPLOYEEINFO (TENANTID varchar(50) NOT NULL, EMPLOYEEID int NOT NULL AUTO_INCREMENT PRIMARY KEY, FNAME varchar(50) NOT NULL, LNAME varchar(50) NOT NULL, EMAILID varchar(100) NOT NULL UNIQUE, MOBILE varchar(15) UNIQUE, PASSWORD varchar(100), DESIGNATION varchar(50), ACTIVE BOOL DEFAULT TRUE, LASTLOGIN DATETIME DEFAULT CURRENT_TIMESTAMP, ISLOGGEDIN BOOL DEFAULT FALSE, DOB DATETIME, GENDER varchar(10), PROFILEPIC MEDIUMBLOB, CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID));
CREATE TABLE IF NOT EXISTS EMPLOYEEADDRESS (TENANTID varchar(50) NOT NULL,EMPLOYEEID int NOT NULL, ADDRESSID int NOT NULL AUTO_INCREMENT PRIMARY KEY, DOORNUMBER varchar(10) NOT NULL, STREET varchar(100) NOT NULL, CITY varchar(75) NOT NULL, STATE varchar(75) NOT NULL, PINCODE varchar(20) NOT NULL,  CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID), CONSTRAINT FOREIGN KEY(EMPLOYEEID) REFERENCES EMPLOYEEINFO(EMPLOYEEID));
CREATE TABLE IF NOT EXISTS EMPLOYEEPERMISSIONS (PERMISSIONID int NOT NULL AUTO_INCREMENT PRIMARY KEY, PERMISSIONNAME varchar(50) NOT NULL);
CREATE TABLE IF NOT EXISTS EMPLOYEEPERMISSIONSMAP (TENANTID varchar(50) NOT NULL, EMPLOYEEID int NOT NULL, PERMISSIONID int NOT NULL, MAPID int NOT NULL AUTO_INCREMENT PRIMARY KEY, CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID), CONSTRAINT FOREIGN KEY(EMPLOYEEID) REFERENCES EMPLOYEEINFO(EMPLOYEEID), CONSTRAINT FOREIGN KEY(PERMISSIONID) REFERENCES EMPLOYEEPERMISSIONS(PERMISSIONID));
CREATE TABLE IF NOT EXISTS COUPONS (TENANTID varchar(50), COUPONID int NOT NULL AUTO_INCREMENT PRIMARY KEY, TITLE varchar(100) not null, CODE varchar(64) NOT NULL, DISCOUNT int, STARTDATE DATETIME DEFAULT CURRENT_TIMESTAMP, ENDDATE DATETIME, FREESHIPPING BOOL DEFAULT FALSE, USERUSAGE int, ACTIVE BOOL DEFAULT TRUE, CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID));
CREATE TABLE IF NOT EXISTS TODO (TENANTID varchar(50) NOT NULL, EMPLOYEEID int NOT NULL, TODOID int NOT NULL AUTO_INCREMENT PRIMARY KEY, CONTENT varchar(1000), ISDONE BOOL DEFAULT FALSE, CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID), CONSTRAINT FOREIGN KEY(EMPLOYEEID) REFERENCES EMPLOYEEINFO(EMPLOYEEID));
CREATE TABLE IF NOT EXISTS TASK (TENANTID varchar(50) NOT NULL, EMPLOYEEID int NOT NULL, TASKID int NOT NULL AUTO_INCREMENT PRIMARY KEY, CONTENT varchar(1000), STATUS varchar(20), ASSIGNEE int NOT NULL, ENDDATE DATETIME, CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID), CONSTRAINT FOREIGN KEY(EMPLOYEEID) REFERENCES EMPLOYEEINFO(EMPLOYEEID), CONSTRAINT FOREIGN KEY(ASSIGNEE) REFERENCES EMPLOYEEINFO(EMPLOYEEID));
CREATE TABLE IF NOT EXISTS PUSHNOTIFICATION (TENANTID varchar(50) NOT NULL, EMPLOYEEID int NOT NULL, NOTIFICATIONID int NOT NULL AUTO_INCREMENT PRIMARY KEY, NOTIFICATONCONTENT varchar(250), CONSTRAINT FOREIGN KEY(TENANTID) REFERENCES TENANT(TENANTID), CONSTRAINT FOREIGN KEY(EMPLOYEEID) REFERENCES EMPLOYEEINFO(EMPLOYEEID));


/* Standard Permissions load*/
INSERT INTO EMPLOYEEPERMISSIONS (PERMISSIONID, PERMISSIONNAME) VALUES (1, 'ADMIN');
INSERT INTO EMPLOYEEPERMISSIONS (PERMISSIONID, PERMISSIONNAME) VALUES (2, 'MANAGER');
INSERT INTO EMPLOYEEPERMISSIONS (PERMISSIONID, PERMISSIONNAME) VALUES (3, 'MARKETING');
INSERT INTO EMPLOYEEPERMISSIONS (PERMISSIONID, PERMISSIONNAME) VALUES (4, 'SUPPORT');


/* initial data load */
insert into tenant (tenantid, tenantuniquename) values ('devTenant', 'devRealm');
insert into tenantdetails (tenantid, tenantdetailid, tenantcontact, tenantemail, tenantbusinessemail, businessemailpassword, tenantstreet, tenantcity, tenantpin, tenantfacebook, tenanttwitter, tenantinsta) values ('devTenant', 1, '1234567890', 'nuttyShop@gmail.com', 'do.not.reply.application.ordering@gmail.com', 'devPassword@123', '13, B block, Nelson Road', 'Chennai', '600028', 'https://www.facebook.com/', 'https://twitter.com/', 'https://www.instagram.com/');
insert into homepagemedia (tenantid, mediaid, title, description, message, shopnow, contact, slideshow) values ('devTenant', 1, 'EAT the BEST, LEAVE the REST', 'Train your body to healthy Food', 'Exciting Offers', true, false, false);
insert into homepagemedia (tenantid, mediaid, title, description, message, shopnow, contact, slideshow) values ('devTenant', 2, 'Get a Free Quote', 'Get Bulk bookings and avail exclusive offers and free delivery', 'Free Quotes', false, true, false);
insert into homepagemedia (tenantid, mediaid, title, description, message, shopnow, contact, slideshow) values ('devTenant', 3, '', '', '', false, false, true);
insert into homepagemedia (tenantid, mediaid, title, description, message, shopnow, contact, slideshow) values ('devTenant', 4, '', '', '', false, false, true);
insert into homepagemedia (tenantid, mediaid, title, description, message, shopnow, contact, slideshow) values ('devTenant', 5, '', '', '', false, false, true);
insert into employeeinfo (tenantid, employeeid ,fname, lname, emailid, mobile, password, designation) values ('devTenant', 1, 'SUPERUSER', 'DEV', 'q@1', '1234567890', '$2a$05$FueeaV.hfKbv/m6kG6GM../gKdRPOoihCQF1WBjpAPZNDlGPOxSha', 'SUPPORTADMIN'); /* password is test*/
insert into employeeaddress (tenantid, employeeid, doornumber, street, city, state, pincode) values ('devTenant', 1, 'No:13', 'street', 'city', 'state', 'pin007');
insert into employeepermissionsmap (tenantid, employeeid, permissionid) values ('devTenant', 1, 1);
insert into employeepermissionsmap (tenantid, employeeid, permissionid) values ('devTenant', 1, 2);
insert into employeepermissionsmap (tenantid, employeeid, permissionid) values ('devTenant', 1, 3);
insert into employeepermissionsmap (tenantid, employeeid, permissionid) values ('devTenant', 1, 4);
