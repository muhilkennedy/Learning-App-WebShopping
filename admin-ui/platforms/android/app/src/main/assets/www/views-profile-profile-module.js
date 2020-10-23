(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-profile-profile-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/profile/profile.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/profile/profile.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n  <h1>Edit Profile</h1>\r\n  <hr>\r\n<div class=\"row\">\r\n    <!-- left column -->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"text-center\">\r\n        <img [src]='checkImage(profilePic)' class=\"avatar img-circle profileImg\" alt=\"avatar\">\r\n        <h6>Upload a different photo...</h6>\r\n        <input type=\"file\" (change)=\"handleFileUpdate($event.target.files)\">\r\n        <br/>\r\n        <hr/>\r\n        <br/>\r\n        <label>Employee ID : </label><label> <strong>{{empId}}</strong></label><br/>\r\n        <label>Designation : </label><label> <strong>{{designation}}</strong></label>\r\n        <br/>\r\n        <hr/>\r\n        <br/>\r\n        <label>Update Password</label>\r\n        <div class=\"form-group\">\r\n          <div style=\"width: 100%;\">\r\n            <input class=\"form-control\" type=\"password\" placeholder=\"Old Password\" name=\"lname\" [(ngModel)] = \"oldPassword\">\r\n          </div>\r\n        </div>\r\n        <div class=\"input-group\">\r\n          <ngx-loading [show]=\"passwordLoading\"></ngx-loading>\r\n          <input type=\"password\" [(ngModel)]=\"newPassword\" id=\"input1-group2\" name=\"input1-group2\" class=\"form-control\" placeholder=\"New Password\">\r\n          <span class=\"input-group-prepend\">\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"updatePassword()\"><i class=\"fa fa-lock\"></i></button>\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- edit form column -->\r\n    <div class=\"col-md-9 personal-info\">\r\n      <ngx-loading [show]=\"loading\"></ngx-loading>\r\n      <alert class=\"p-4 text-center\"></alert>\r\n      <h3>Personal info</h3>\r\n      <form class=\"form-horizontal\" role=\"form\">\r\n        <div class=\"form-group\">\r\n          <label class=\"col-lg-3 control-label\">First name:</label>\r\n          <div class=\"col-lg-8\">\r\n            <input class=\"form-control\" type=\"text\" placeholder=\"First Name\" name=\"fname\" [(ngModel)] = 'firstName'>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label class=\"col-lg-3 control-label\">Last name:</label>\r\n          <div class=\"col-lg-8\">\r\n            <input class=\"form-control\" type=\"text\" placeholder=\"Last Name\" name=\"lname\" [(ngModel)] = 'lastName'>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label class=\"col-lg-3 control-label\">Email:</label>\r\n          <div class=\"col-lg-8\">\r\n            <input class=\"form-control\" type=\"text\" placeholder=\"Email-ID\" name=\"email\" [(ngModel)] = 'email'>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label class=\"col-lg-3 control-label\">Mobile:</label>\r\n          <div class=\"col-lg-8\">\r\n            <input class=\"form-control\" type=\"number\" placeholder=\"Mobile\" name=\"mobile\" [(ngModel)] = 'mobile'>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label class=\"col-md-3 control-label\"></label>\r\n          <div class=\"col-md-8\">\r\n            <button class=\"btn btn-primary float-right\" (click) = \"save()\">\r\n              <i class=\"fa fa-save\"></i><span> Save Changes</span>\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n</div>\r\n</div>\r\n<hr>\r\n");

/***/ }),

/***/ "./src/app/shared/profile/profile.service.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/profile/profile.service.ts ***!
  \***************************************************/
/*! exports provided: ProfileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileService", function() { return ProfileService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");




var ProfileService = /** @class */ (function () {
    function ProfileService(http) {
        this.http = http;
        this.updateEmployeeEndpoint = "/secure/admin/employee/updateEmployee";
        this.updateEmployeePasswordEndpoint = "/secure/admin/employee/employeePasswordUpdate";
    }
    ProfileService.prototype.updateEmployee = function (file, id, firstName, lastName, email, mobile) {
        var uploadData = new FormData();
        if (file === undefined) {
            file = null;
        }
        uploadData.append('myFile', file);
        uploadData.append('id', id);
        uploadData.append('firstName', firstName);
        uploadData.append('lastName', lastName);
        uploadData.append('emailId', email);
        uploadData.append('mobile', mobile);
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.updateEmployeeEndpoint, uploadData);
    };
    ProfileService.prototype.updatePassword = function (oldPass, newPass) {
        var uploadData = new FormData();
        uploadData.append('oldPassword', oldPass);
        uploadData.append('newPassword', newPass);
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.updateEmployeePasswordEndpoint, uploadData);
    };
    ProfileService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    ProfileService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ProfileService);
    return ProfileService;
}());



/***/ }),

/***/ "./src/app/views/profile/profile-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/profile/profile-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ProfileRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileRoutingModule", function() { return ProfileRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _profile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile.component */ "./src/app/views/profile/profile.component.ts");




var routes = [
    {
        path: '',
        data: {
            title: 'Profile'
        },
        children: [
            {
                path: '',
                redirectTo: 'profile'
            },
            {
                path: 'profile',
                component: _profile_component__WEBPACK_IMPORTED_MODULE_3__["ProfileComponent"],
                data: {
                    title: 'Manage Profile'
                }
            }
        ]
    }
];
var ProfileRoutingModule = /** @class */ (function () {
    function ProfileRoutingModule() {
    }
    ProfileRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], ProfileRoutingModule);
    return ProfileRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/profile/profile.component.scss":
/*!******************************************************!*\
  !*** ./src/app/views/profile/profile.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".profileImg {\n  height: 100px;\n  width: inherit;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvcHJvZmlsZS9DOlxcVXNlcnNcXEFETUlOU1xcRGVza3RvcFxcUHJvamVjdDFcXG9jdFxcTGVhcm5pbmctQXBwLVdlYlNob3BwaW5nXFxhZG1pbi11aS9zcmNcXGFwcFxcdmlld3NcXHByb2ZpbGVcXHByb2ZpbGUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3ZpZXdzL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxjQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC92aWV3cy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZmlsZUltZ3tcclxuICBoZWlnaHQ6IDEwMHB4O1xyXG4gIHdpZHRoOiBpbmhlcml0O1xyXG59XHJcbiIsIi5wcm9maWxlSW1nIHtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgd2lkdGg6IGluaGVyaXQ7XG59Il19 */");

/***/ }),

/***/ "./src/app/views/profile/profile.component.ts":
/*!****************************************************!*\
  !*** ./src/app/views/profile/profile.component.ts ***!
  \****************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/_alert */ "./src/app/shared/_alert/index.ts");
/* harmony import */ var _service_userStore_user_store_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/userStore/user-store.service */ "./src/app/service/userStore/user-store.service.ts");
/* harmony import */ var _shared_profile_profile_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/profile/profile.service */ "./src/app/shared/profile/profile.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _service_tenantStore_tenant_store_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/tenantStore/tenant-store.service */ "./src/app/service/tenantStore/tenant-store.service.ts");







var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(userStore, tenantStore, alertService, profileService, sanitizer) {
        this.userStore = userStore;
        this.tenantStore = tenantStore;
        this.alertService = alertService;
        this.profileService = profileService;
        this.sanitizer = sanitizer;
        this.loading = false;
        this.passwordLoading = false;
        this.alertoptions = {
            autoClose: false,
            keepAfterRouteChange: false
        };
        this.defaultAvatar = "assets/img/avatars/Blank-Profile.png";
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.userInfo = this.userStore;
        this.empId = this.userStore.userId;
        this.firstName = this.userStore.firstName;
        this.lastName = this.userStore.lastName;
        this.email = this.userStore.emailId;
        this.designation = this.userStore.designation;
        this.mobile = this.userStore.mobile;
        this.profilePic = this.userStore.profilePic;
        var address = this.userStore.employeeAddress;
    };
    ProfileComponent.prototype.checkImage = function (image) {
        if (image === undefined || image === null) {
            return this.defaultAvatar;
        }
        else {
            return this.sanitizer.bypassSecurityTrustUrl(image);
            ;
        }
    };
    ProfileComponent.prototype.handleFileUpdate = function (files) {
        this.profilePic = URL.createObjectURL(files.item(0));
        this.fileToUpdate = files.item(0);
    };
    ProfileComponent.prototype.save = function () {
        var _this = this;
        this.loading = true;
        this.profileService.updateEmployee(this.fileToUpdate, this.empId, this.firstName, this.lastName, this.email, this.mobile)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.alertService.success('Updatde Successfully', _this.alertoptions);
                _this.userStore.profilePic = resp.data.profilePic;
            }
            else {
                _this.alertService.error('Failed : ' + resp.errorMessages, _this.alertoptions);
            }
            _this.loading = false;
        }, function (error) {
            _this.alertService.error('Something went wrong', _this.alertoptions);
            _this.loading = false;
        });
    };
    ProfileComponent.prototype.updatePassword = function () {
        var _this = this;
        this.passwordLoading = true;
        this.profileService.updatePassword(rsaencrypt(this.oldPassword, this.tenantStore.publicKey), rsaencrypt(this.newPassword, this.tenantStore.publicKey))
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.alertService.success('Updatde Successfully', _this.alertoptions);
                _this.userStore.profilePic = resp.data.profilePic;
            }
            else {
                _this.alertService.error('Failed : ' + resp.errorMessages, _this.alertoptions);
            }
            _this.passwordLoading = false;
        }, function (error) {
            _this.alertService.error('Something went wrong', _this.alertoptions);
            _this.passwordLoading = false;
        });
    };
    ProfileComponent.ctorParameters = function () { return [
        { type: _service_userStore_user_store_service__WEBPACK_IMPORTED_MODULE_3__["UserStoreService"] },
        { type: _service_tenantStore_tenant_store_service__WEBPACK_IMPORTED_MODULE_6__["TenantStoreService"] },
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_2__["AlertService"] },
        { type: _shared_profile_profile_service__WEBPACK_IMPORTED_MODULE_4__["ProfileService"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"] }
    ]; };
    ProfileComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./profile.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/profile/profile.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./profile.component.scss */ "./src/app/views/profile/profile.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_service_userStore_user_store_service__WEBPACK_IMPORTED_MODULE_3__["UserStoreService"],
            _service_tenantStore_tenant_store_service__WEBPACK_IMPORTED_MODULE_6__["TenantStoreService"],
            _shared_alert__WEBPACK_IMPORTED_MODULE_2__["AlertService"],
            _shared_profile_profile_service__WEBPACK_IMPORTED_MODULE_4__["ProfileService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/views/profile/profile.module.ts":
/*!*************************************************!*\
  !*** ./src/app/views/profile/profile.module.ts ***!
  \*************************************************/
/*! exports provided: ProfileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/carousel */ "./node_modules/ngx-bootstrap/carousel/fesm5/ngx-bootstrap-carousel.js");
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
/* harmony import */ var _profile_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./profile.component */ "./src/app/views/profile/profile.component.ts");
/* harmony import */ var _profile_routing_module__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./profile-routing.module */ "./src/app/views/profile/profile-routing.module.ts");
/* harmony import */ var ngx_typeahead__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ngx-typeahead */ "./node_modules/ngx-typeahead/fesm5/ngx-typeahead.js");








// Material modules





































var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _profile_component__WEBPACK_IMPORTED_MODULE_42__["ProfileComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _profile_routing_module__WEBPACK_IMPORTED_MODULE_43__["ProfileRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_typeahead__WEBPACK_IMPORTED_MODULE_44__["NgxTypeaheadModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_4__["NgxLoadingModule"].forRoot({
                    animationType: ngx_loading__WEBPACK_IMPORTED_MODULE_4__["ngxLoadingAnimationTypes"].rectangleBounce,
                    backdropBackgroundColour: 'rgba(0,0,0,0.3)',
                    backdropBorderRadius: '4px',
                    primaryColour: 'cornflowerblue',
                    secondaryColour: 'chocolate',
                    tertiaryColour: 'darkred'
                }),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_6__["CarouselModule"],
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
                _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_7__["AlertModule"]
            ]
        })
    ], ProfileModule);
    return ProfileModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-profile-profile-module.js.map