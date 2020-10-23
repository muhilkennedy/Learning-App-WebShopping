(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-invoice-invoice-template-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/invoice/invoice-template.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/invoice/invoice-template.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<alert class=\"p-4 text-center\"></alert>\n<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"card\">\n        <ngx-loading [show]=\"loading\"></ngx-loading>\n        <div class=\"card-header\">\n          <i class=\"fa fa-file-text\"></i>Manage INVOICE TEMPLATE\n          <div class=\"float-right\">\n            <button mat-button class=\"btn btn-ghost-primary\" style=\"border: 1px solid;\" (click)=\"uploadFile()\">\n              <i class=\"fa fa-file-word-o\"></i> Upload File\n            </button>\n          </div>\n        </div>\n        <div class=\"card-body\" >\n          <div class=\"row\" >\n            <input type=\"file\" (change)=\"handleFileUpdate($event.target.files)\">\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"card\">\n        <ngx-loading [show]=\"documentLoading\"></ngx-loading>\n        <div class=\"card-header\">\n          <i class=\"fa fa-file-pdf-o\"></i>Current Invoice Template\n          <div class=\"float-right\">\n            <a [href]=\"downloadURl\" download=\"ActiveTemplate.docx\">DownloadFile</a>\n          </div>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <pdf-viewer [src]=\"pdfSrc\"\n                        [render-text]=\"true\"\n                        style=\"display: block;\">\n            </pdf-viewer>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./src/app/shared/invoice/invoice.service.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/invoice/invoice.service.ts ***!
  \***************************************************/
/*! exports provided: InvoiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceService", function() { return InvoiceService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");




var InvoiceService = /** @class */ (function () {
    function InvoiceService(http) {
        this.http = http;
        this.createTemplateEndpoint = "/secure/admin/template/createTemplate";
        this.getTemplatePDFEndpoint = "/secure/admin/template/getActiveTemplate";
        this.getTemplateDocumentEndpoint = "/secure/admin/template/downloadActiveTemplate";
    }
    InvoiceService.prototype.uploadTemplate = function (file) {
        var uploadData = new FormData();
        uploadData.append('myFile', file);
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.createTemplateEndpoint, uploadData);
    };
    InvoiceService.prototype.getTemplate = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getTemplatePDFEndpoint, { responseType: 'arraybuffer' });
    };
    InvoiceService.prototype.getTemplateDocument = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getTemplateDocumentEndpoint, { responseType: 'arraybuffer' });
    };
    InvoiceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    InvoiceService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], InvoiceService);
    return InvoiceService;
}());



/***/ }),

/***/ "./src/app/views/invoice/invoice-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/invoice/invoice-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: InvoiceTemplateRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceTemplateRoutingModule", function() { return InvoiceTemplateRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _invoice_template_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./invoice-template.component */ "./src/app/views/invoice/invoice-template.component.ts");




var routes = [
    {
        path: '',
        data: {
            title: 'Invoice Template'
        },
        children: [
            {
                path: '',
                redirectTo: 'invoice-template'
            },
            {
                path: 'invoice-template',
                component: _invoice_template_component__WEBPACK_IMPORTED_MODULE_3__["InvoiceTemplateComponent"],
                data: {
                    title: 'Templates'
                }
            }
        ]
    }
];
var InvoiceTemplateRoutingModule = /** @class */ (function () {
    function InvoiceTemplateRoutingModule() {
    }
    InvoiceTemplateRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], InvoiceTemplateRoutingModule);
    return InvoiceTemplateRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/invoice/invoice-template.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/views/invoice/invoice-template.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2ludm9pY2UvaW52b2ljZS10ZW1wbGF0ZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/invoice/invoice-template.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/invoice/invoice-template.component.ts ***!
  \*************************************************************/
/*! exports provided: InvoiceTemplateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceTemplateComponent", function() { return InvoiceTemplateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/_alert */ "./src/app/shared/_alert/index.ts");
/* harmony import */ var _shared_invoice_invoice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/invoice/invoice.service */ "./src/app/shared/invoice/invoice.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");





var InvoiceTemplateComponent = /** @class */ (function () {
    function InvoiceTemplateComponent(alertService, invoiceService, sanitizer) {
        this.alertService = alertService;
        this.invoiceService = invoiceService;
        this.sanitizer = sanitizer;
        this.loading = false;
        this.documentLoading = true;
    }
    InvoiceTemplateComponent.prototype.ngOnInit = function () {
        this.getActiveTemplatePDF();
        this.prepareDownloadFile();
    };
    InvoiceTemplateComponent.prototype.handleFileUpdate = function (files) {
        if (this.isValidFile(files.item(0).name)) {
            this.fileToUpdate = files.item(0);
        }
        else {
            this.alertService.error('Format not supported! Please upload doc/docx file');
        }
    };
    InvoiceTemplateComponent.prototype.isValidFile = function (name) {
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx') {
            return true;
        }
        else {
            return false;
        }
    };
    InvoiceTemplateComponent.prototype.uploadFile = function () {
        var _this = this;
        this.loading = true;
        this.invoiceService.uploadTemplate(this.fileToUpdate)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.alertService.success("Template Uploaded Successfully!");
                _this.getActiveTemplatePDF();
                _this.prepareDownloadFile();
            }
            else {
                _this.alertService.error("Failed to upload template : " + resp.errorMessages);
            }
            _this.loading = false;
        }, function (error) {
            _this.alertService.error("Something went wrong!", error);
            _this.loading = false;
        });
    };
    InvoiceTemplateComponent.prototype.getActiveTemplatePDF = function () {
        var _this = this;
        this.invoiceService.getTemplate()
            .subscribe(function (resp) {
            if (resp.statusCode != undefined && resp.statusCode === 204) {
                _this.alertService.warn("No Active template Found! Please upload a Invoice Template");
            }
            else {
                var file = new Blob([resp], { type: 'application/vnd.openxmlformats' });
                var fileURL = URL.createObjectURL(file);
                _this.pdfSrc = fileURL;
            }
            _this.documentLoading = false;
        }, function (error) {
            _this.alertService.error("Something went wrong!", error);
            _this.documentLoading = false;
        });
    };
    InvoiceTemplateComponent.prototype.prepareDownloadFile = function () {
        var _this = this;
        this.invoiceService.getTemplateDocument()
            .subscribe(function (resp) {
            if (resp.statusCode != undefined && resp.statusCode === 204) {
                _this.alertService.warn("No Active template Found! Please upload a Invoice Template");
            }
            else {
                var blob = new Blob([resp], { type: 'application/octet-stream' });
                _this.downloadURl = _this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            }
            _this.documentLoading = false;
        }, function (error) {
            _this.alertService.error("Something went wrong!", error);
            _this.documentLoading = false;
        });
    };
    InvoiceTemplateComponent.ctorParameters = function () { return [
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_2__["AlertService"] },
        { type: _shared_invoice_invoice_service__WEBPACK_IMPORTED_MODULE_3__["InvoiceService"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"] }
    ]; };
    InvoiceTemplateComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./invoice-template.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/invoice/invoice-template.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./invoice-template.component.scss */ "./src/app/views/invoice/invoice-template.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_shared_alert__WEBPACK_IMPORTED_MODULE_2__["AlertService"], _shared_invoice_invoice_service__WEBPACK_IMPORTED_MODULE_3__["InvoiceService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"]])
    ], InvoiceTemplateComponent);
    return InvoiceTemplateComponent;
}());



/***/ }),

/***/ "./src/app/views/invoice/invoice-template.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/invoice/invoice-template.module.ts ***!
  \**********************************************************/
/*! exports provided: InvoiceTemplateModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceTemplateModule", function() { return InvoiceTemplateModule; });
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
/* harmony import */ var ngx_typeahead__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ngx-typeahead */ "./node_modules/ngx-typeahead/fesm5/ngx-typeahead.js");
/* harmony import */ var _invoice_template_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./invoice-template.component */ "./src/app/views/invoice/invoice-template.component.ts");
/* harmony import */ var _invoice_routing_module__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./invoice-routing.module */ "./src/app/views/invoice/invoice-routing.module.ts");
/* harmony import */ var ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ng2-pdf-viewer */ "./node_modules/ng2-pdf-viewer/fesm5/ng2-pdf-viewer.js");








// Material modules






































var InvoiceTemplateModule = /** @class */ (function () {
    function InvoiceTemplateModule() {
    }
    InvoiceTemplateModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _invoice_template_component__WEBPACK_IMPORTED_MODULE_43__["InvoiceTemplateComponent"]
            ],
            imports: [
                _invoice_routing_module__WEBPACK_IMPORTED_MODULE_44__["InvoiceTemplateRoutingModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_typeahead__WEBPACK_IMPORTED_MODULE_42__["NgxTypeaheadModule"],
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
                _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_7__["AlertModule"],
                ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_45__["PdfViewerModule"]
            ]
        })
    ], InvoiceTemplateModule);
    return InvoiceTemplateModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-invoice-invoice-template-module.js.map