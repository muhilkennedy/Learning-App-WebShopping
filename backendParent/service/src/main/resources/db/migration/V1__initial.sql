/* BASE TRANSACTION TABLES */
CREATE TABLE IF NOT EXISTS tenant (tenantid varchar(50) NOT NULL PRIMARY KEY, tenantuniquename varchar(50) NOT NULL UNIQUE, active BOOL DEFAULT TRUE, purgetenant BOOL DEFAULT FALSE, publickey varchar(5000), privatekey varchar(5000));
CREATE TABLE IF NOT EXISTS tenantdetails (tenantid varchar(50) NOT NULL UNIQUE, tenantdetailid int NOT NULL AUTO_INCREMENT PRIMARY KEY, tenantcontact varchar(10), tenantemail varchar(100), tenantbusinessemail varchar(100) NOT NULL, businessemailpassword varchar(2000) NOT NULL, tenantstreet varchar(100), tenantcity varchar(50), tenantpin varchar(10), TENANTLOGO MEDIUMBLOB, tenantfacebook varchar(100), tenanttwitter varchar(100), tenantinsta varchar(100), GSTIN varchar(50), CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid));
CREATE TABLE IF NOT EXISTS tenantcorsmapping (tenantid varchar(50) NOT NULL, origin varchar(300), CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid));
CREATE TABLE IF NOT EXISTS scheduledtaskaudit (tenantid varchar(50) NOT NULL, auditid int NOT NULL AUTO_INCREMENT PRIMARY KEY, taskname varchar(75) NOT NULL, starttime DATETIME DEFAULT CURRENT_TIMESTAMP, endtime DATETIME , status varchar(25), failureinfo varchar(1000));
CREATE TABLE IF NOT EXISTS featuretoggle (featureid int NOT NULL AUTO_INCREMENT PRIMARY KEY, featurename varchar(30) NOT NULL UNIQUE, active BOOL DEFAULT FALSE);

/* Employee tables*/
CREATE TABLE IF NOT EXISTS employeeinfo (tenantid varchar(50) NOT NULL, employeeid int NOT NULL AUTO_INCREMENT PRIMARY KEY, fname varchar(50) NOT NULL, lname varchar(50) NOT NULL, emailid varchar(100) NOT NULL, mobile varchar(15), password varchar(100), designation varchar(50), active BOOL DEFAULT TRUE, lastlogin double, isloggedin BOOL DEFAULT FALSE, dob DATETIME, gender varchar(10), profilepic MEDIUMBLOB, pickuporders BOOL DEFAULT FALSE, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), UNIQUE KEY (tenantid, emailid), UNIQUE KEY (tenantid, mobile) );
CREATE TABLE IF NOT EXISTS employeeaddress (tenantid varchar(50) NOT NULL,employeeid int NOT NULL, addressid int NOT NULL AUTO_INCREMENT PRIMARY KEY, doornumber varchar(10) NOT NULL, street varchar(100) NOT NULL, city varchar(75) NOT NULL, state varchar(75) NOT NULL, pincode varchar(20) NOT NULL, addressproof MEDIUMBLOB, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(employeeid) REFERENCES employeeinfo(employeeid));
CREATE TABLE IF NOT EXISTS employeepermissions (permissionid int NOT NULL AUTO_INCREMENT PRIMARY KEY, permissionname varchar(50) NOT NULL);
CREATE TABLE IF NOT EXISTS employeepermissionsmap (tenantid varchar(50) NOT NULL, employeeid int NOT NULL, permissionid int NOT NULL, mapid int NOT NULL AUTO_INCREMENT PRIMARY KEY, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(employeeid) REFERENCES employeeinfo(employeeid), CONSTRAINT FOREIGN KEY(permissionid) REFERENCES employeepermissions(permissionid));

/* Customer tables */
CREATE TABLE IF NOT EXISTS customerinfo (tenantid varchar(50) NOT NULL, customerid int NOT NULL PRIMARY KEY, fname varchar(50) NOT NULL, lname varchar(50) NOT NULL, emailid varchar(100) NOT NULL, mobile varchar(2000), password varchar(100), active BOOL DEFAULT TRUE, lastlogin double, profilepic MEDIUMBLOB, loginvia varchar(25), profilePicUrl varchar(200), loyalitypoint DECIMAL(4,2), CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid));
CREATE TABLE IF NOT EXISTS customeraddress (tenantid varchar(50) NOT NULL, customerid int NOT NULL, addressid int NOT NULL AUTO_INCREMENT PRIMARY KEY, doornumber varchar(10) NOT NULL, street varchar(200) NOT NULL, city varchar(75) NOT NULL, state varchar(75) NOT NULL, pincode varchar(20) NOT NULL, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(customerid) REFERENCES customerinfo(customerid));

/* Tasks and notifiactions */
CREATE TABLE IF NOT EXISTS todo (tenantid varchar(50) NOT NULL, employeeid int NOT NULL, todoid int NOT NULL AUTO_INCREMENT PRIMARY KEY, content varchar(1000), isdone BOOL DEFAULT FALSE, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(employeeid) REFERENCES employeeinfo(employeeid));
CREATE TABLE IF NOT EXISTS task (tenantid varchar(50) NOT NULL, employeeid int NOT NULL, taskid int NOT NULL AUTO_INCREMENT PRIMARY KEY, content varchar(1000), status varchar(20), assignee int NOT NULL, enddate double, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(employeeid) REFERENCES employeeinfo(employeeid), CONSTRAINT FOREIGN KEY(assignee) REFERENCES employeeinfo(employeeid));
CREATE TABLE IF NOT EXISTS pushnotification (tenantid varchar(50) NOT NULL, employeeid int NOT NULL, notificationid int NOT NULL AUTO_INCREMENT PRIMARY KEY, notificationcontent varchar(250), CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(employeeid) REFERENCES employeeinfo(employeeid));

/* product related tables*/
CREATE TABLE IF NOT EXISTS category (tenantid varchar(50) NOT NULL, categoryid int NOT NULL AUTO_INCREMENT PRIMARY KEY, categoryname varchar(50) NOT NULL, parentcategoryid int DEFAULT NULL, active BOOL DEFAULT TRUE, markedfordelete BOOL DEFAULT FALSE, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(parentcategoryid) REFERENCES category(categoryid));
CREATE TABLE IF NOT EXISTS product (tenantid varchar(50) NOT NULL, categoryid int, productid int NOT NULL AUTO_INCREMENT PRIMARY KEY, productname varchar(50) NOT NULL, brand varchar(50) NOT NULL, cost DECIMAL(12,2) NOT NULL, offer DECIMAL(4,2) DEFAULT 0, description varchar(300) NOT NULL, productcode varchar(50) UNIQUE, unitsinstock int DEFAULT 0, lastmodified double, lastmodifiedemployeeid int, active BOOL DEFAULT TRUE, isdeleted BOOL DEFAULT FALSE, productrating int DEFAULT 0, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(categoryid) REFERENCES category(categoryid), CONSTRAINT FOREIGN KEY(lastmodifiedemployeeid) REFERENCES employeeinfo(employeeid));
CREATE TABLE IF NOT EXISTS productimages (tenantid varchar(50) NOT NULL, productimagesid int NOT NULL AUTO_INCREMENT PRIMARY KEY, productid int NOT NULL, image MEDIUMBLOB, primaryimage BOOL DEFAULT FALSE, CONSTRAINT FOREIGN KEY(productid) REFERENCES product(productid), CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid));
CREATE TABLE IF NOT EXISTS productreview (tenantid varchar(50) NOT NULL, productreviewid int NOT NULL AUTO_INCREMENT PRIMARY KEY, customerid int NOT NULL, productid int NOT NULL, rating int NOT NULL, review varchar(500) NOT NULL, reviewheader varchar(100) NOT NULL, usefullcount int, CONSTRAINT FOREIGN KEY(productid) REFERENCES product(productid), CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(customerid) REFERENCES customerinfo(customerid));
CREATE TABLE IF NOT EXISTS productreviewsync (review JSON);

/* Coupons related tables */
CREATE TABLE IF NOT EXISTS coupons (tenantid varchar(50) NOT NULL, couponid int NOT NULL AUTO_INCREMENT PRIMARY KEY, title varchar(100) not null, code varchar(64) NOT NULL, discount int, startdate double, enddate double, freeshipping BOOL DEFAULT FALSE, userusage int, active BOOL DEFAULT TRUE, isdeleted BOOL DEFAULT FALSE, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid));
CREATE TABLE IF NOT EXISTS couponapplicable (tenantid varchar(50) NOT NULL, couponid int, categoryid  int, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(couponid) REFERENCES coupons(couponid), CONSTRAINT FOREIGN KEY(categoryid) REFERENCES category(categoryid));

/* Purchase and Order tables*/
CREATE TABLE IF NOT EXISTS customercart (tenantid varchar(50) NOT NULL, customerid int, productid int, quantity int DEFAULT 1, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(customerid) REFERENCES customerinfo(customerid), CONSTRAINT FOREIGN KEY(productid) REFERENCES product(productid));
CREATE TABLE IF NOT EXISTS orders (tenantid varchar(50) NOT NULL, orderid int NOT NULL AUTO_INCREMENT PRIMARY KEY, customerid int NOT NULL , orderdate double, status varchar(50) NOT NULL, subtotal DECIMAL(4,2), couponapplied BOOL DEFAULT FALSE, coupondiscount int, couponid int, employeeid int, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(customerid) REFERENCES customerinfo(customerid), CONSTRAINT FOREIGN KEY(employeeid) REFERENCES employeeinfo(employeeid));
CREATE TABLE IF NOT EXISTS orderdetails (tenantid varchar(50) NOT NULL, orderdetailid int NOT NULL AUTO_INCREMENT PRIMARY KEY, orderid int NOT NULL, productid int NOT NULL, quantity int NOT NULL, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(productid) REFERENCES product(productid), CONSTRAINT FOREIGN KEY(orderid) REFERENCES orders(orderid));
CREATE TABLE IF NOT EXISTS unassignedorders (tenantid varchar(50) NOT NULL, orderid int NOT NULL, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(orderid) REFERENCES orders(orderid));
/*NEED to be updated later after investigating payment methods*/
CREATE TABLE IF NOT EXISTS paymentmode (paymentmodeid int NOT NULL AUTO_INCREMENT PRIMARY KEY, paymenttype varchar(50) NOT NULL);
CREATE TABLE IF NOT EXISTS transactiondetails (tenantid varchar(50) NOT NULL, transactionid int NOT NULL AUTO_INCREMENT PRIMARY KEY, orderid int NOT NULL, transactionstatus varchar(50) NOT NULL, paymentmodeid int NOT NULL, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(orderid) REFERENCES orders(orderid), CONSTRAINT FOREIGN KEY(paymentmodeid) REFERENCES paymentmode(paymentmodeid));

/* Invoice tables*/
CREATE TABLE IF NOT EXISTS invoicetemplate (tenantid varchar(50) NOT NULL, invoiceid int NOT NULL AUTO_INCREMENT PRIMARY KEY, document MEDIUMBLOB, active BOOL DEFAULT TRUE, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid));
CREATE TABLE IF NOT EXISTS orderinvoice (tenantid varchar(50) NOT NULL, userinvoiceid int NOT NULL AUTO_INCREMENT PRIMARY KEY, document MEDIUMBLOB, orderid int NOT NULL, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(orderid) REFERENCES orders(orderid));

/* Tenant media */
CREATE TABLE IF NOT EXISTS homepagemedia (tenantid varchar(50) NOT NULL, mediaid int NOT NULL AUTO_INCREMENT PRIMARY KEY, image MEDIUMBLOB, title varchar(50), description varchar(100), message varchar(30), shopnow BOOL DEFAULT FALSE, contact BOOL DEFAULT FALSE, slideshow BOOL DEFAULT TRUE, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid));
CREATE TABLE IF NOT EXISTS homepagefeatured (tenantid varchar(50) NOT NULL, productid int NOT NULL, CONSTRAINT FOREIGN KEY(tenantid) REFERENCES tenant(tenantid), CONSTRAINT FOREIGN KEY(productid) REFERENCES product(productid));

/* Standard Permissions load */
INSERT INTO employeepermissions (permissionid, permissionname) VALUES (1, 'ADMIN');
INSERT INTO employeepermissions (permissionid, permissionname) VALUES (2, 'MANAGER');
INSERT INTO employeepermissions (permissionid, permissionname) VALUES (3, 'MARKETING');
INSERT INTO employeepermissions (permissionid, permissionname) VALUES (4, 'SUPPORT');

/* Standard payment modes */
INSERT INTO paymentmode (paymentmodeid, paymenttype) VALUES (1, 'CASH');
INSERT INTO paymentmode (paymentmodeid, paymenttype) VALUES (2, 'CARD');
INSERT INTO paymentmode (paymentmodeid, paymenttype) VALUES (3, 'GOOGLEPAY');
INSERT INTO paymentmode (paymentmodeid, paymenttype) VALUES (4, 'PAYTM');
INSERT INTO paymentmode (paymentmodeid, paymenttype) VALUES (5, 'PHONEPE');
INSERT INTO paymentmode (paymentmodeid, paymenttype) VALUES (6, 'NETBANKING');
INSERT INTO paymentmode (paymentmodeid, paymenttype) VALUES (7, 'OTHERS');

/* DEV */
/* initial data load */
insert into tenant (tenantid, tenantuniquename) values ('devTenant', 'devRealm');
insert into tenantdetails (tenantid, tenantdetailid, tenantcontact, tenantemail, tenantbusinessemail, businessemailpassword, tenantstreet, tenantcity, tenantpin, tenantfacebook, tenanttwitter, tenantinsta) values ('devTenant', 1, '1234567890', 'nuttyShop@gmail.com', 'do.not.reply.application.ordering@gmail.com', 'devpassword@123', '13, B block, Nelson Road', 'Chennai', '600028', 'https://www.facebook.com/', 'https://twitter.com/', 'https://www.instagram.com/');
insert into homepagemedia (tenantid, mediaid, title, description, message, shopnow, contact, slideshow) values ('devTenant', 1, 'EAT the BEST, LEAVE the REST', 'Train your body to healthy Food', 'Exciting Offers', true, false, false);
insert into homepagemedia (tenantid, mediaid, title, description, message, shopnow, contact, slideshow) values ('devTenant', 2, 'Get a Free Quote', 'Get Bulk bookings and avail exclusive offers and free delivery', 'Free Quotes', false, true, false);
insert into homepagemedia (tenantid, mediaid, title, description, message, shopnow, contact, slideshow) values ('devTenant', 3, '', '', '', false, false, true);
insert into homepagemedia (tenantid, mediaid, title, description, message, shopnow, contact, slideshow) values ('devTenant', 4, '', '', '', false, false, true);
insert into employeeinfo (tenantid, employeeid , fname, lname, emailid, mobile, password, designation, lastlogin) values ('devTenant', 1, 'SUPERUSER', 'DEV', 'q@1', '1234567890', '$2a$05$FueeaV.hfKbv/m6kG6GM../gKdRPOoihCQF1WBjpAPZNDlGPOxSha', 'SUPPORTADMIN', 1604160497704); /* password is test*/
insert into employeeaddress (tenantid, employeeid, doornumber, street, city, state, pincode) values ('devTenant', 1, 'No:13', 'street', 'city', 'state', 'pin007');
insert into employeepermissionsmap (tenantid, employeeid, permissionid) values ('devTenant', 1, 1);
insert into employeepermissionsmap (tenantid, employeeid, permissionid) values ('devTenant', 1, 2);
insert into employeepermissionsmap (tenantid, employeeid, permissionid) values ('devTenant', 1, 3);
insert into employeepermissionsmap (tenantid, employeeid, permissionid) values ('devTenant', 1, 4);

insert into tenant (tenantid, tenantuniquename) values ('devTenant01', 'devRealm1');
insert into employeeinfo (tenantid, fname, lname, emailid, mobile, password, designation) values ('devTenant01', 'SUPERUSER', 'DEV', 'q@1', '1234567890', '$2a$05$FueeaV.hfKbv/m6kG6GM../gKdRPOoihCQF1WBjpAPZNDlGPOxSha', 'SUPPORTADMIN');

insert into customerinfo (tenantid, customerid, fname, lname, emailid, password, active, loginvia) values ('devTenant', 1, 'muhil', 'kennedy', 'do.not.reply.application.ordering@gmail.com', '$2a$05$FueeaV.hfKbv/m6kG6GM../gKdRPOoihCQF1WBjpAPZNDlGPOxSha', true, 'INTERNAL');