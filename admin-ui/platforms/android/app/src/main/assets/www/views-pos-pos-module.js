(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-pos-pos-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/pos/pos.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/pos/pos.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <i class=\"fa fa-money\"></i>Point Of Sale (POS) - Billing\n          <!--remove later-->\n          <!-- <strong>Status: {{status}}</strong> -->\n          <div class=\"float-right\">\n              <button (click)=\"requestUsb()\">Connect to USB</button>\n          </div>\n          <!-- <div class=\"float-right\">\n              <button (click)=\"print()\" [disabled]=\"status === false\"> Print!</button>\n          </div> -->\n        </div>\n        <div class=\"card-body\">\n          <input type=\"text\" class=\"form-control\" matInput placeholder=\"Customer Mobile\" id=\"customernumber\" name=\"customernumber\" [(ngModel)]=\"customerMobile\">\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n            <label>Customer Name : </label>\n            <br/>\n            <label>Customer Email : </label>\n            <br/>\n            <label>Loyalty Points : </label>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-2\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <barcode-scanner-livestream\n            type=\"code_128\"\n            (valueChanges)=\"onValueChanges($event)\"\n            (started)=\"(onStarted($event))\"\n          ></barcode-scanner-livestream>\n          <div [hidden]=\"!barcodeValue\">\n            {{ barcodeValue }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"card\">\n        <ngx-loading [show]=\"loading\"></ngx-loading>\n        <div class=\"card-body\">\n          <table class=\"table table-responsive-sm table-hover table-outline mb-0\">\n            <thead class=\"thead-light\">\n              <tr>\n                <th>SL.NO</th>\n                <th>Item Name</th>\n                <th>Item Code</th>\n                <th>MRP</th>\n                <th>QUANTITY</th>\n                <th>DISCONT</th>\n                <th>TOTAL</th>\n              </tr>\n            </thead>\n            <tbody style=\"background: white;\">\n              <tr *ngFor=\"let item of itemList; let i = index\">\n                <td>{{i+1}}</td>\n                <td><input type=\"text\" class=\"form-control\" matInput placeholder=\"Product Name\" id=\"pname-{{i}}\" name=\"pname-{{i}}\" [(ngModel)]=\"item.itemName\"></td>\n                <td><input type=\"text\" class=\"form-control\" matInput placeholder=\"Product Code\" id=\"pcode-{{i}}\" name=\"pcode-{{i}}\" [(ngModel)]=\"item.itemCode\"></td>\n                <td><input type=\"number\" class=\"form-control\" style=\"width: 50%;\" matInput placeholder=\"MRP\" id=\"mrp-{{i}}\" name=\"mrp-{{i}}\" [(ngModel)]=\"item.mrp\"></td>\n                <td><input type=\"number\" class=\"form-control\" style=\"width: 50%;\" matInput placeholder=\"Total Quantity\" id=\"q-{{i}}\" name=\"q-{{i}}\" [(ngModel)]=\"item.quantity\"></td>\n                <td><input type=\"number\" class=\"form-control\" style=\"width: 50%;\" matInput placeholder=\"Discount\" id=\"dis-{{i}}\" name=\"dis-{{i}}\" [(ngModel)]=\"item.discount\"></td>\n                <td>₹-{{calculateTotal(item)}}</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./src/app/shared/pos/posProduct.ts":
/*!******************************************!*\
  !*** ./src/app/shared/pos/posProduct.ts ***!
  \******************************************/
/*! exports provided: PosProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosProduct", function() { return PosProduct; });
var PosProduct = /** @class */ (function () {
    function PosProduct() {
    }
    return PosProduct;
}());



/***/ }),

/***/ "./src/app/views/pos/pos-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/views/pos/pos-routing.module.ts ***!
  \*************************************************/
/*! exports provided: PosRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosRoutingModule", function() { return PosRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pos_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pos.component */ "./src/app/views/pos/pos.component.ts");




var routes = [
    {
        path: '',
        data: {
            title: 'Point Of Sale'
        },
        children: [
            {
                path: '',
                redirectTo: 'pos'
            },
            {
                path: 'pos',
                component: _pos_component__WEBPACK_IMPORTED_MODULE_3__["PosComponent"],
                data: {
                    title: 'Point Of Sale'
                }
            }
        ]
    }
];
var PosRoutingModule = /** @class */ (function () {
    function PosRoutingModule() {
    }
    PosRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], PosRoutingModule);
    return PosRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/pos/pos.component.scss":
/*!**********************************************!*\
  !*** ./src/app/views/pos/pos.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Bvcy9wb3MuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/pos/pos.component.ts":
/*!********************************************!*\
  !*** ./src/app/views/pos/pos.component.ts ***!
  \********************************************/
/*! exports provided: PosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosComponent", function() { return PosComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_barcode_scanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-barcode-scanner */ "./node_modules/ngx-barcode-scanner/fesm2015/ngx-barcode-scanner.js");
/* harmony import */ var _shared_pos_posProduct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/pos/posProduct */ "./src/app/shared/pos/posProduct.ts");
/* harmony import */ var ng_thermal_print__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-thermal-print */ "./node_modules/ng-thermal-print/fesm2015/ng-thermal-print.js");
/* harmony import */ var _shared_product_product_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/product/product.service */ "./src/app/shared/product/product.service.ts");







var PosComponent = /** @class */ (function () {
    function PosComponent(printService, productService) {
        var _this = this;
        this.printService = printService;
        this.productService = productService;
        this.loading = false;
        this.itemList = new Array();
        this.prod = new _shared_pos_posProduct__WEBPACK_IMPORTED_MODULE_3__["PosProduct"]();
        //PRINTER RELATED
        this.status = false;
        this.ip = '';
        this.barcodeValue = '';
        this.usbPrintDriver = new ng_thermal_print__WEBPACK_IMPORTED_MODULE_4__["UsbDriver"]();
        this.printService.isConnected.subscribe(function (result) {
            _this.status = result;
            if (result) {
                console.log('Connected to printer!!!');
            }
            else {
                console.log('Not connected to printer.');
            }
        });
    }
    //Insert new entry incase of shift and enter key press
    PosComponent.prototype.onKeyDown = function (e) {
        if (e.keyCode == 13 && e.shiftKey) {
            var newProd = new _shared_pos_posProduct__WEBPACK_IMPORTED_MODULE_3__["PosProduct"]();
            this.itemList.push(newProd);
        }
    };
    PosComponent.prototype.ngOnInit = function () {
        var newProd = new _shared_pos_posProduct__WEBPACK_IMPORTED_MODULE_3__["PosProduct"]();
        this.itemList.push(newProd);
    };
    PosComponent.prototype.requestUsb = function () {
        var _this = this;
        this.usbPrintDriver.requestUsb().subscribe(function (result) {
            _this.printService.setDriver(_this.usbPrintDriver, 'ESC/POS');
        });
    };
    PosComponent.prototype.connectToWebPrint = function () {
        this.webPrintDriver = new ng_thermal_print__WEBPACK_IMPORTED_MODULE_4__["WebPrintDriver"](this.ip);
        this.printService.setDriver(this.webPrintDriver, 'WebPRNT');
    };
    PosComponent.prototype.print = function (driver) {
        this.printService.init()
            .setBold(true)
            .writeLine('Hello World!')
            .setBold(false)
            .feed(4)
            .cut('full')
            .flush();
    };
    PosComponent.prototype.ngAfterViewInit = function () {
        this.barecodeScanner.start();
    };
    PosComponent.prototype.onValueChanges = function (result) {
        if (this.barcodeValue != result.codeResult.code) {
            this.barcodeValue = result.codeResult.code;
            this.getProductFromCode(result.codeResult.code);
        }
    };
    PosComponent.prototype.onStarted = function (started) {
        console.log("Camera Active = ", started);
    };
    //PRODUCT APP LOGIC
    PosComponent.prototype.getProductFromCode = function (code) {
        var _this = this;
        this.loading = true;
        this.productService.getPoductByCode(code)
            .subscribe(function (resp) {
            var newProd;
            var doPush = false;
            if (_this.isLastItemEmpty()) {
                newProd = _this.itemList[_this.itemList.length - 1];
            }
            else {
                newProd = new _shared_pos_posProduct__WEBPACK_IMPORTED_MODULE_3__["PosProduct"]();
                doPush = true;
            }
            newProd.itemName = resp.data.productName;
            newProd.mrp = resp.data.cost;
            newProd.discount = resp.data.offer;
            newProd.itemCode = resp.data.productCode;
            if (doPush) {
                _this.itemList.push(newProd);
            }
            _this.loading = false;
        }, function (error) {
            alert(error);
            _this.loading = false;
        });
    };
    PosComponent.prototype.isLastItemEmpty = function () {
        var prod = this.itemList[this.itemList.length - 1];
        if (prod.itemName === '' || prod.itemName === null || prod.itemName === undefined) {
            return true;
        }
        return false;
    };
    PosComponent.prototype.calculateTotal = function (item) {
        item.total = item.mrp * item.quantity;
        return item.total;
    };
    PosComponent.ctorParameters = function () { return [
        { type: ng_thermal_print__WEBPACK_IMPORTED_MODULE_4__["PrintService"] },
        { type: _shared_product_product_service__WEBPACK_IMPORTED_MODULE_5__["ProductService"] }
    ]; };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('keydown', ['$event']),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
    ], PosComponent.prototype, "onKeyDown", null);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(ngx_barcode_scanner__WEBPACK_IMPORTED_MODULE_2__["BarecodeScannerLivestreamComponent"]),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", ngx_barcode_scanner__WEBPACK_IMPORTED_MODULE_2__["BarecodeScannerLivestreamComponent"])
    ], PosComponent.prototype, "barecodeScanner", void 0);
    PosComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./pos.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/pos/pos.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./pos.component.scss */ "./src/app/views/pos/pos.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [ng_thermal_print__WEBPACK_IMPORTED_MODULE_4__["PrintService"], _shared_product_product_service__WEBPACK_IMPORTED_MODULE_5__["ProductService"]])
    ], PosComponent);
    return PosComponent;
}());



/***/ }),

/***/ "./src/app/views/pos/pos.module.ts":
/*!*****************************************!*\
  !*** ./src/app/views/pos/pos.module.ts ***!
  \*****************************************/
/*! exports provided: PosModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosModule", function() { return PosModule; });
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
/* harmony import */ var _pos_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./pos.component */ "./src/app/views/pos/pos.component.ts");
/* harmony import */ var _pos_routing_module__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./pos-routing.module */ "./src/app/views/pos/pos-routing.module.ts");
/* harmony import */ var ng_thermal_print__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ng-thermal-print */ "./node_modules/ng-thermal-print/fesm2015/ng-thermal-print.js");
/* harmony import */ var ngx_barcode_scanner__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ngx-barcode-scanner */ "./node_modules/ngx-barcode-scanner/fesm2015/ngx-barcode-scanner.js");








// Material modules







































var PosModule = /** @class */ (function () {
    function PosModule() {
    }
    PosModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _pos_component__WEBPACK_IMPORTED_MODULE_43__["PosComponent"]
            ],
            imports: [
                _pos_routing_module__WEBPACK_IMPORTED_MODULE_44__["PosRoutingModule"],
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
                ng_thermal_print__WEBPACK_IMPORTED_MODULE_45__["ThermalPrintModule"],
                ngx_barcode_scanner__WEBPACK_IMPORTED_MODULE_46__["BarecodeScannerLivestreamModule"]
            ]
        })
    ], PosModule);
    return PosModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-pos-pos-module.js.map