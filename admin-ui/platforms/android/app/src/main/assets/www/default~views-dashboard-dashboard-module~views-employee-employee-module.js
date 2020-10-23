(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-dashboard-dashboard-module~views-employee-employee-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/create-employee/create-employee.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/create-employee/create-employee.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<alert class=\"p-4 text-center\"></alert>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-user-plus\"></i>Onboard New Employee\r\n          <div class=\"float-right\">\r\n            <button mat-button class=\"btn btn-ghost-success\" style=\"border: 1px solid;\" (click)=\"onboard()\">\r\n              <i class=\"fa fa-user-o\"></i> Create Employee\r\n            </button>\r\n          </div>\r\n          <div class=\"float-right\">\r\n            <mat-slide-toggle matTooltip=\"Activate Account\"\r\n              color=\"warn\"\r\n              [checked]=\"activeUser\"\r\n              (change)=\"slidetoggle()\">\r\n            </mat-slide-toggle>\r\n            <i class=\"fa fa-shield\" style=\"visibility: hidden;\"></i>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"row\">\r\n            <table class=\"table table-responsive-sm\">\r\n              <tr>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>First Name</mat-label>\r\n                    <input required matInput placeholder=\"First Name\" [formControl]=\"fnameFormControl\" name=\"fname\" [(ngModel)] = 'firstName'>\r\n                    <mat-error *ngIf=\"fnameFormControl.hasError('required')\">\r\n                      First Name is <strong>required</strong>\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>Last Name</mat-label>\r\n                    <input required matInput placeholder=\"Last Name\" [formControl]=\"lnameFormControl\" name=\"lname\" [(ngModel)] = 'lastName'>\r\n                    <mat-error *ngIf=\"lnameFormControl.hasError('required')\">\r\n                      Last Name is <strong>required</strong>\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>Email-ID</mat-label>\r\n                    <input required matInput placeholder=\"EmailID\" [formControl]=\"emailFormControl\" name=\"email\" [(ngModel)] = 'email'>\r\n                    <mat-error *ngIf=\"emailFormControl.hasError('email') && !emailFormControl.hasError('required')\">\r\n                      Please enter a valid email address\r\n                    </mat-error>\r\n                    <mat-error *ngIf=\"emailFormControl.hasError('required')\">\r\n                      Email is <strong>required</strong>\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>Mobile</mat-label>\r\n                    <input required type=\"number\" matInput placeholder=\"Mobile\" [formControl]=\"mobileFormControl\" name=\"mobile\" [(ngModel)] = 'mobile'>\r\n                    <mat-error *ngIf=\"mobileFormControl.hasError('required')\">\r\n                      Mobile Number is <strong>required</strong>\r\n                    </mat-error>\r\n                    <mat-error *ngIf=\"mobileFormControl.hasError('max') || mobileFormControl.hasError('min')\">\r\n                      <strong>Invalid</strong> Mobile Number\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>Designation</mat-label>\r\n                    <input required matInput placeholder=\"Designation\" [formControl]=\"designationFormControl\" name=\"desig\" [(ngModel)] = 'designation'>\r\n                    <mat-error *ngIf=\"designationFormControl.hasError('required')\">\r\n                      Designation<strong> cannot be Empty </strong>\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n                <td>\r\n                  <mat-radio-group\r\n                    aria-labelledby=\"example-radio-group-label\"\r\n                    class=\"example-radio-group\"\r\n                    [(ngModel)]=\"selectedGender\">\r\n                    <mat-radio-button class=\"example-radio-button\" *ngFor=\"let gender of genders\" [value]=\"gender\">\r\n                      <i class=\"fa fa-{{gender}} fa-lg mt-1\"></i> {{gender}}\r\n                    </mat-radio-button>\r\n                  </mat-radio-group>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>Date of Birth</mat-label>\r\n                    <input required matInput [matDatepicker]=\"dobpicker\" [formControl]=\"dobFormControl\" (dateChange)=\"setDob('change', $event)\" disabled>\r\n                    <mat-datepicker-toggle matSuffix [for]=\"dobpicker\"></mat-datepicker-toggle>\r\n                    <mat-datepicker #dobpicker disabled=\"false\"></mat-datepicker>\r\n                  </mat-form-field>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  <mat-label> Additional Information</mat-label>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>Door Number</mat-label>\r\n                    <input required matInput placeholder=\"Door Number\" [formControl]=\"doorFormControl\" name=\"door\" [(ngModel)] = 'door'>\r\n                    <mat-error *ngIf=\"doorFormControl.hasError('required')\">\r\n                      Door Number is <strong>required</strong>\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>Street</mat-label>\r\n                    <input required matInput placeholder=\"Street\" [formControl]=\"streetFormControl\" name=\"street\" [(ngModel)] = 'street' >\r\n                    <mat-error *ngIf=\"streetFormControl.hasError('required')\">\r\n                      Street Name is <strong>required</strong>\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>City</mat-label>\r\n                    <input required matInput placeholder=\"city\" [formControl]=\"cityFormControl\" name=\"city\" [(ngModel)] = 'city'>\r\n                    <mat-error *ngIf=\"cityFormControl.hasError('required')\">\r\n                      City Name is <strong>required</strong>\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>State</mat-label>\r\n                    <input required matInput placeholder=\"State\" [formControl]=\"stateFormControl\" name=\"state\" [(ngModel)] = 'state'>\r\n                    <mat-error *ngIf=\"stateFormControl.hasError('required')\">\r\n                      State Name is <strong>required</strong>\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                    <mat-label>PIN Code</mat-label>\r\n                    <input required matInput placeholder=\"PIN\" [formControl]=\"pinFormControl\" name=\"pin\" [(ngModel)] = 'pincode'>\r\n                    <mat-error *ngIf=\"pinFormControl.hasError('required')\">\r\n                      PIN code is <strong>required</strong>\r\n                    </mat-error>\r\n                  </mat-form-field>\r\n                </td>\r\n              </tr>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/employee-permission/employee-permission.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/employee-permission/employee-permission.component.html ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<alert class=\"p-4 text-center\"></alert>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-universal-access\"></i>Modify Employee Access Permissions\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"row\">\r\n            <table class=\"table table-responsive-sm\">\r\n              <tr>\r\n                <td>\r\n                  <div class=\"col-md-12\">\r\n                    <mat-form-field style=\"width: inherit;\" class=\"matitem\">\r\n                      <input type=\"text\"\r\n                             placeholder=\"Search Based on Id / Email / Name\"\r\n                             matInput\r\n                             [formControl]=\"myControl\"\r\n                             [matAutocomplete]=\"auto\"\r\n                             [(ngModel)]=\"email\">\r\n                      <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" >\r\n                        <mat-option (onSelectionChange)=\"setUser(option)\" *ngFor=\"let option of filteredOptions | async\" [value]=\"option.firstName+' '+option.lastName\">\r\n                          {{option.firstName}} {{option.lastName}} - {{option.emailId}}\r\n                        </mat-option>\r\n                      </mat-autocomplete>\r\n                      <button matSuffix type=\"button\" class=\"btn btn-primary\" (click)=\"searchAction()\"><i class=\"fa fa-search\"></i> Search Employee </button>\r\n                    </mat-form-field>\r\n                  </div>\r\n                </td>\r\n                <td></td>\r\n              </tr>\r\n              <tr *ngIf=\"!showcard()\">\r\n                <td></td>\r\n                <td></td>\r\n              </tr>\r\n            </table>\r\n            <table class=\"table table-responsive-sm\">\r\n              <tr *ngIf=\"showcard()\">\r\n                <td>\r\n                  <div class=\"card\">\r\n                    <div class=\"card-header\">\r\n                      {{employeeName}}\r\n                    </div>\r\n                    <div class=\"card-header float-right\">\r\n                      EMP-ID : {{employeeInfo.employeeId}}\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                      <button mat-button [disabled]=\"true\" style=\"text-align: inherit; color: gray;\">\r\n                        <i class=\"fa fa-shield\"></i>\r\n                        <span class=\"icon-text\"> Activate Employee</span><br/>\r\n                      </button>\r\n                      <mat-slide-toggle\r\n                        color=\"warn\"\r\n                        [checked]=\"getEmployeeActive()\"\r\n                        (change)=\"slidetoggle()\">\r\n                      </mat-slide-toggle>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <!-- <div class=\"col-lg-6 col-lg-4\"> -->\r\n                    <div class=\"card\">\r\n                      <div class=\"card-header\">\r\n                        Employee Permissions\r\n                        <div class=\"card-header-actions\">\r\n                          <span class=\"badge badge-warning\">{{activePermissions}}</span>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"card-body\">\r\n                        <p>\r\n                          <mat-checkbox [(ngModel)]=\"adminEnabled\">\r\n                            {{allPermissions[0].permissionName}}\r\n                          </mat-checkbox>\r\n                        </p>\r\n                        <p>\r\n                          <mat-checkbox [(ngModel)]=\"managerEnabled\">\r\n                            {{allPermissions[1].permissionName}}\r\n                          </mat-checkbox>\r\n                        </p>\r\n                        <p>\r\n                          <mat-checkbox [(ngModel)]=\"marketingEnabled\">\r\n                            {{allPermissions[2].permissionName}}\r\n                          </mat-checkbox>\r\n                        </p>\r\n                        <p>\r\n                          <mat-checkbox [(ngModel)]=\"supportEnabled\">\r\n                            {{allPermissions[3].permissionName}}\r\n                          </mat-checkbox>\r\n                        </p>\r\n                        <div class=\"float-right\">\r\n                          <button mat-button class=\"btn btn-ghost-warning\" style=\"border: 1px solid;\" (click)=\"overridePermissions()\">\r\n                            <i class=\"fa fa-key\"></i> Update Permissions\r\n                          </button>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  <!-- </div> -->\r\n                </td>\r\n              </tr>\r\n            </table>\r\n            <div >\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/employee.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/employee.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<alert class=\"p-4 text-center\"></alert>\r\n<table class=\"table table-responsive-sm table-hover table-outline mb-0\">\r\n  <ngx-loading [show]=\"loading\"></ngx-loading>\r\n  <thead class=\"thead-light\">\r\n    <tr>\r\n      <th class=\"text-center\"><i class=\"icon-people\"></i></th>\r\n      <th>ID</th>\r\n      <th>Employee Name</th>\r\n      <th>Contact</th>\r\n      <th>Email-ID</th>\r\n      <th>Designation</th>\r\n      <th>Status</th>\r\n      <th>Activity\r\n        <i class=\"fa fa-refresh float-right\" style=\"color: orange; cursor: pointer;\" (click)=\"refreshEmployeeList()\"></i>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n  <tbody style=\"background: white;\">\r\n    <tr *ngFor=\"let employee of employeesList\">\r\n      <td class=\"text-center\">\r\n        <div class=\"avatar\">\r\n          <img src={{getProfilePic(employee.profilePic)}} class=\"img-avatar\" alt=\"DP\">\r\n          <span *ngIf=\"isloggedIn(employee.loggedIn)\" class=\"avatar-status badge-success\"></span>\r\n          <span *ngIf=\"!isloggedIn(employee.loggedIn)\" class=\"avatar-status badge-dark\"></span>\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div>{{employee.employeeId}}</div>\r\n      </td>\r\n      <td>\r\n        <div>{{employee.firstName + \" \" + employee.lastName}}</div>\r\n        <div class=\"small text-muted\">\r\n          <span>DOB : {{employee.dob | date : 'dd-MM-yyy'}}</span>\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div>\r\n          {{employee.mobile}}\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div>\r\n          {{employee.emailId}}\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div>\r\n          {{employee.designation}}\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div>\r\n          <span *ngIf='employee.active' class=\"badge badge-success\">Active</span>\r\n          <span *ngIf='!employee.active' class=\"badge badge-danger\">Locked</span>\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div class=\"small text-muted\">Last Active</div>\r\n        <strong>{{employee.lastLogin | date: 'dd/MM/yyyy hh:mm a'}}</strong>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n<mat-paginator [length]=\"total\"\r\n[pageSize]=\"pageSize\"\r\n[pageSizeOptions]=\"pageSizeOptions\"\r\n(page)=\"action($event)\">\r\n</mat-paginator>\r\n");

/***/ }),

/***/ "./src/app/shared/employee/employee.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/employee/employee.service.ts ***!
  \*****************************************************/
/*! exports provided: EmployeeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeService", function() { return EmployeeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");




var EmployeeService = /** @class */ (function () {
    function EmployeeService(http) {
        this.http = http;
        this.createEmployeeEndpoint = "/secure/admin/employee/createEmployee";
        this.allPermissionsEndpoint = "/secure/admin/employee/getAllPermissions";
        this.employeeEndpoint = "/secure/admin/employee/getEmployee";
        this.allEmployeeEndpoint = "/secure/admin/employee/getAllEmployee";
        this.allEmployeeCountEndpoint = "/secure/admin/employee/getAllEmployeesCount";
        this.updatePermissionEndpoint = "/secure/admin/employee/overridePermissions";
        this.statusUpdateEndpoint = "/secure/admin/employee/activateEmployee";
        this.getEmployeesByIdEndPoint = "/secure/admin/employee/getEmployeesById";
        this.getAllEmployeeNamesAndEmailEndpoint = "/secure/admin/employee/getAllEmployeeNames";
    }
    EmployeeService.prototype.createEmployee = function (firstName, lastName, email, mobile, designation, active, dob, selectedGender, door, street, state, city, pincode) {
        var body = {
            emailId: email,
            firstName: firstName,
            lastName: lastName,
            designation: designation,
            dob: dob,
            gender: selectedGender,
            mobile: mobile,
            active: active,
            employeeAddress: [
                {
                    doorNumber: door,
                    street: street,
                    city: city,
                    state: state,
                    pincode: pincode
                }
            ]
        };
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.createEmployeeEndpoint, body, httpOptions);
    };
    EmployeeService.prototype.getAllPermissions = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.allPermissionsEndpoint);
    };
    EmployeeService.prototype.getEmployeeInfo = function (emailOrId) {
        var httpOptions = {
            params: { emailOrId: emailOrId }
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.employeeEndpoint, httpOptions);
    };
    EmployeeService.prototype.updatePermissions = function (employeeId, permissionIds) {
        var httpOptions = {
            employeeId: employeeId,
            permissions: permissionIds
        };
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.updatePermissionEndpoint, httpOptions);
    };
    EmployeeService.prototype.changeEmployeeStatus = function (employeeId, status) {
        var httpOptions = {
            employeeId: employeeId,
            active: status
        };
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.statusUpdateEndpoint, httpOptions);
    };
    EmployeeService.prototype.getAllEmployees = function (offset, limit) {
        //Set Headers
        var requestHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json')
            .append('Offset', offset)
            .append('Limit', limit);
        var httpOptions = {
            headers: requestHeaders
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.allEmployeeEndpoint, httpOptions);
    };
    EmployeeService.prototype.getEmployeesById = function (ids) {
        var httpOptions = {
            params: { ids: ids }
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getEmployeesByIdEndPoint, httpOptions);
    };
    EmployeeService.prototype.getAllEmployeesCount = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.allEmployeeCountEndpoint);
    };
    EmployeeService.prototype.getAllEmployeeNamesAndEmail = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getAllEmployeeNamesAndEmailEndpoint);
    };
    EmployeeService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    EmployeeService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], EmployeeService);
    return EmployeeService;
}());



/***/ }),

/***/ "./src/app/views/employee/create-employee/create-employee.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/views/employee/create-employee/create-employee.component.css ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".table th, .table td {\r\n  border-top: 0px !important;\r\n}\r\n\r\n.matitem{\r\n  width: 100%;\r\n}\r\n\r\n.example-radio-group {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin: 15px 0;\r\n}\r\n\r\n.example-radio-button {\r\n  margin: 5px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvZW1wbG95ZWUvY3JlYXRlLWVtcGxveWVlL2NyZWF0ZS1lbXBsb3llZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztBQUNiIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvZW1wbG95ZWUvY3JlYXRlLWVtcGxveWVlL2NyZWF0ZS1lbXBsb3llZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYmxlIHRoLCAudGFibGUgdGQge1xyXG4gIGJvcmRlci10b3A6IDBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ubWF0aXRlbXtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmV4YW1wbGUtcmFkaW8tZ3JvdXAge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBtYXJnaW46IDE1cHggMDtcclxufVxyXG5cclxuLmV4YW1wbGUtcmFkaW8tYnV0dG9uIHtcclxuICBtYXJnaW46IDVweDtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/views/employee/create-employee/create-employee.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/views/employee/create-employee/create-employee.component.ts ***!
  \*****************************************************************************/
/*! exports provided: CreateEmployeeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateEmployeeComponent", function() { return CreateEmployeeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_employee_employee_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/employee/employee.service */ "./src/app/shared/employee/employee.service.ts");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/_alert */ "./src/app/shared/_alert/index.ts");





var CreateEmployeeComponent = /** @class */ (function () {
    function CreateEmployeeComponent(empService, alertService) {
        this.empService = empService;
        this.alertService = alertService;
        this.loading = false;
        this.alertoptions = {
            autoClose: false,
            keepAfterRouteChange: false
        };
        this.selectedGender = 'male';
        this.genders = ['male', 'female'];
        this.emailFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email,
        ]);
        this.fnameFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.lnameFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.mobileFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(999999999),
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].max(9999999999)
        ]);
        this.designationFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.doorFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.streetFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.cityFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.stateFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.pinFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.dobFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.activeUser = true;
    }
    CreateEmployeeComponent.prototype.ngOnInit = function () {
    };
    CreateEmployeeComponent.prototype.slidetoggle = function () {
        this.activeUser = !this.activeUser;
    };
    CreateEmployeeComponent.prototype.setDob = function (type, event) {
        this.dob = event.value;
    };
    CreateEmployeeComponent.prototype.onboard = function () {
        var _this = this;
        var hasError = false;
        if (this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required')) {
            this.alertService.warn('Email Field has Errors', this.alertoptions);
            hasError = true;
        }
        if (this.fnameFormControl.hasError('required')) {
            this.alertService.warn('First Name is Required', this.alertoptions);
            hasError = true;
        }
        if (this.lnameFormControl.hasError('required')) {
            this.alertService.warn('Last Name is Required', this.alertoptions);
            hasError = true;
        }
        if (this.mobileFormControl.hasError('required')) {
            this.alertService.warn('Mobile Number is Required', this.alertoptions);
            hasError = true;
        }
        if (this.designationFormControl.hasError('required')) {
            this.alertService.warn('Designation is Required', this.alertoptions);
            hasError = true;
        }
        if (this.doorFormControl.hasError('required')) {
            this.alertService.warn('Door Number is Required', this.alertoptions);
            hasError = true;
        }
        if (this.streetFormControl.hasError('required')) {
            this.alertService.warn('Street Name is Required', this.alertoptions);
            hasError = true;
        }
        if (this.cityFormControl.hasError('required')) {
            this.alertService.warn('City Name is Required', this.alertoptions);
            hasError = true;
        }
        if (this.stateFormControl.hasError('required')) {
            this.alertService.warn('State Name is Required', this.alertoptions);
            hasError = true;
        }
        if (this.pinFormControl.hasError('required')) {
            this.alertService.warn('PIN Code is Required', this.alertoptions);
            hasError = true;
        }
        if (this.dobFormControl.hasError('required')) {
            this.alertService.warn('DateOfBirth is Required', this.alertoptions);
            hasError = true;
        }
        if (!hasError) {
            this.alertService.clear();
            this.loading = true;
            this.empService.createEmployee(this.firstName, this.lastName, this.email, this.mobile, this.designation, this.activeUser, this.dob, this.selectedGender, this.door, this.street, this.state, this.city, this.pincode)
                .subscribe(function (resp) {
                if (resp.statusCode === 200) {
                    _this.alertService.success('Employee Onboarded Successfully !', _this.alertoptions);
                    _this.alertService.info('An onboarding email has been sent. Please assign permissions', _this.alertoptions);
                }
                else {
                    _this.alertService.error("Employee Creation Failed - " + resp.errorMessages);
                }
                _this.loading = false;
            }, function (error) {
                _this.alertService.error("Something went wrong.... Try again Later");
                _this.loading = false;
            });
        }
    };
    CreateEmployeeComponent.ctorParameters = function () { return [
        { type: _shared_employee_employee_service__WEBPACK_IMPORTED_MODULE_3__["EmployeeService"] },
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_4__["AlertService"] }
    ]; };
    CreateEmployeeComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-create-employee',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./create-employee.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/create-employee/create-employee.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./create-employee.component.css */ "./src/app/views/employee/create-employee/create-employee.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_shared_employee_employee_service__WEBPACK_IMPORTED_MODULE_3__["EmployeeService"],
            _shared_alert__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], CreateEmployeeComponent);
    return CreateEmployeeComponent;
}());



/***/ }),

/***/ "./src/app/views/employee/employee-permission/employee-permission.component.css":
/*!**************************************************************************************!*\
  !*** ./src/app/views/employee/employee-permission/employee-permission.component.css ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2VtcGxveWVlL2VtcGxveWVlLXBlcm1pc3Npb24vZW1wbG95ZWUtcGVybWlzc2lvbi5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/employee/employee-permission/employee-permission.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/views/employee/employee-permission/employee-permission.component.ts ***!
  \*************************************************************************************/
/*! exports provided: EmployeePermissionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeePermissionComponent", function() { return EmployeePermissionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_employee_employee_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/employee/employee.service */ "./src/app/shared/employee/employee.service.ts");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/_alert */ "./src/app/shared/_alert/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var EmployeePermissionComponent = /** @class */ (function () {
    function EmployeePermissionComponent(emplService, alertService) {
        var _this = this;
        this.emplService = emplService;
        this.alertService = alertService;
        this.loading = false;
        this.emailFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.alertoptions = {
            autoClose: false,
            keepAfterRouteChange: false
        };
        //autoComplete
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.emplService.getAllEmployeeNamesAndEmail()
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.options = resp.dataList;
                _this.filteredOptions = _this.myControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return _this._filter(value); }));
            }
            else {
                _this.alertService.error('Failed : ' + resp.errorMessages);
            }
            _this.loading = false;
        }, function (error) {
            _this.alertService.error("something went wrong!");
            _this.loading = false;
        });
    }
    EmployeePermissionComponent.prototype._filter = function (value) {
        if (value === "") {
            return;
        }
        var filterValue = value.toLowerCase();
        return this.options.filter(function (option) { return (option.firstName.toLowerCase().indexOf(filterValue) === 0 || option.emailId.toLowerCase().indexOf(filterValue) === 0); });
    };
    EmployeePermissionComponent.prototype.setUser = function (user) {
        this.email = user.emailId;
        this.searchAction();
    };
    EmployeePermissionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.emplService.getAllPermissions()
            .subscribe(function (resp) {
            _this.allPermissions = resp.dataList;
            _this.loading = false;
        }, function (error) {
            console.log('Error in fetching permissions... Try again later!');
            _this.loading = false;
        });
    };
    EmployeePermissionComponent.prototype.showcard = function () {
        return this.employeeName != null || this.employeeName != undefined;
    };
    EmployeePermissionComponent.prototype.slidetoggle = function () {
        var _this = this;
        this.loading = true;
        this.employeeInfo.active = !this.employeeInfo.active;
        this.emplService.changeEmployeeStatus(this.employeeInfo.employeeId, this.employeeInfo.active)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                (_this.employeeInfo.active === true) ?
                    _this.alertService.success('Employee Account is Active', _this.alertoptions)
                    : _this.alertService.warn('Employee Account is Blocked', _this.alertoptions);
            }
            else if (resp.statusCode === 503) {
                _this.alertService.error('Operation Failed : ' + resp.errorMessages);
            }
            _this.loading = false;
        }, function (error) {
            _this.alertService.error('Something went wrong... Try again later!');
            _this.loading = false;
        });
    };
    EmployeePermissionComponent.prototype.getEmployeeActive = function () {
        return this.employeeInfo != null || this.employeeInfo != undefined ? this.employeeInfo.active : false;
    };
    // All permissions are reffered statically hence any change in DB ket must be updated here.
    EmployeePermissionComponent.prototype.setPermissions = function () {
        var _this = this;
        this.employeeInfo.employeePermissions.forEach(function (permission) {
            if (permission.permission.permissionId == 1) {
                _this.adminEnabled = true;
            }
            if (permission.permission.permissionId == 2) {
                _this.managerEnabled = true;
            }
            if (permission.permission.permissionId == 3) {
                _this.marketingEnabled = true;
            }
            if (permission.permission.permissionId == 4) {
                _this.supportEnabled = true;
            }
        });
    };
    EmployeePermissionComponent.prototype.searchAction = function () {
        var _this = this;
        this.loading = true;
        this.reset();
        if (this.email != undefined || this.email != null) {
            this.emplService.getEmployeeInfo(this.email)
                .subscribe(function (resp) {
                if (resp.statusCode === 200) {
                    _this.employeeInfo = resp.data;
                    _this.employeeName = _this.employeeInfo.firstName + " " + _this.employeeInfo.lastName;
                    _this.activePermissions = _this.employeeInfo.employeePermissions.length;
                    _this.setPermissions();
                }
                else if (resp.statusCode === 503) {
                    _this.alertService.error('Error : ' + resp.errorMessages);
                }
                _this.loading = false;
            }, function (error) {
                _this.alertService.error('Something went wrong... Try again later!');
                _this.loading = false;
            });
        }
        else {
            this.alertService.warn("Empty/Incorrect Entry");
            this.loading = false;
        }
    };
    EmployeePermissionComponent.prototype.reset = function () {
        this.employeeName = null;
        this.adminEnabled = false;
        this.managerEnabled = false;
        this.marketingEnabled = false;
        this.supportEnabled = false;
    };
    EmployeePermissionComponent.prototype.overridePermissions = function () {
        var _this = this;
        this.loading = true;
        var enabledPermissions = new Array(4);
        if (this.adminEnabled) {
            enabledPermissions.push(1);
        }
        if (this.managerEnabled) {
            enabledPermissions.push(2);
        }
        if (this.marketingEnabled) {
            enabledPermissions.push(3);
        }
        if (this.supportEnabled) {
            enabledPermissions.push(4);
        }
        this.emplService.updatePermissions(this.employeeInfo.employeeId, enabledPermissions)
            .subscribe(function (resp) {
            _this.employeeInfo = resp.data;
            _this.employeeName = _this.employeeInfo.firstName + " " + _this.employeeInfo.lastName;
            _this.activePermissions = _this.employeeInfo.employeePermissions.length;
            _this.setPermissions();
            _this.alertService.success("Permissions updated successfully", _this.alertoptions);
            _this.loading = false;
        }, function (error) {
            _this.alertService.error("Failed to update permissions... Try again later!");
        });
    };
    EmployeePermissionComponent.ctorParameters = function () { return [
        { type: _shared_employee_employee_service__WEBPACK_IMPORTED_MODULE_3__["EmployeeService"] },
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_4__["AlertService"] }
    ]; };
    EmployeePermissionComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-employee-permission',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./employee-permission.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/employee-permission/employee-permission.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./employee-permission.component.css */ "./src/app/views/employee/employee-permission/employee-permission.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_shared_employee_employee_service__WEBPACK_IMPORTED_MODULE_3__["EmployeeService"], _shared_alert__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], EmployeePermissionComponent);
    return EmployeePermissionComponent;
}());



/***/ }),

/***/ "./src/app/views/employee/employee-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/employee/employee-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: EmployeeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeRoutingModule", function() { return EmployeeRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _create_employee_create_employee_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-employee/create-employee.component */ "./src/app/views/employee/create-employee/create-employee.component.ts");
/* harmony import */ var _employee_permission_employee_permission_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./employee-permission/employee-permission.component */ "./src/app/views/employee/employee-permission/employee-permission.component.ts");
/* harmony import */ var _employee_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./employee.component */ "./src/app/views/employee/employee.component.ts");






var routes = [
    {
        path: '',
        data: {
            title: 'Employee'
        },
        children: [
            {
                path: '',
                redirectTo: 'employee'
            },
            {
                path: 'employee',
                component: _employee_component__WEBPACK_IMPORTED_MODULE_5__["EmployeeComponent"],
                data: {
                    title: 'Manage Employee'
                }
            },
            {
                path: 'OnboardEmployee',
                component: _create_employee_create_employee_component__WEBPACK_IMPORTED_MODULE_3__["CreateEmployeeComponent"],
                data: {
                    title: 'Onboard Employee'
                }
            },
            {
                path: 'EmployeePermissions',
                component: _employee_permission_employee_permission_component__WEBPACK_IMPORTED_MODULE_4__["EmployeePermissionComponent"],
                data: {
                    title: 'Employee Permissions'
                }
            }
        ]
    }
];
var EmployeeRoutingModule = /** @class */ (function () {
    function EmployeeRoutingModule() {
    }
    EmployeeRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], EmployeeRoutingModule);
    return EmployeeRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/employee/employee.component.ts":
/*!******************************************************!*\
  !*** ./src/app/views/employee/employee.component.ts ***!
  \******************************************************/
/*! exports provided: EmployeeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeComponent", function() { return EmployeeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_employee_employee_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/employee/employee.service */ "./src/app/shared/employee/employee.service.ts");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/_alert */ "./src/app/shared/_alert/index.ts");




var EmployeeComponent = /** @class */ (function () {
    function EmployeeComponent(employeeService, alertService) {
        this.employeeService = employeeService;
        this.alertService = alertService;
        this.loading = false;
        this.defaultProfilePic = "assets/img/avatars/Blank-Profile.png";
        // MatPaginator Inputs
        this.offset = 0;
        this.total = 10;
        this.pageSize = 5;
        this.pageSizeOptions = [5, 10, 50];
    }
    EmployeeComponent.prototype.setPageSizeOptions = function (setPageSizeOptionsInput) {
        if (setPageSizeOptionsInput) {
            this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(function (str) { return +str; });
        }
    };
    EmployeeComponent.prototype.action = function (event) {
        var _this = this;
        this.loading = true;
        this.pageSize = event.pageSize;
        var pageIndex = event.pageIndex;
        this.offset = pageIndex * this.pageSize;
        this.employeeService.getAllEmployees(this.offset, this.pageSize)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.employeesList = resp.dataList;
            }
            else {
                _this.alertService.error('Failed : ' + resp.errorMessages);
            }
            _this.loading = false;
        }, function (error) {
            _this.alertService.error('Something went Wrong....try again later!');
        });
    };
    EmployeeComponent.prototype.refreshEmployeeList = function () {
        var _this = this;
        this.loading = true;
        var empIds = new Array();
        this.employeesList.forEach(function (emp) {
            empIds.push(emp.employeeId);
        });
        this.employeeService.getEmployeesById(empIds)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.employeesList = resp.dataList;
            }
            else {
                _this.alertService.error('Failed : ' + resp.errorMessages);
            }
            _this.loading = false;
        }, function (error) {
            _this.alertService.error('Something went Wrong....try again later!');
        });
    };
    EmployeeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.employeeService.getAllEmployeesCount()
            .subscribe(function (resp) {
            _this.total = resp.data;
            _this.employeeService.getAllEmployees(_this.offset, _this.pageSize)
                .subscribe(function (resp) {
                if (resp.statusCode === 200) {
                    _this.employeesList = resp.dataList;
                }
                else {
                    _this.alertService.error('Failed : ' + resp.errorMessages);
                }
                _this.loading = false;
            }, function (error) {
                _this.alertService.error('Something went Wrong....try again later!');
            });
        }, function (error) {
            _this.alertService.error('Something went Wrong....try again later!');
        });
    };
    EmployeeComponent.prototype.getProfilePic = function (picData) {
        if (picData === undefined || picData === null) {
            return this.defaultProfilePic;
        }
        else {
            return picData;
        }
    };
    EmployeeComponent.prototype.isloggedIn = function (employeeStatus) {
        if (employeeStatus === true) {
            return true;
        }
        else {
            return false;
        }
    };
    EmployeeComponent.ctorParameters = function () { return [
        { type: _shared_employee_employee_service__WEBPACK_IMPORTED_MODULE_2__["EmployeeService"] },
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_3__["AlertService"] }
    ]; };
    EmployeeComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-employee',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./employee.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/employee.component.html")).default
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_shared_employee_employee_service__WEBPACK_IMPORTED_MODULE_2__["EmployeeService"],
            _shared_alert__WEBPACK_IMPORTED_MODULE_3__["AlertService"]])
    ], EmployeeComponent);
    return EmployeeComponent;
}());



/***/ }),

/***/ "./src/app/views/employee/employee.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/employee/employee.module.ts ***!
  \***************************************************/
/*! exports provided: EmployeeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeModule", function() { return EmployeeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm2015/ng2-charts.js");
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ "./node_modules/ngx-bootstrap/dropdown/fesm5/ngx-bootstrap-dropdown.js");
/* harmony import */ var ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/buttons */ "./node_modules/ngx-bootstrap/buttons/fesm5/ngx-bootstrap-buttons.js");
/* harmony import */ var _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/_alert/alert.module */ "./src/app/shared/_alert/alert.module.ts");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm5/autocomplete.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/fesm5/badge.js");
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/bottom-sheet */ "./node_modules/@angular/material/fesm5/bottom-sheet.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm5/button.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/fesm5/button-toggle.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/fesm5/checkbox.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/fesm5/chips.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/fesm5/stepper.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/fesm5/datepicker.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/fesm5/divider.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/fesm5/expansion.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/fesm5/grid-list.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/fesm5/icon.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm5/input.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/fesm5/list.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/fesm5/menu.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/fesm5/paginator.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/fesm5/progress-bar.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm5/progress-spinner.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/fesm5/radio.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/fesm5/select.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/fesm5/sidenav.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/fesm5/slider.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/fesm5/slide-toggle.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/fesm5/snack-bar.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/fesm5/sort.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/fesm5/table.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/fesm5/tabs.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/fesm5/toolbar.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm5/tooltip.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/fesm5/tree.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _employee_routing_module__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./employee-routing.module */ "./src/app/views/employee/employee-routing.module.ts");
/* harmony import */ var _create_employee_create_employee_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./create-employee/create-employee.component */ "./src/app/views/employee/create-employee/create-employee.component.ts");
/* harmony import */ var _employee_permission_employee_permission_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./employee-permission/employee-permission.component */ "./src/app/views/employee/employee-permission/employee-permission.component.ts");
/* harmony import */ var _employee_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./employee.component */ "./src/app/views/employee/employee.component.ts");
/* harmony import */ var ngx_typeahead__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ngx-typeahead */ "./node_modules/ngx-typeahead/fesm5/ngx-typeahead.js");








// Material modules









































var EmployeeModule = /** @class */ (function () {
    function EmployeeModule() {
    }
    EmployeeModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _employee_component__WEBPACK_IMPORTED_MODULE_47__["EmployeeComponent"],
                _create_employee_create_employee_component__WEBPACK_IMPORTED_MODULE_45__["CreateEmployeeComponent"],
                _employee_permission_employee_permission_component__WEBPACK_IMPORTED_MODULE_46__["EmployeePermissionComponent"]
            ],
            imports: [
                _employee_routing_module__WEBPACK_IMPORTED_MODULE_44__["EmployeeRoutingModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                ng2_charts__WEBPACK_IMPORTED_MODULE_4__["ChartsModule"],
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__["BsDropdownModule"],
                ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_6__["ButtonsModule"].forRoot(),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__["MatAutocompleteModule"],
                _angular_material_badge__WEBPACK_IMPORTED_MODULE_9__["MatBadgeModule"],
                _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_10__["MatBottomSheetModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_13__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__["MatCheckboxModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__["MatChipsModule"],
                _angular_material_stepper__WEBPACK_IMPORTED_MODULE_16__["MatStepperModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__["MatDatepickerModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_18__["MatDialogModule"],
                _angular_material_divider__WEBPACK_IMPORTED_MODULE_19__["MatDividerModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_21__["MatGridListModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__["MatIconModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_23__["MatInputModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_24__["MatListModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__["MatMenuModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatNativeDateModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_27__["MatPaginatorModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_28__["MatProgressBarModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_29__["MatProgressSpinnerModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_30__["MatRadioModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatRippleModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_31__["MatSelectModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_32__["MatSidenavModule"],
                _angular_material_slider__WEBPACK_IMPORTED_MODULE_33__["MatSliderModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_34__["MatSlideToggleModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_35__["MatSnackBarModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_36__["MatSortModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_37__["MatTableModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_38__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_39__["MatToolbarModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_40__["MatTooltipModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_41__["MatTreeModule"],
                ngx_typeahead__WEBPACK_IMPORTED_MODULE_48__["NgxTypeaheadModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_42__["NgxLoadingModule"].forRoot({
                    animationType: ngx_loading__WEBPACK_IMPORTED_MODULE_42__["ngxLoadingAnimationTypes"].rectangleBounce,
                    backdropBackgroundColour: 'rgba(0,0,0,0.3)',
                    backdropBorderRadius: '4px',
                    primaryColour: 'cornflowerblue',
                    secondaryColour: 'chocolate',
                    tertiaryColour: 'darkred'
                }),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_43__["SharedModule"],
                _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_7__["AlertModule"]
            ],
            exports: [
                _employee_component__WEBPACK_IMPORTED_MODULE_47__["EmployeeComponent"]
            ]
        })
    ], EmployeeModule);
    return EmployeeModule;
}());



/***/ })

}]);
//# sourceMappingURL=default~views-dashboard-dashboard-module~views-employee-employee-module.js.map