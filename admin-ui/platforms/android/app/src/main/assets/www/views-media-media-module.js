(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-media-media-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/media/media.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/media/media.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<alert class=\"p-4 text-center\"></alert>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-image\"></i>Home Slider Images\r\n          <div class=\"card-header-actions\">\r\n            <a href=\"#\" target=\"_blank\">\r\n              <small className=\"text-muted\">View Home</small>\r\n            </a>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel [interval]=\"false\" >\r\n            <slide *ngFor=\"let slide of sliderImages\">\r\n              <label>Media-ID -> {{slide.mediaId}}</label>\r\n              <img src={{slide.image}} alt=\"images\" style=\"display: block; width: 100%;\">\r\n            </slide>\r\n          </carousel>\r\n          <hr/>\r\n          <mat-hint><i class=\"fa fa-info-circle\"></i> Suggested Resolution = 1900 x 700</mat-hint>\r\n          <div class=\"form-group\">\r\n            <mat-radio-group\r\n              aria-labelledby=\"example-radio-group-label\"\r\n              class=\"example-radio-group\"\r\n              [(ngModel)]=\"sliderAction\">\r\n              <mat-radio-button class=\"example-radio-button\" *ngFor=\"let action of sliderActions\" [value]=\"action\">\r\n                {{action}}\r\n              </mat-radio-button>\r\n            </mat-radio-group>\r\n            <div *ngIf=\"showSliderUpdate(); else elseBlock\">\r\n              <mat-form-field appearance=\"fill\" class=\"matitem\">\r\n                <mat-label>Image ID</mat-label>\r\n                <input matInput placeholder=\"Image-ID\" [(ngModel)]=\"mediaId\" required>\r\n              </mat-form-field>\r\n                <input type=\"file\"\r\n                       id=\"updateFile\"\r\n                       (change)=\"handleFileUpdate($event.target.files)\">\r\n                <br/><br/>\r\n                <button mat-button class=\"btn btn-ghost-success\" style=\"border: 1px solid;\" (click)=\"updateSliderImage(mediaId)\">\r\n                  <i class=\"fa fa-upload\"></i> Update Image\r\n                </button>\r\n                <button mat-button class=\"btn btn-ghost-danger float-right\" style=\"border: 1px solid;\" (click)=\"removeImage(mediaId)\">\r\n                  <i class=\"fa fa-remove\"></i> Remove Image\r\n                </button>\r\n            </div>\r\n            <ng-template #elseBlock>\r\n              <hr/>\r\n              <br/>\r\n              <label for=\"file\">Add New Image</label>\r\n              <input type=\"file\"\r\n                    id=\"file\"\r\n                    (change)=\"handleFileAdd($event.target.files)\">\r\n              <button mat-button class=\"btn btn-ghost-success\" style=\"border: 1px solid;\" (click)=\"addImageToSlider()\">\r\n                <i class=\"fa fa-upload\"></i> Add Image\r\n              </button>\r\n            </ng-template>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- SECOND CARD -->\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-file-image-o\"></i>Home Media Images\r\n          <small> (intial load images)</small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel [interval]=\"false\">\r\n            <slide *ngFor=\"let slide of homeImages\">\r\n              <label>Media-ID -> {{slide.mediaId}}</label>\r\n              <img src={{slide.image}} alt=\"slides\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\" style=\"color: black;\">\r\n                <h3>{{slide.title}}</h3>\r\n                <p>{{slide.description}}</p>\r\n              </div>\r\n            </slide>\r\n          </carousel>\r\n          <hr/>\r\n          <mat-hint><i class=\"fa fa-info-circle\"></i> Suggested Resolution = 1200 X 900</mat-hint><br/>\r\n          <!-- <mat-hint><i class=\"fa fa-warning\"></i>\r\n            (Default Image Count = 2) Increasing the limit will result in UX change.<br/>\r\n            Raise a TICKET to increase the Media limit.\r\n          </mat-hint> -->\r\n          <div class=\"form-group\">\r\n            <mat-radio-group\r\n              aria-labelledby=\"example-radio-group-label\"\r\n              class=\"example-radio-group\"\r\n              [(ngModel)]=\"homeMediaAction\">\r\n              <mat-radio-button class=\"example-radio-button\" *ngFor=\"let action of sliderActions\" [value]=\"action\">\r\n                {{action}}\r\n              </mat-radio-button>\r\n            </mat-radio-group>\r\n            <div *ngIf=\"showHomeUpdate(); else elseBlock1\">\r\n              <mat-form-field appearance=\"fill\" class=\"matitem\">\r\n                <mat-label>Image ID</mat-label>\r\n                <input matInput placeholder=\"Title\" [(ngModel)]=\"mediaId\" required>\r\n              </mat-form-field>\r\n            <div>\r\n              <div>\r\n                <select id=\"select1\" name=\"select1\" class=\"form-control\" [(value)]=\"selectedValue\" (change)=\"changeSlected($event)\">\r\n                  <option disabled value=\"\">Select the Type of Media</option>\r\n                  <option value=\"none\">NONE</option>\r\n                  <option value=\"shop\">SHOP NOW</option>\r\n                  <option value=\"contact\">CONTACT</option>\r\n                </select>\r\n              </div>\r\n              <br/>\r\n              <div >\r\n                <input type=\"text\" id=\"text-input\" name=\"text-input\" class=\"form-control\" placeholder=\"Media Title\" [(ngModel)]=\"title\">\r\n              </div>\r\n              <br/>\r\n              <div >\r\n                <input type=\"text\" id=\"text-input\" name=\"text-input\" class=\"form-control\" placeholder=\"Media Message\" [(ngModel)]=\"message\">\r\n              </div>\r\n              <br/>\r\n              <div>\r\n                <textarea id=\"textarea-input\" name=\"textarea-input\" rows=\"3\" class=\"form-control\" placeholder=\"Description...\" [(ngModel)]=\"description\"></textarea>\r\n              </div>\r\n              <br/>\r\n              <input type=\"file\"\r\n              id=\"updateFile\"\r\n              (change)=\"handleFileAdd($event.target.files)\"/>\r\n              <br/><br/>\r\n              <button mat-button class=\"btn btn-ghost-success\" style=\"border: 1px solid;\" (click)=\"updateHomeImage(mediaId)\">\r\n                  <i class=\"fa fa-upload\"></i> Update Image\r\n              </button>\r\n              <button mat-button class=\"btn btn-ghost-danger float-right\" style=\"border: 1px solid;\" (click)=\"removeImage(mediaId)\">\r\n                  <i class=\"fa fa-remove\"></i> Remove Image\r\n              </button>\r\n            </div>\r\n          </div>\r\n          <ng-template #elseBlock1>\r\n            <div>\r\n              <select id=\"select1\" name=\"select1\" class=\"form-control\" [(value)]=\"selectedValue\" (change)=\"changeSlected($event)\">\r\n                <option disabled value=\"\">Select the Type of Media</option>\r\n                <option value=\"none\">NONE</option>\r\n                <option value=\"shop\">SHOP NOW</option>\r\n                <option value=\"contact\">CONTACT</option>\r\n              </select>\r\n            </div>\r\n            <br/>\r\n            <div >\r\n              <input type=\"text\" id=\"text-input\" name=\"text-input\" class=\"form-control\" placeholder=\"Media Title\" [(ngModel)]=\"title\"/>\r\n            </div>\r\n            <br/>\r\n              <div >\r\n                <input type=\"text\" id=\"text-input\" name=\"text-input\" class=\"form-control\" placeholder=\"Message\" [(ngModel)]=\"message\">\r\n              </div>\r\n            <br/>\r\n            <div>\r\n              <textarea id=\"textarea-input\" name=\"textarea-input\" rows=\"3\" class=\"form-control\" placeholder=\"Description...\" [(ngModel)]=\"description\"></textarea>\r\n            </div>\r\n            <br/>\r\n            <input type=\"file\"\r\n            id=\"updateFile\"\r\n            (change)=\"handleFileAdd($event.target.files)\"/>\r\n            <button mat-button class=\"btn btn-ghost-success float-right\" style=\"border: 1px solid;\" (click)=\"addImageToHome()\">\r\n              <i class=\"fa fa-upload\"></i> Add Home Image\r\n          </button>\r\n          </ng-template>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/shared/media/media.service.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/media/media.service.ts ***!
  \***********************************************/
/*! exports provided: MediaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaService", function() { return MediaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");




var MediaService = /** @class */ (function () {
    function MediaService(http) {
        this.http = http;
        this.allimagesEndPoint = "/base/homeMedia";
        this.updateImageEndPoint = "/secure/admin/media/updateMedia";
        this.addImageEndPoint = "/secure/admin/media/addMedia";
        this.deleteImageEndPoint = "/secure/admin/media/deleteMedia";
    }
    MediaService.prototype.getAllImages = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.allimagesEndPoint);
    };
    MediaService.prototype.addImage = function (file, isSlider, isShopNow, isContact, title, description, message) {
        var uploadData = new FormData();
        uploadData.append('myFile', file);
        uploadData.append('isSlider', isSlider);
        uploadData.append('isShop', isShopNow);
        uploadData.append('isContact', isContact);
        uploadData.append('desc', description);
        uploadData.append('title', title);
        uploadData.append('message', message);
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.addImageEndPoint, uploadData);
    };
    MediaService.prototype.deleteImage = function (imageId) {
        var httpOptions = {
            params: { id: imageId }
        };
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.deleteImageEndPoint, httpOptions);
    };
    MediaService.prototype.updateImage = function (file, imageId, isSlider, isShopNow, isContact, title, description, message) {
        var uploadData = new FormData();
        uploadData.append('myFile', file);
        uploadData.append('id', imageId);
        uploadData.append('isSlider', isSlider);
        uploadData.append('isShop', isShopNow);
        uploadData.append('isContact', isContact);
        uploadData.append('desc', description);
        uploadData.append('title', title);
        uploadData.append('message', message);
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.updateImageEndPoint, uploadData);
    };
    MediaService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    MediaService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], MediaService);
    return MediaService;
}());



/***/ }),

/***/ "./src/app/views/media/media-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/media/media-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: MediaRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaRoutingModule", function() { return MediaRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _media_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./media.component */ "./src/app/views/media/media.component.ts");




var routes = [
    {
        path: '',
        data: {
            title: 'Media'
        },
        children: [
            {
                path: '',
                redirectTo: 'media'
            },
            {
                path: 'media',
                component: _media_component__WEBPACK_IMPORTED_MODULE_3__["MediaComponent"],
                data: {
                    title: 'Manage Media'
                }
            }
        ]
    }
];
var MediaRoutingModule = /** @class */ (function () {
    function MediaRoutingModule() {
    }
    MediaRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], MediaRoutingModule);
    return MediaRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/media/media.component.css":
/*!*************************************************!*\
  !*** ./src/app/views/media/media.component.css ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".example-radio-group {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin: 15px 0;\r\n}\r\n\r\n.example-radio-button {\r\n  margin: 5px;\r\n}\r\n\r\n.matitem{\r\n  width: 100%;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbWVkaWEvbWVkaWEuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21lZGlhL21lZGlhLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1yYWRpby1ncm91cCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIG1hcmdpbjogMTVweCAwO1xyXG59XHJcblxyXG4uZXhhbXBsZS1yYWRpby1idXR0b24ge1xyXG4gIG1hcmdpbjogNXB4O1xyXG59XHJcblxyXG4ubWF0aXRlbXtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/views/media/media.component.ts":
/*!************************************************!*\
  !*** ./src/app/views/media/media.component.ts ***!
  \************************************************/
/*! exports provided: MediaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaComponent", function() { return MediaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_media_media_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/media/media.service */ "./src/app/shared/media/media.service.ts");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/_alert */ "./src/app/shared/_alert/index.ts");




var MediaComponent = /** @class */ (function () {
    function MediaComponent(mediaService, alertService) {
        this.mediaService = mediaService;
        this.alertService = alertService;
        this.loading = false;
        this.alertoptions = {
            autoClose: false,
            keepAfterRouteChange: false
        };
        this.sliderImages = new Array();
        this.homeImages = new Array();
        this.fileToUpdate = null;
        this.fileToAdd = null;
        this.selectedValue = "";
        this.sliderActions = ['Update', 'Create'];
        this.sliderAction = this.sliderActions[0];
        this.homeMediaAction = this.sliderActions[0];
    }
    MediaComponent.prototype.changeSlected = function (event) {
        this.selectedValue = event.target.value;
        if (this.selectedValue === 'none') {
            this.isShopNow = false;
            this.isContact = false;
        }
        if (this.selectedValue === 'shop') {
            this.isShopNow = true;
            this.isContact = false;
        }
        if (this.selectedValue === 'contact') {
            this.isShopNow = false;
            this.isContact = true;
        }
    };
    MediaComponent.prototype.ngOnInit = function () {
        this.refreshImages();
    };
    MediaComponent.prototype.refreshImages = function () {
        var _this = this;
        this.loading = true;
        this.sliderImages.length = 0;
        this.homeImages.length = 0;
        this.mediaService.getAllImages()
            .subscribe(function (resp) {
            resp.dataList.forEach(function (element) {
                if (element.sliderShow) {
                    _this.sliderImages.push(element);
                }
                else {
                    _this.homeImages.push(element);
                }
            });
            _this.loading = false;
        }, function (error) {
            _this.alertService.error('Something went wrong!', _this.alertoptions);
        });
    };
    MediaComponent.prototype.handleFileUpdate = function (files) {
        this.fileToUpdate = files.item(0);
    };
    MediaComponent.prototype.handleFileAdd = function (files) {
        this.fileToAdd = files.item(0);
    };
    MediaComponent.prototype.removeImage = function (mediaId) {
        var _this = this;
        this.mediaService.deleteImage(mediaId)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.refreshImages();
            }
            else {
                _this.alertService.error('Failed - ' + resp.errorMessages, _this.alertoptions);
            }
        }, function (error) {
            _this.alertService.error('Something went wrong!', _this.alertoptions);
        });
    };
    MediaComponent.prototype.updateSliderImage = function (mediaId) {
        var _this = this;
        this.mediaService.updateImage(this.fileToUpdate, mediaId, true, false, false, this.title, this.description, this.message)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.refreshImages();
            }
            else {
                _this.alertService.error('Failed - ' + resp.errorMessages, _this.alertoptions);
            }
        }, function (error) {
            _this.alertService.error('Something went wrong!', _this.alertoptions);
        });
    };
    MediaComponent.prototype.updateHomeImage = function (mediaId) {
        var _this = this;
        this.loading = true;
        this.mediaService.updateImage(this.fileToAdd, mediaId, false, this.isShopNow, this.isContact, this.title, this.description, this.message)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.refreshImages();
            }
            else {
                _this.alertService.error('Failed - ' + resp.errorMessages, _this.alertoptions);
            }
        }, function (error) {
            _this.alertService.error('Something went wrong!', _this.alertoptions);
        });
    };
    MediaComponent.prototype.addImageToSlider = function () {
        var _this = this;
        this.mediaService.addImage(this.fileToAdd, true, false, false, this.title, this.description, this.message)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.refreshImages();
            }
            else {
                _this.alertService.error('Failed - ' + resp.errorMessages, _this.alertoptions);
            }
        }, function (error) {
            _this.alertService.error('Something went wrong!', _this.alertoptions);
        });
    };
    MediaComponent.prototype.addImageToHome = function () {
        var _this = this;
        this.mediaService.addImage(this.fileToAdd, false, this.isShopNow, this.isContact, this.title, this.description, this.message)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.refreshImages();
            }
            else {
                _this.alertService.error('Failed - ' + resp.errorMessages, _this.alertoptions);
            }
        }, function (error) {
            _this.alertService.error('Something went wrong!', _this.alertoptions);
        });
    };
    MediaComponent.prototype.showSliderUpdate = function () {
        if (this.sliderAction === this.sliderActions[0]) {
            return true;
        }
        else {
            return false;
        }
    };
    MediaComponent.prototype.showHomeUpdate = function () {
        if (this.homeMediaAction === this.sliderActions[0]) {
            return true;
        }
        else {
            return false;
        }
    };
    MediaComponent.ctorParameters = function () { return [
        { type: _shared_media_media_service__WEBPACK_IMPORTED_MODULE_2__["MediaService"] },
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_3__["AlertService"] }
    ]; };
    MediaComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./media.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/media/media.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./media.component.css */ "./src/app/views/media/media.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_shared_media_media_service__WEBPACK_IMPORTED_MODULE_2__["MediaService"], _shared_alert__WEBPACK_IMPORTED_MODULE_3__["AlertService"]])
    ], MediaComponent);
    return MediaComponent;
}());



/***/ }),

/***/ "./src/app/views/media/media.module.ts":
/*!*********************************************!*\
  !*** ./src/app/views/media/media.module.ts ***!
  \*********************************************/
/*! exports provided: MediaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaModule", function() { return MediaModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _media_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./media-routing.module */ "./src/app/views/media/media-routing.module.ts");
/* harmony import */ var _media_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./media.component */ "./src/app/views/media/media.component.ts");
/* harmony import */ var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/carousel */ "./node_modules/ngx-bootstrap/carousel/fesm5/ngx-bootstrap-carousel.js");
/* harmony import */ var _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/_alert/alert.module */ "./src/app/shared/_alert/alert.module.ts");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm5/autocomplete.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/fesm5/badge.js");
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/bottom-sheet */ "./node_modules/@angular/material/fesm5/bottom-sheet.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm5/button.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/fesm5/button-toggle.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/fesm5/checkbox.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/fesm5/chips.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/fesm5/stepper.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/fesm5/datepicker.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/fesm5/divider.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/fesm5/expansion.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/fesm5/grid-list.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/fesm5/icon.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm5/input.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/fesm5/list.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/fesm5/menu.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/fesm5/paginator.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/fesm5/progress-bar.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm5/progress-spinner.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/fesm5/radio.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/fesm5/select.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/fesm5/sidenav.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/fesm5/slider.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/fesm5/slide-toggle.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/fesm5/snack-bar.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/fesm5/sort.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/fesm5/table.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/fesm5/tabs.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/fesm5/toolbar.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm5/tooltip.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/fesm5/tree.js");










// Material modules


































var MediaModule = /** @class */ (function () {
    function MediaModule() {
    }
    MediaModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _media_component__WEBPACK_IMPORTED_MODULE_7__["MediaComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _media_routing_module__WEBPACK_IMPORTED_MODULE_6__["MediaRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_4__["NgxLoadingModule"].forRoot({
                    animationType: ngx_loading__WEBPACK_IMPORTED_MODULE_4__["ngxLoadingAnimationTypes"].rectangleBounce,
                    backdropBackgroundColour: 'rgba(0,0,0,0.3)',
                    backdropBorderRadius: '4px',
                    primaryColour: 'cornflowerblue',
                    secondaryColour: 'chocolate',
                    tertiaryColour: 'darkred'
                }),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_8__["CarouselModule"],
                _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocompleteModule"],
                _angular_material_badge__WEBPACK_IMPORTED_MODULE_11__["MatBadgeModule"],
                _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_12__["MatBottomSheetModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_13__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_14__["MatButtonToggleModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_15__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__["MatCheckboxModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__["MatChipsModule"],
                _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__["MatStepperModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_19__["MatDatepickerModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_20__["MatDialogModule"],
                _angular_material_divider__WEBPACK_IMPORTED_MODULE_21__["MatDividerModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_22__["MatExpansionModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_23__["MatGridListModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_24__["MatIconModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_25__["MatInputModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_26__["MatListModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__["MatMenuModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_28__["MatNativeDateModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__["MatPaginatorModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_30__["MatProgressBarModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__["MatProgressSpinnerModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_32__["MatRadioModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_28__["MatRippleModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_33__["MatSelectModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_34__["MatSidenavModule"],
                _angular_material_slider__WEBPACK_IMPORTED_MODULE_35__["MatSliderModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_36__["MatSlideToggleModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_37__["MatSnackBarModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__["MatSortModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_39__["MatTableModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_40__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_41__["MatToolbarModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_42__["MatTooltipModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_43__["MatTreeModule"],
                _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_9__["AlertModule"]
            ]
        })
    ], MediaModule);
    return MediaModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-media-media-module.js.map