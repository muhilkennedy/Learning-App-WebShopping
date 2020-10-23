(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/shared/product/product.service.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/product/product.service.ts ***!
  \***************************************************/
/*! exports provided: ProductService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductService", function() { return ProductService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");




var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
        this.getCategoriesEndpoint = "/category/getCategories";
        this.createCategoryEndpoint = "/category/secure/admin/createCategory";
        this.deleteCategoryEndpoint = "/category/secure/admin/deleteCategory";
        this.editCategoryNameEndpoint = "/category/secure/admin/editCategoryName";
        this.getProductsEndpoint = "/product/getProducts";
        this.getProductCountEndpoint = "/product/getProductCount";
        this.getCategoriesTypeAheadEndPoint = "/category/getCategoriesForTypeahead";
        this.updateOrCreateProductEndpoint = "/product/secure/admin/createOrUpdateProduct";
        this.getProductByCodeEndpoint = "/product/secure/admin/getProductByCode";
    }
    ProductService.prototype.getCategories = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getCategoriesEndpoint);
    };
    ProductService.prototype.getCategoriesForTypeahead = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getCategoriesTypeAheadEndPoint);
    };
    ProductService.prototype.createCategory = function (catName, parentId) {
        var body = {
            categoryName: catName,
            parentCategoryId: parentId
        };
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.createCategoryEndpoint, body, httpOptions);
    };
    ProductService.prototype.deleteCategory = function (catId) {
        var httpOptions = {
            params: { ids: catId }
        };
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.deleteCategoryEndpoint, httpOptions);
    };
    ProductService.prototype.editCategoryName = function (catId, name) {
        var httpOptions = {
            categoryId: catId,
            categoryName: name
        };
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.editCategoryNameEndpoint, httpOptions);
    };
    ProductService.prototype.getProducts = function (pIds, cIds, offset, limit, sortField, sortType, loadInactive) {
        //Set Headers
        var requestHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json')
            .append('Offset', offset)
            .append('Limit', limit);
        var httpOptions = {
            headers: requestHeaders,
            params: {
                pIds: pIds,
                cIds: cIds,
                sortField: sortField,
                sortType: sortType,
                includeInactive: loadInactive
            }
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getProductsEndpoint, httpOptions);
    };
    ProductService.prototype.getproductCount = function (cIds) {
        var requestHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
        var httpOptions = {
            headers: requestHeaders,
            params: {
                cIds: cIds
            }
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getProductCountEndpoint, httpOptions);
    };
    ProductService.prototype.createOrUpdateProduct = function (file, catId, productId, productName, productBrand, cost, offer, description, active, pcode, unitsInStock) {
        var uploadData = new FormData();
        if (file === undefined) {
            file = null;
        }
        uploadData.append('productImage', file);
        uploadData.append('categoryId', catId);
        uploadData.append('productId', productId);
        uploadData.append('productName', productName);
        uploadData.append('productBrand', productBrand);
        uploadData.append('cost', cost);
        uploadData.append('offer', offer);
        uploadData.append('description', description);
        uploadData.append('active', active);
        uploadData.append('code', pcode);
        uploadData.append('units', unitsInStock);
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.updateOrCreateProductEndpoint, uploadData);
    };
    ProductService.prototype.getPoductByCode = function (code) {
        var requestHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
        var httpOptions = {
            headers: requestHeaders,
            params: {
                pCode: code
            }
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendBaseUrl + this.getProductByCodeEndpoint, httpOptions);
    };
    ProductService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    ProductService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ProductService);
    return ProductService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map