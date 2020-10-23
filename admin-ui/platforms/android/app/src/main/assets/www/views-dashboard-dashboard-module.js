(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-dashboard-dashboard-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/components/tenant-details/tenant-details.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/components/tenant-details/tenant-details.component.html ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"form-group row\">\r\n  <div class=\"col-md-12\">\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><span><i class=\"fa fa-envelope-o\"></i> Tenant Email</span></button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantEmail\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantEmail\" type=\"text\" id=\"tenantemail\" name=\"tenantemail\" class=\"form-control\" placeholder=\"Tenant Email\" [(ngModel)] = \"tenantEmail\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantEmail\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantEmail = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantEmail\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantEmail = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantEmail\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantEmail = true ; updateTenantEmail()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><i class=\"fa fa-envelope-square\"></i> Tenant Business Email</button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantBusinessEmail\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantBusinessEmail\" type=\"text\" id=\"businessemail\" name=\"businessemail\" class=\"form-control\" placeholder=\"Tenant Business Email\" [(ngModel)] = \"tenantBusinessEmail\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantBusinessEmail\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantBusinessEmail = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantBusinessEmail\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantBusinessEmail = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantBusinessEmail\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantBusinessEmail = true; updateTenantBusinessEmail()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><i class=\"fa fa-lock\"></i> Business Email Password</button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantBusinessEmailPassword\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantBusinessEmailPassword\" type=\"password\" id=\"businessemailpass\" name=\"businessemailpass\" class=\"form-control\" placeholder=\"Tenant Business Email Password\" [(ngModel)] = \"tenantBusinessEmailPassword\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantBusinessEmailPassword\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantBusinessEmailPassword = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantBusinessEmailPassword\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantBusinessEmailPassword = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantBusinessEmailPassword\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantBusinessEmailPassword = true; updateTenantBusinessEmailPassword()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><span><i class=\"fa fa-phone\"></i> Tenant Contact</span></button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantContact\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantContact\" type=\"text\" id=\"tenantcontact\" name=\"tenantcontact\" class=\"form-control\" placeholder=\"Tenant Contact\" [(ngModel)] = \"tenantContact\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantContact\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantContact = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantContact\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantContact = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantContact\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantContact = true; updateTenantContact()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><i class=\"fa fa-address-book\"></i> Tenant Address</button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantStreet\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantStreet\" type=\"text\" id=\"tenantstreet\" name=\"tenantstreet\" class=\"form-control\" placeholder=\"Tenant Street Address\" [(ngModel)] = \"tenantStreet\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantStreet\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantStreet = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantStreet\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantStreet = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantStreet\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantStreet = true; updateTenantStreet()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><i class=\"fa fa-map-marker\"></i> Tenant City</button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantCity\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantCity\" type=\"text\" id=\"tenantcity\" name=\"tenantcity\" class=\"form-control\" placeholder=\"Tenant City\" [(ngModel)] = \"tenantCity\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantCity\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantCity = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantCity\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantCity = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantCity\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantCity = true; updateTenantCity()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><i class=\"fa fa-map-pin\"></i> Tenant PinCode</button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantPin\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantPin\" type=\"text\" id=\"pincode\" name=\"pincode\" class=\"form-control\" placeholder=\"Tenant PinCode\" [(ngModel)] = \"tenantPin\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantPin\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantPin = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantPin\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantPin = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantPin\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantPin = true; updateTenantPin()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><i class=\"fa fa-facebook\"></i> Tenant FaceBoook</button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantFacebook\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantFacebook\" type=\"text\" id=\"facebook\" name=\"facebook\" class=\"form-control\" placeholder=\"Tenant Facebook Url\" [(ngModel)] = \"tenantFacebook\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantFacebook\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantFacebook = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantFacebook\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantFacebook = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantFacebook\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantFacebook = true; updateTenantFacebook()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><i class=\"fa fa-twitter\"></i> Tenant Twitter</button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantTwitter\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantTwitter\" type=\"text\" id=\"twitter\" name=\"twitter\" class=\"form-control\" placeholder=\"Tenant Twitter Url\" [(ngModel)] = \"tenantTwitter\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantTwitter\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantTwitter = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantTwitter\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantTwitter = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantTwitter\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantTwitter = true; updateTenantTwitter()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><i class=\"fa fa-instagram\"></i> Tenant Instagram</button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantInsta\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantInsta\" type=\"text\" id=\"insta\" name=\"insta\" class=\"form-control\" placeholder=\"Tenant Instagram Url\" [(ngModel)] = \"tenantInsta\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantInsta\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantInsta = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantInsta\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantInsta = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantInsta\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantInsta = true; updateTenantInsta()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n    <br/>\r\n    <div class=\"input-group\">\r\n      <span class=\"input-group-prepend fixed-prependWidth\">\r\n        <button disabled class=\"btn\"><i class=\"fa fa-registered\"></i> Tenant LOGO</button>\r\n      </span>\r\n      <ngx-loading [show]=\"loadTenantInsta\"></ngx-loading>\r\n      <input [disabled]=\"!editTenantInsta\" type=\"file\" id=\"updateFile\" (change)=\"handleFileUpdate($event.target.files)\">\r\n      <span class=\"input-group-append\">\r\n        <button *ngIf=\"!editTenantInsta\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"editTenantInsta = true\"><i class=\"fa fa-edit\"></i></button>\r\n        <button *ngIf=\"editTenantInsta\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"editTenantInsta = false\"><i class=\"fa fa-remove\"></i></button>\r\n        <button *ngIf=\"editTenantInsta\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"editTenantInsta = true; updateTenantLogo()\"><i class=\"fa fa-check\"></i></button>\r\n      </span>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/components/todo/todo.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/components/todo/todo.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<alert class=\"p-4 text-center\"></alert>\r\n<div class=\"card\">\r\n  <div class=\"card-header\">\r\n    <i class=\"fa fa-sticky-note-o\"></i>TODO\r\n    <div class=\"card-header-actions\">\r\n      {{date | date : 'fullDate'}}\r\n    </div>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"row\">\r\n      <div class=\"input-group\">\r\n        <input type=\"text\" id=\"input1-group2\" [(ngModel)]=\"content\" name=\"content\" class=\"form-control\" placeholder=\"what you want to do?\">\r\n        <span class=\"input-group-prepend\">\r\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"onAdd()\"><i class=\"fa fa-plus-square-o\"></i></button>\r\n        </span>\r\n      </div>\r\n      <div style=\"margin:5px 0px; width: 100%;\">\r\n        <ul class=\"list-group\">\r\n          <li class=\"list-group-item\" *ngFor=\"let item of toDoListArray\">\r\n            <span class=\"hover-cursor mousestyle\" [class.text-success]=\"item.done\" >\r\n              <i class=\"fa fa-lg\" [ngClass]=\"item.done?'fa-check-circle-o':'fa-circle-thin'\" (click)=\"item.done = !item.done; changeStatus(item)\"></i>\r\n            </span>\r\n            <span [ngClass]=\"item.done ? 'strikethrough' : 'null'\">{{item.content}}</span>\r\n            <span class=\"hover-cursor text-danger pull-right mousestyle\" >\r\n              <i class=\"fa fa-trash-o fa-lg\" (click)=\"removeTodo(item)\"></i>\r\n            </span>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/dashboard.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/dashboard.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"animated fadeIn\">\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <app-todo></app-todo>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <app-task></app-task>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"row\" *ngIf=\"showAdminCard\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-institution\"></i>TENANT INFORMATION\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <app-tenant-details></app-tenant-details>\r\n          <app-employee></app-employee>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/shared/tenant/tenant.service.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/tenant/tenant.service.ts ***!
  \*************************************************/
/*! exports provided: TenantService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TenantService", function() { return TenantService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");




var TenantService = /** @class */ (function () {
    function TenantService(http) {
        this.http = http;
        this.updateTenantDetailsEndpoint = "/tenant/updateTenant";
    }
    TenantService.prototype.updateTenantDetails = function (id, fileLogo, email, businessEmail, password, contact, street, city, pin, facebook, twitter, insta) {
        var uploadData = new FormData();
        uploadData.append('myFile', fileLogo);
        uploadData.append('tenantDetailId', id);
        uploadData.append('tenantEmail', email);
        uploadData.append('tenantStreet', street);
        uploadData.append('tenantContact', contact);
        uploadData.append('tenantCity', city);
        uploadData.append('tenantPin', pin);
        uploadData.append('tenantTwitter', twitter);
        uploadData.append('tenantFacebook', facebook);
        uploadData.append('tenantInsta', insta);
        uploadData.append('businessEmail', businessEmail);
        uploadData.append('businessEmailPassword', password);
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.updateTenantDetailsEndpoint, uploadData);
    };
    TenantService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    TenantService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TenantService);
    return TenantService;
}());



/***/ }),

/***/ "./src/app/shared/todo/todo.service.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/todo/todo.service.ts ***!
  \*********************************************/
/*! exports provided: TodoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoService", function() { return TodoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");




var TodoService = /** @class */ (function () {
    function TodoService(http) {
        this.http = http;
        this.createTodoEndpoint = "/secure/admin/todo/addTodo";
        this.updateTodoEndpoint = "/secure/admin/todo/updateTodo";
        this.removeTodoEndpoint = "/secure/admin/todo/deleteTodo";
        this.getTodoEndpoint = "/secure/admin/todo/getTodo";
    }
    TodoService.prototype.createTodo = function (content) {
        var body = {
            content: content
        };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.createTodoEndpoint, body);
    };
    TodoService.prototype.updateTodo = function (id) {
        var uploadData = new FormData();
        uploadData.append('id', id);
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.updateTodoEndpoint, uploadData);
    };
    TodoService.prototype.getAllTodo = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getTodoEndpoint);
    };
    TodoService.prototype.removeTodo = function (id) {
        var httpOptions = {
            params: { id: id }
        };
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.removeTodoEndpoint, httpOptions);
    };
    TodoService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    TodoService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TodoService);
    return TodoService;
}());



/***/ }),

/***/ "./src/app/views/dashboard/components/tenant-details/tenant-details.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/views/dashboard/components/tenant-details/tenant-details.component.css ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".fixed-prependWidth{\r\n  width: 180px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvZGFzaGJvYXJkL2NvbXBvbmVudHMvdGVuYW50LWRldGFpbHMvdGVuYW50LWRldGFpbHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7QUFDZCIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Rhc2hib2FyZC9jb21wb25lbnRzL3RlbmFudC1kZXRhaWxzL3RlbmFudC1kZXRhaWxzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZml4ZWQtcHJlcGVuZFdpZHRoe1xyXG4gIHdpZHRoOiAxODBweDtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/views/dashboard/components/tenant-details/tenant-details.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/views/dashboard/components/tenant-details/tenant-details.component.ts ***!
  \***************************************************************************************/
/*! exports provided: TenantDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TenantDetailsComponent", function() { return TenantDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_tenantStore_tenant_store_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/tenantStore/tenant-store.service */ "./src/app/service/tenantStore/tenant-store.service.ts");
/* harmony import */ var _shared_tenant_tenant_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/tenant/tenant.service */ "./src/app/shared/tenant/tenant.service.ts");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/_alert */ "./src/app/shared/_alert/index.ts");





var TenantDetailsComponent = /** @class */ (function () {
    function TenantDetailsComponent(tenantStore, tenantService, alertService) {
        this.tenantStore = tenantStore;
        this.tenantService = tenantService;
        this.alertService = alertService;
        this.editTenantEmail = false;
        this.editTenantBusinessEmail = false;
        this.editTenantContact = false;
        this.editTenantStreet = false;
        this.editTenantCity = false;
        this.editTenantPin = false;
        this.editTenantFacebook = false;
        this.editTenantTwitter = false;
        this.editTenantInsta = false;
        this.editTenantBusinessEmailPassword = false;
        this.editTenantLogo = false;
        this.loadTenantEmail = false;
        this.loadTenantBusinessEmail = false;
        this.loadTenantContact = false;
        this.loadTenantStreet = false;
        this.loadTenantCity = false;
        this.loadTenantPin = false;
        this.loadTenantFacebook = false;
        this.loadTenantTwitter = false;
        this.loadTenantInsta = false;
        this.loadTenantBusinessEmailPassword = false;
        this.loadTenantLogo = false;
        this.tenantBusinessEmailPassword = "Dummy Text";
        this.tenantLogo = null;
    }
    TenantDetailsComponent.prototype.ngOnInit = function () {
        this.tenantDetailId = this.tenantStore.tenantDetailId;
        this.tenantEmail = this.tenantStore.tenantEmail;
        this.tenantBusinessEmail = this.tenantStore.businessEmail;
        this.tenantContact = this.tenantStore.tenantContact;
        this.tenantStreet = this.tenantStore.tenantStreet;
        this.tenantCity = this.tenantStore.tenantCity;
        this.tenantPin = this.tenantStore.tenantPin;
        this.tenantFacebook = this.tenantStore.tenantFacebook;
        this.tenantTwitter = this.tenantStore.tenantTwitter;
        this.tenantInsta = this.tenantStore.tenantInsta;
    };
    TenantDetailsComponent.prototype.updateTenantEmail = function () {
        var _this = this;
        this.loadTenantEmail = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', this.tenantEmail, '', '', '', '', '', '', '', '', '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantEmail = false;
                _this.loadTenantEmail = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.handleFileUpdate = function (files) {
        this.tenantLogo = files.item(0);
    };
    TenantDetailsComponent.prototype.updateTenantLogo = function () {
        var _this = this;
        this.loadTenantLogo = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, this.tenantLogo, '', '', '', '', '', '', '', '', '', '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantLogo = false;
                _this.loadTenantLogo = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.updateTenantBusinessEmail = function () {
        var _this = this;
        this.loadTenantBusinessEmail = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', this.tenantBusinessEmail, '', '', '', '', '', '', '', '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantBusinessEmail = false;
                _this.loadTenantBusinessEmail = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.updateTenantBusinessEmailPassword = function () {
        var _this = this;
        this.loadTenantBusinessEmailPassword = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', this.tenantBusinessEmailPassword, '', '', '', '', '', '', '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantBusinessEmailPassword = false;
                _this.loadTenantBusinessEmailPassword = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.updateTenantContact = function () {
        var _this = this;
        this.loadTenantContact = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', this.tenantContact, '', '', '', '', '', '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantContact = false;
                _this.loadTenantContact = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.updateTenantStreet = function () {
        var _this = this;
        this.loadTenantStreet = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', this.tenantStreet, '', '', '', '', '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantStreet = false;
                _this.loadTenantStreet = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.updateTenantCity = function () {
        var _this = this;
        this.loadTenantCity = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', this.tenantCity, '', '', '', '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantCity = false;
                _this.loadTenantCity = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.updateTenantPin = function () {
        var _this = this;
        this.loadTenantPin = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', '', this.tenantPin, '', '', '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantPin = false;
                _this.loadTenantPin = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.updateTenantFacebook = function () {
        var _this = this;
        this.loadTenantFacebook = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', '', '', this.tenantFacebook, '', '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantFacebook = false;
                _this.loadTenantFacebook = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.updateTenantTwitter = function () {
        var _this = this;
        this.loadTenantTwitter = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', '', '', '', this.tenantTwitter, '')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantFacebook = false;
                _this.loadTenantTwitter = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.prototype.updateTenantInsta = function () {
        var _this = this;
        this.loadTenantInsta = true;
        this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', '', '', '', '', this.tenantInsta)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.editTenantInsta = false;
                _this.loadTenantInsta = false;
            }
            else {
                alert("error");
            }
        }, function (error) {
            alert("error");
        });
    };
    TenantDetailsComponent.ctorParameters = function () { return [
        { type: _service_tenantStore_tenant_store_service__WEBPACK_IMPORTED_MODULE_2__["TenantStoreService"] },
        { type: _shared_tenant_tenant_service__WEBPACK_IMPORTED_MODULE_3__["TenantService"] },
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_4__["AlertService"] }
    ]; };
    TenantDetailsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tenant-details',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./tenant-details.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/components/tenant-details/tenant-details.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./tenant-details.component.css */ "./src/app/views/dashboard/components/tenant-details/tenant-details.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_service_tenantStore_tenant_store_service__WEBPACK_IMPORTED_MODULE_2__["TenantStoreService"],
            _shared_tenant_tenant_service__WEBPACK_IMPORTED_MODULE_3__["TenantService"],
            _shared_alert__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], TenantDetailsComponent);
    return TenantDetailsComponent;
}());



/***/ }),

/***/ "./src/app/views/dashboard/components/todo/todo.component.css":
/*!********************************************************************!*\
  !*** ./src/app/views/dashboard/components/todo/todo.component.css ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mousestyle{\r\n  cursor: pointer;\r\n}\r\n\r\n.strikethrough {\r\n  text-decoration: line-through;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvZGFzaGJvYXJkL2NvbXBvbmVudHMvdG9kby90b2RvLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsNkJBQTZCO0FBQy9CIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvZGFzaGJvYXJkL2NvbXBvbmVudHMvdG9kby90b2RvLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubW91c2VzdHlsZXtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5zdHJpa2V0aHJvdWdoIHtcclxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/views/dashboard/components/todo/todo.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/dashboard/components/todo/todo.component.ts ***!
  \*******************************************************************/
/*! exports provided: TodoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoComponent", function() { return TodoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_todo_todo_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/todo/todo.service */ "./src/app/shared/todo/todo.service.ts");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/_alert */ "./src/app/shared/_alert/index.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/fesm5/ngx-cookie-service.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/fesm5/snack-bar.js");






var TodoComponent = /** @class */ (function () {
    function TodoComponent(todoService, alertService, cookieService, _snackBar) {
        this.todoService = todoService;
        this.alertService = alertService;
        this.cookieService = cookieService;
        this._snackBar = _snackBar;
        this.toDoListArray = new Array();
        this.loading = false;
        this.date = new Date();
    }
    TodoComponent.prototype.ngOnInit = function () {
        var _this = this;
        var allowCall = this.cookieService.get('JWT');
        if (allowCall != null && allowCall != undefined && allowCall != '') {
            this.loading = true;
            this.todoService.getAllTodo()
                .subscribe(function (resp) {
                if (resp.statusCode === 200) {
                    _this.toDoListArray = resp.dataList;
                }
                else {
                    _this._snackBar.open('Failed : ' + resp.errorMessages, '', {
                        duration: 3000,
                        panelClass: ['error-snackbar']
                    });
                    //this.alertService.error('Failed : ' + resp.errorMessages);
                }
                _this.loading = false;
            }, function (error) {
                _this._snackBar.open('Something went wrong....try again later!', '', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
                //this.alertService.error('Something went wrong....try again later!');
            });
        }
    };
    TodoComponent.prototype.onAdd = function () {
        var _this = this;
        this.loading = true;
        if (this.content === '' || this.content === undefined) {
            this._snackBar.open('Please add what you want to DO !', 'OK', {
                duration: 3000,
                panelClass: ['warn-snackbar']
            });
            return;
        }
        this.todoService.createTodo(this.content)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.toDoListArray = resp.dataList;
                _this.content = '';
            }
            else {
                _this._snackBar.open('Failed : ' + resp.errorMessages, '', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
            _this.loading = false;
        }, function (error) {
            _this._snackBar.open('Something went wrong....try again later!', '', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
        });
    };
    TodoComponent.prototype.changeStatus = function (item) {
        var _this = this;
        this.loading = true;
        this.todoService.updateTodo(item.todoId)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.toDoListArray = resp.dataList;
            }
            else {
                _this._snackBar.open('Failed : ' + resp.errorMessages, '', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
            _this.loading = false;
        }, function (error) {
            _this._snackBar.open('Something went wrong....try again later!', '', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
        });
    };
    TodoComponent.prototype.removeTodo = function (item) {
        var _this = this;
        this.loading = true;
        this.todoService.removeTodo(item.todoId)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.toDoListArray = resp.dataList;
            }
            else {
                _this._snackBar.open('Failed : ' + resp.errorMessages, '', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
            _this.loading = false;
        }, function (error) {
            _this._snackBar.open('Something went wrong....try again later!', '', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
        });
    };
    TodoComponent.ctorParameters = function () { return [
        { type: _shared_todo_todo_service__WEBPACK_IMPORTED_MODULE_2__["TodoService"] },
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] }
    ]; };
    TodoComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-todo',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./todo.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/components/todo/todo.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./todo.component.css */ "./src/app/views/dashboard/components/todo/todo.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_shared_todo_todo_service__WEBPACK_IMPORTED_MODULE_2__["TodoService"],
            _shared_alert__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"]])
    ], TodoComponent);
    return TodoComponent;
}());



/***/ }),

/***/ "./src/app/views/dashboard/dashboard-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/dashboard/dashboard-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/views/dashboard/dashboard.component.ts");




var routes = [
    {
        path: '',
        component: _dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"],
        data: {
            title: 'Dashboard'
        }
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/views/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_userStore_user_store_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/userStore/user-store.service */ "./src/app/service/userStore/user-store.service.ts");



var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(userStore) {
        this.userStore = userStore;
        this.showAdminCard = false;
        this.date = new Date();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var onLoad = setInterval(function () {
            _this.userPermissions = _this.userStore.employeePermissions;
            if (_this.userPermissions != undefined && _this.userPermissions.length > 0) {
                var permissionIds_1 = new Array(4);
                _this.userPermissions.forEach(function (permission) {
                    permissionIds_1.push(permission.permission.permissionId);
                });
                if (permissionIds_1.includes(1)) {
                    _this.showAdminCard = true;
                }
                clearInterval(onLoad);
            }
        }, 500);
    };
    DashboardComponent.ctorParameters = function () { return [
        { type: _service_userStore_user_store_service__WEBPACK_IMPORTED_MODULE_2__["UserStoreService"] }
    ]; };
    DashboardComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/dashboard.component.html")).default
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_service_userStore_user_store_service__WEBPACK_IMPORTED_MODULE_2__["UserStoreService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/views/dashboard/dashboard.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/dashboard/dashboard.module.ts ***!
  \*****************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm2015/ng2-charts.js");
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ "./node_modules/ngx-bootstrap/dropdown/fesm5/ngx-bootstrap-dropdown.js");
/* harmony import */ var ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/buttons */ "./node_modules/ngx-bootstrap/buttons/fesm5/ngx-bootstrap-buttons.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/views/dashboard/dashboard.component.ts");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dashboard-routing.module */ "./src/app/views/dashboard/dashboard-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _employee_employee_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../employee/employee.module */ "./src/app/views/employee/employee.module.ts");
/* harmony import */ var _components_todo_todo_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/todo/todo.component */ "./src/app/views/dashboard/components/todo/todo.component.ts");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/_alert */ "./src/app/shared/_alert/index.ts");
/* harmony import */ var _task_task_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../task/task.module */ "./src/app/views/task/task.module.ts");
/* harmony import */ var _components_tenant_details_tenant_details_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/tenant-details/tenant-details.component */ "./src/app/views/dashboard/components/tenant-details/tenant-details.component.ts");
















var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_8__["DashboardRoutingModule"],
                ng2_charts__WEBPACK_IMPORTED_MODULE_4__["ChartsModule"],
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__["BsDropdownModule"],
                ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_6__["ButtonsModule"].forRoot(),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
                _employee_employee_module__WEBPACK_IMPORTED_MODULE_10__["EmployeeModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_12__["NgxLoadingModule"].forRoot({
                    animationType: ngx_loading__WEBPACK_IMPORTED_MODULE_12__["ngxLoadingAnimationTypes"].rectangleBounce,
                    backdropBackgroundColour: 'rgba(0,0,0,0.3)',
                    backdropBorderRadius: '4px',
                    primaryColour: 'cornflowerblue',
                    secondaryColour: 'chocolate',
                    tertiaryColour: 'darkred'
                }),
                _shared_alert__WEBPACK_IMPORTED_MODULE_13__["AlertModule"],
                _task_task_module__WEBPACK_IMPORTED_MODULE_14__["TaskModule"]
            ],
            declarations: [
                _dashboard_component__WEBPACK_IMPORTED_MODULE_7__["DashboardComponent"],
                _components_todo_todo_component__WEBPACK_IMPORTED_MODULE_11__["TodoComponent"],
                _components_tenant_details_tenant_details_component__WEBPACK_IMPORTED_MODULE_15__["TenantDetailsComponent"]
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-dashboard-dashboard-module.js.map