(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-product-product-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/category/category.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/category/category.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg\">\r\n      <div class=\"card\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-list-ul\"></i>Manage Category\r\n          <div class=\"float-right\">\r\n            <button mat-button class=\"btn btn-ghost-danger\" style=\"border: 1px solid;\" (click)=\"deleteCategory()\">\r\n              <i class=\"fa fa-remove\"></i> Delete Selected\r\n            </button>\r\n          </div>\r\n          <br/>\r\n          <i class=\"fa fa-warning float-left warningmsg\"> Products under deleted category will be deactivated post mid night</i>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\r\n            <!-- in case of leaf nodes with no children -->\r\n            <mat-tree-node *matTreeNodeDef=\"let node\" matTreeNodeToggle matTreeNodePadding>\r\n              <button mat-icon-button disabled></button>\r\n              <mat-checkbox color=\"warn\" class=\"checklist-leaf-node\" matTooltip=\"{{node.catId}}\" matTooltipPosition=\"right\"\r\n                            [checked]=\"checklistSelection.isSelected(node)\"\r\n                            (change)=\"LeafItemSelectionToggle(node)\">{{node.catName}}\r\n                          </mat-checkbox>\r\n              <button mat-icon-button class=\"addButton\" (click)=\"addNewItem(node)\"><mat-icon class=\"icon-paddding\">add</mat-icon></button>\r\n            </mat-tree-node>\r\n            <!-- to save element to parent -->\r\n            <mat-tree-node *matTreeNodeDef=\"let node; when: hasNoContent\" matTreeNodePadding>\r\n              <button mat-icon-button disabled></button>\r\n              <mat-form-field>\r\n                <mat-label>New Category...</mat-label>\r\n                <input matInput #itemValue placeholder=\"Category Name\">\r\n              </mat-form-field>\r\n              <button mat-button (click)=\"saveNode(node, itemValue.value)\">Save</button>\r\n            </mat-tree-node>\r\n            <!-- in case of nodes with children act as parent -->\r\n            <mat-tree-node *matTreeNodeDef=\"let node; when: hasChild\" matTreeNodePadding>\r\n              <button class=\"dropButton\" matTreeNodeToggle\r\n                      [attr.aria-label]=\"'toggle ' + node.filename\">\r\n                <mat-icon class=\"mat-icon-rtl-mirror icon-paddding\" [style.visibility]=\"showExpand(node)\">\r\n                  {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}\r\n                </mat-icon>\r\n              </button>\r\n              <mat-checkbox color=\"warn\" [checked]=\"descendantsAllSelected(node)\" matTooltip=\"{{node.catId}}\" matTooltipPosition=\"right\"\r\n                            [indeterminate]=\"descendantsPartiallySelected(node)\"\r\n                            (change)=\"ItemSelectionToggle(node)\">{{node.catName}}</mat-checkbox>\r\n              <button mat-icon-button class=\"addButton\" (click)=\"addNewItem(node)\"><mat-icon class=\"icon-paddding\">add</mat-icon></button>\r\n            </mat-tree-node>\r\n          </mat-tree>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-plus-square-o\"></i>Add New Category\r\n          <div class=\"float-right\">\r\n            <button mat-button class=\"btn btn-ghost-success\" style=\"border: 1px solid;\" (click)=\"createCategory()\">\r\n              <i class=\"fa fa-plus-square-o\"></i> Create Category\r\n            </button>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <mat-form-field appearance=\"fill\" class=\"matitem\" style=\"width: 100%;\">\r\n            <mat-label>Category Name</mat-label>\r\n            <input matInput placeholder=\"Category Name\" [(ngModel)]=\"catName\" required>\r\n          </mat-form-field>\r\n          <mat-form-field appearance=\"fill\" class=\"matitem\" style=\"width: 100%;\">\r\n            <mat-label>Parent Category ID</mat-label>\r\n            <input matInput type=\"number\" placeholder=\"ParentId / Empty if Base Category\" [(ngModel)]=\"parentId\" >\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-plus-square-o\"></i>Edit Existing Category\r\n          <div class=\"float-right\">\r\n            <button mat-button class=\"btn btn-ghost-primary\" style=\"border: 1px solid;\" (click)=\"editCategory()\">\r\n              <i class=\"fa fa-edit\"></i> Confirm Edit\r\n            </button>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <mat-form-field appearance=\"fill\" class=\"matitem\" style=\"width: 100%;\">\r\n            <mat-label>Category ID</mat-label>\r\n            <input matInput type=\"number\" placeholder=\"Category ID\" [(ngModel)]=\"editCatId\" required>\r\n          </mat-form-field>\r\n          <mat-form-field appearance=\"fill\" class=\"matitem\" style=\"width: 100%;\">\r\n            <mat-label>Edited Category Name</mat-label>\r\n            <input matInput placeholder=\"Category Name\" [(ngModel)]=\"editCatName\" required>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/manage-products/manage-product/manage-product.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/manage-products/manage-product/manage-product.component.html ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"animated fadeIn\">\r\n  <alert class=\"p-4 text-center\"></alert>\r\n  <div class=\"row\">\r\n    <div class=\"col-lg\">\r\n      <div class=\"card\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-list-ul\"></i>Add Product\r\n          <div class=\"float-right\">\r\n            <button mat-button class=\"btn btn-ghost-primary\" style=\"border: 1px solid;\" (click)=\"createProduct()\">\r\n              <i class=\"fa fa-product-hunt\"></i> Create Product\r\n            </button>\r\n          </div>\r\n          <br/>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-responsive-sm\">\r\n            <tr>\r\n              <td>\r\n                <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                  <!-- <mat-label>Category ID</mat-label>\r\n                  <input matInput placeholder=\"Category of the Product\" [(ngModel)]=\"categoryId\" required> -->\r\n                  <mat-label>Category ID</mat-label>\r\n                  <input type=\"text\"\r\n                             placeholder=\"Search Based Category Name\"\r\n                             matInput\r\n                             [formControl]=\"myControl\"\r\n                             [matAutocomplete]=\"auto\"\r\n                             [ngModel]=\"searchCategory\" required>\r\n                      <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" >\r\n                        <mat-option (onSelectionChange)=\"setCategory(option)\" *ngFor=\"let option of filteredOptions | async\" [value]=\"option.firstName+' '+option.lastName\">\r\n                          {{option.categoryName}} - {{option.categoryId}}\r\n                        </mat-option>\r\n                  </mat-autocomplete>\r\n                </mat-form-field>\r\n              </td>\r\n              <td>\r\n                <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                  <mat-label>Product Name</mat-label>\r\n                  <input matInput placeholder=\"Product Name\" [(ngModel)]=\"pName\" required>\r\n                </mat-form-field>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                  <mat-label>Product Brand</mat-label>\r\n                  <input matInput type=\"text\" class=\"example-right-align\" [(ngModel)]=\"brand\" required>\r\n                </mat-form-field>\r\n              </td>\r\n              <td>\r\n                <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                  <mat-label>Product Cost</mat-label>\r\n                  <input matInput type=\"number\" class=\"example-right-align\" [(ngModel)]=\"cost\" required>\r\n                  <mat-hint>Product MRP</mat-hint>\r\n                </mat-form-field>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                  <mat-label>Product Offer</mat-label>\r\n                  <input matInput type=\"number\" class=\"example-right-align\" [(ngModel)]=\"offer\" required>\r\n                  <mat-hint>Offer applicable to this particular product</mat-hint>\r\n                </mat-form-field>\r\n              </td>\r\n              <td>\r\n                <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                  <mat-label>Product CODE</mat-label>\r\n                  <input matInput placeholder=\"Product BAR/QR CODE\" [(ngModel)]=\"pCode\" required>\r\n                </mat-form-field>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                  <mat-label>Units In Stock</mat-label>\r\n                  <input matInput type=\"number\" class=\"example-right-align\" [(ngModel)]=\"unitsInStock\" required>\r\n                  <mat-hint>Current Product Quantity In Stock</mat-hint>\r\n                </mat-form-field>\r\n              </td>\r\n              <td>\r\n                <mat-form-field appearance=\"outline\" class=\"matitem\">\r\n                  <mat-label>Product Description</mat-label>\r\n                  <textarea rows=\"3\" matInput type=\"text\" class=\"example-right-align\" [(ngModel)]=\"pDescription\" required></textarea>\r\n                </mat-form-field>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <button mat-button [disabled]=\"true\" style=\"text-align: inherit;\">\r\n                  <i class=\"fa fa-product-hunt\"></i>\r\n                  <span class=\"icon-text\"> Activate product</span><br/>\r\n                </button>\r\n                <mat-slide-toggle\r\n                  color=\"accent\"\r\n                  [checked]=\"productActive\"\r\n                  (change)=\"toggleProductActive()\">\r\n                </mat-slide-toggle>\r\n              </td>\r\n              <td>\r\n                <img [src]='checkImage(productPic)' class=\"avatar profileImg\" alt=\"avatar\">\r\n                <br/>\r\n                <mat-hint>(Multiple Images can be uploaded as a ZIP file)</mat-hint>\r\n                <br/>\r\n                <input type=\"file\" (change)=\"handleFileUpdate($event.target.files)\">\r\n              </td>\r\n            </tr>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/product-list/product-list.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/product-list/product-list.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg\">\r\n      <div class=\"card\">\r\n        <ngx-loading [show]=\"filterloading\"></ngx-loading>\r\n        <!-- <div class=\"card-header\">\r\n          <i class=\"fa fa-filter\"></i>Filters\r\n        </div> -->\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-responsive-sm filterbar\">\r\n            <tr>\r\n              <td>\r\n                <form [formGroup]=\"myForm\" *ngIf=\"!searchByProduts\">\r\n                  <ng-multiselect-dropdown\r\n                      name=\"category\"\r\n                      [placeholder]=\"'Select Category'\"\r\n                      [data]=\"categories\"\r\n                      formControlName=\"category\"\r\n                      [disabled]=\"disabled\"\r\n                      [settings]=\"dropdownSettings\"\r\n                      (onSelect)=\"onItemSelect($event)\"\r\n                      (onDeSelect)=\"onDeSelect($event)\"\r\n                      (onSelectAll)=\"onSelectAll($event)\"\r\n                      (onDeSelectAll)=\"onDeSelectAll($event)\">\r\n                  </ng-multiselect-dropdown>\r\n                </form>\r\n                <mat-checkbox [(ngModel)]=\"loadActiveItemsOnly\" (change)=\"loadActiveItems()\">\r\n                  Active Products only\r\n                </mat-checkbox>\r\n                <i class=\"fa fa-exchange\" (click)=\"searchByProduts = !searchByProduts\" style=\"cursor: pointer;\"></i>\r\n              </td>\r\n              <td>\r\n                <div class=\"btn-group\" dropdown style=\"width: 100%;\">\r\n                  <button dropdownToggle type=\"button\" class=\"btn btn-ghost-primary dropdown-toggle\">\r\n                    Sort by <span class=\"caret\"></span>\r\n                  </button>\r\n                  <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\r\n                    <li role=\"menuitem\"><a class=\"dropdown-item sortOption\" (click)=\"sortBy('cost', 'asc')\">MRP : Low to High</a></li>\r\n                    <li role=\"menuitem\"><a class=\"dropdown-item sortOption\" (click)=\"sortBy('cost', 'desc')\">MRP : High to Low</a></li>\r\n                    <li role=\"menuitem\"><a class=\"dropdown-item sortOption\" (click)=\"sortBy('offer', 'asc')\">Offer : Low to High</a></li>\r\n                    <li role=\"menuitem\"><a class=\"dropdown-item sortOption\" (click)=\"sortBy('offer', 'desc')\">Offer : High to Low</a></li>\r\n                    <li role=\"menuitem\"><a class=\"dropdown-item sortOption\" (click)=\"sortBy('lastmodified', 'desc')\">Last modified Date (desc)</a></li>\r\n                    <li role=\"menuitem\"><a class=\"dropdown-item sortOption\" (click)=\"clearSort()\">Clear Sort</a></li>\r\n                    <!-- <li class=\"divider dropdown-divider\"></li> -->\r\n                  </ul>\r\n                </div>\r\n              </td>\r\n              <td>\r\n                <mat-paginator style=\"margin-block-start: -0.5rem; margin-left: -13rem !important;\" [length]=\"totalRecords\"\r\n                [pageSize]=\"pageSize\"\r\n                [pageSizeOptions]=\"pageSizeOptions\"\r\n                (page)=\"action($event)\">\r\n                </mat-paginator>\r\n              </td>\r\n            </tr>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <!-- collapse content -->\r\n    <!-- <p>\r\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"isCollapsed = !isCollapsed\">\r\n        Button with data-target\r\n      </button>\r\n    </p>\r\n    <div [collapse]=\"isCollapsed\">\r\n      <div class=\"card card-body\">\r\n\r\n      </div>\r\n    </div> -->\r\n\r\n\r\n  </div>\r\n<div class=\"row\">\r\n  <div class=\"col-md-3 col-sm-4\" *ngFor=\"let prod of products\">\r\n    <div class=\"card\">\r\n      <ngx-loading [show]=\"loading\"></ngx-loading>\r\n       <!-- <carousel [interval]=\"false\">\r\n        <slide *ngFor=\"let slide of homeImages\">\r\n          <label>Media-ID -> {{slide.mediaId}}</label>\r\n          <img src={{slide.image}} alt=\"slides\" style=\"display: block; width: 100%;\">\r\n          <div class=\"carousel-caption d-none d-md-block\" style=\"color: black;\">\r\n            <h3>{{slide.title}}</h3>\r\n            <p>{{slide.description}}</p>\r\n          </div>\r\n        </slide>\r\n      </carousel> -->\r\n      <div class=\"card-body text-center\">\r\n        <div class=\"text-muted small text-uppercase font-weight-bold\">MRP - {{prod.cost}}<small> ₹ </small> | Discount - {{prod.offer}}%</div>\r\n        <div class=\"h2 py-3\">{{prod.productName}} - {{prod.productCode}}</div>\r\n        <div class=\"chart-wrapper mx-auto\">\r\n          <p>{{prod.brandName}}</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/shared/collapse/collapse.directive.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/collapse/collapse.directive.ts ***!
  \*******************************************************/
/*! exports provided: CollapseDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollapseDirective", function() { return CollapseDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");



var CollapseDirective = /** @class */ (function () {
    function CollapseDirective(_el, _renderer, _builder) {
        this._el = _el;
        this._renderer = _renderer;
        this._builder = _builder;
        /** This event fires as soon as content collapses */
        this.collapsed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** This event fires as soon as content becomes visible */
        this.expanded = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        // shown
        this._collapse = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
        this.isViewChecked = false;
    }
    Object.defineProperty(CollapseDirective.prototype, "collapse", {
        get: function () {
            return this._collapse;
        },
        /** A flag indicating visibility of content (shown or hidden) */
        set: function (value) {
            this._collapse = value;
            if (this._collapse) {
                this.hide();
            }
            else {
                this.show();
            }
        },
        enumerable: true,
        configurable: true
    });
    CollapseDirective.prototype.ngAfterViewChecked = function () {
        this.isViewChecked = true;
    };
    CollapseDirective.prototype.ngAfterViewInit = function () {
    };
    /** allows to manually toggle content visibility */
    CollapseDirective.prototype.toggle = function () {
        if (this._collapse) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    /** allows to manually hide content */
    CollapseDirective.prototype.hide = function () {
        var _this = this;
        if (!this.isViewChecked) {
            this._renderer.setStyle(this._el.nativeElement, 'display', 'none');
            this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
            this._renderer.setStyle(this._el.nativeElement, 'position', 'relative');
            this._renderer.setStyle(this._el.nativeElement, 'height', '0');
            return;
        }
        else {
            this._renderer.removeStyle(this._el.nativeElement, 'overflow');
            this._renderer.removeStyle(this._el.nativeElement, 'position');
            this._renderer.removeStyle(this._el.nativeElement, 'height');
            this._renderer.removeStyle(this._el.nativeElement, 'display');
        }
        if (this._animationPlayer) {
            this._animationPlayer.finish();
            this._animationPlayer.destroy();
        }
        this._animation = this._builder.build([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ overflow: 'hidden', position: 'relative' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('0.35s ease', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ height: '0' }))
        ]);
        this._animationPlayer = this._animation.create(this._el.nativeElement);
        this._animationPlayer.onStart = function () {
            _this.isCollapse = false;
            _this.isCollapsing = true;
        };
        this._animationPlayer.onDone = function () {
            _this._collapse = true;
            _this.isCollapsed = true;
            _this.isCollapse = true;
            _this.isCollapsing = false;
            _this.display = 'none';
            _this.collapsed.emit(_this);
        };
        this._animationPlayer.play();
    };
    /** allows to manually show collapsed content */
    CollapseDirective.prototype.show = function () {
        var _this = this;
        if (!this.isViewChecked) {
            this._renderer.setStyle(this._el.nativeElement, 'display', 'block');
            this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
            this._renderer.setStyle(this._el.nativeElement, 'position', 'relative');
            this._renderer.removeStyle(this._el.nativeElement, 'height');
            return;
        }
        else {
            this._renderer.removeStyle(this._el.nativeElement, 'overflow');
            this._renderer.removeStyle(this._el.nativeElement, 'position');
            this._renderer.removeStyle(this._el.nativeElement, 'height');
            this._renderer.removeStyle(this._el.nativeElement, 'display');
        }
        if (this._animationPlayer) {
            this._animationPlayer.finish();
            this._animationPlayer.destroy();
        }
        this._animation = this._builder.build([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ overflow: 'hidden', display: 'block', position: 'relative', height: 0 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('0.35s ease', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ height: '*' }))
        ]);
        this._animationPlayer = this._animation.create(this._el.nativeElement);
        this._animationPlayer.onStart = function () {
            _this.isCollapse = false;
            _this.isCollapsing = true;
        };
        this._animationPlayer.onDone = function () {
            _this._collapse = false;
            _this.isCollapsed = false;
            _this.isCollapse = true;
            _this.isCollapsing = false;
            _this.display = 'block';
            _this.expanded.emit(_this);
        };
        this._animationPlayer.play();
    };
    CollapseDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] },
        { type: _angular_animations__WEBPACK_IMPORTED_MODULE_2__["AnimationBuilder"] }
    ]; };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], CollapseDirective.prototype, "collapsed", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], CollapseDirective.prototype, "expanded", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('style.display'),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], CollapseDirective.prototype, "display", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.in'),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.ngx-show'),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('attr.aria-expanded'),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CollapseDirective.prototype, "_collapse", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('attr.aria-hidden'),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CollapseDirective.prototype, "isCollapsed", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.ngx-collapse'),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CollapseDirective.prototype, "isCollapse", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.ngx-collapsing'),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CollapseDirective.prototype, "isCollapsing", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Boolean])
    ], CollapseDirective.prototype, "collapse", null);
    CollapseDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[collapse]',
            exportAs: 'bs-collapse',
            host: {
                '[class.ngx-collapse]': 'true'
            }
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_animations__WEBPACK_IMPORTED_MODULE_2__["AnimationBuilder"]])
    ], CollapseDirective);
    return CollapseDirective;
}());



/***/ }),

/***/ "./src/app/shared/collapse/collapse.module.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/collapse/collapse.module.ts ***!
  \****************************************************/
/*! exports provided: CollapseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollapseModule", function() { return CollapseModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _collapse_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collapse.directive */ "./src/app/shared/collapse/collapse.directive.ts");



var CollapseModule = /** @class */ (function () {
    function CollapseModule() {
    }
    CollapseModule_1 = CollapseModule;
    CollapseModule.forRoot = function () {
        return { ngModule: CollapseModule_1, providers: [] };
    };
    var CollapseModule_1;
    CollapseModule = CollapseModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_collapse_directive__WEBPACK_IMPORTED_MODULE_2__["CollapseDirective"]],
            exports: [_collapse_directive__WEBPACK_IMPORTED_MODULE_2__["CollapseDirective"]]
        })
    ], CollapseModule);
    return CollapseModule;
}());



/***/ }),

/***/ "./src/app/shared/collapse/index.ts":
/*!******************************************!*\
  !*** ./src/app/shared/collapse/index.ts ***!
  \******************************************/
/*! exports provided: CollapseDirective, CollapseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _collapse_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collapse.directive */ "./src/app/shared/collapse/collapse.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapseDirective", function() { return _collapse_directive__WEBPACK_IMPORTED_MODULE_0__["CollapseDirective"]; });

/* harmony import */ var _collapse_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapse.module */ "./src/app/shared/collapse/collapse.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapseModule", function() { return _collapse_module__WEBPACK_IMPORTED_MODULE_1__["CollapseModule"]; });





/***/ }),

/***/ "./src/app/views/product/category/category.component.css":
/*!***************************************************************!*\
  !*** ./src/app/views/product/category/category.component.css ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mat-form-field {\r\n  margin-right: 4px;\r\n}\r\n\r\n.icon-paddding {\r\n  padding-bottom: 35px;\r\n  cursor: pointer;\r\n}\r\n\r\n.icon-paddding:hover{\r\n  color: cornflowerblue;\r\n}\r\n\r\n.dropButton {\r\n  background: transparent;\r\n  border-color: transparent;\r\n}\r\n\r\n.dropButton:focus {\r\n  outline: 0px dotted;\r\n  border-color: transparent;\r\n}\r\n\r\n.addButton {\r\n  background: transparent;\r\n  border-color: transparent;\r\n}\r\n\r\n.addButton:focus {\r\n  outline: 0px dotted;\r\n  border-color: transparent;\r\n}\r\n\r\n.warningmsg{\r\n  font-size: xx-small;\r\n  color: orange;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvcHJvZHVjdC9jYXRlZ29yeS9jYXRlZ29yeS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2Qix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGFBQWE7QUFDZiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb2R1Y3QvY2F0ZWdvcnkvY2F0ZWdvcnkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtZm9ybS1maWVsZCB7XHJcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbn1cclxuXHJcbi5pY29uLXBhZGRkaW5nIHtcclxuICBwYWRkaW5nLWJvdHRvbTogMzVweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5pY29uLXBhZGRkaW5nOmhvdmVye1xyXG4gIGNvbG9yOiBjb3JuZmxvd2VyYmx1ZTtcclxufVxyXG5cclxuLmRyb3BCdXR0b24ge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi5kcm9wQnV0dG9uOmZvY3VzIHtcclxuICBvdXRsaW5lOiAwcHggZG90dGVkO1xyXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi5hZGRCdXR0b24ge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi5hZGRCdXR0b246Zm9jdXMge1xyXG4gIG91dGxpbmU6IDBweCBkb3R0ZWQ7XHJcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuLndhcm5pbmdtc2d7XHJcbiAgZm9udC1zaXplOiB4eC1zbWFsbDtcclxuICBjb2xvcjogb3JhbmdlO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/views/product/category/category.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/product/category/category.component.ts ***!
  \**************************************************************/
/*! exports provided: ItemNode, ItemFlatNode, nodeService, CategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemNode", function() { return ItemNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemFlatNode", function() { return ItemFlatNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeService", function() { return nodeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryComponent", function() { return CategoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/fesm5/collections.js");
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/fesm5/tree.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/fesm5/tree.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _shared_product_product_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/product/product.service */ "./src/app/shared/product/product.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/fesm5/snack-bar.js");








/**
 * Node for category
 */
var ItemNode = /** @class */ (function () {
    function ItemNode() {
    }
    return ItemNode;
}());

/** Flat category item node with expandable and level information */
var ItemFlatNode = /** @class */ (function () {
    function ItemFlatNode() {
    }
    return ItemFlatNode;
}());

/**
 * The Json object for to-do list data.
 */
var TREE_DATA = {};
/**
 * build a tree structured Json object.
 * Each node in Json object represents a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
var nodeService = /** @class */ (function () {
    function nodeService(productService, _snackBar) {
        var _this = this;
        this.productService = productService;
        this._snackBar = _snackBar;
        this.dataChange = new rxjs__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"]([]);
        this.productService.getCategories()
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                TREE_DATA = resp.data;
                _this.initialize();
            }
            else {
                _this._snackBar.open('Error : ' + resp.errorMessages, '', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
        }, function (error) {
            _this._snackBar.open('Something went wrong!', '', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
        });
    }
    Object.defineProperty(nodeService.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    nodeService.prototype.initialize = function () {
        // Build the tree nodes from Json object. The result is a list of `ItemNode` with nested
        //     file node as children.
        var data = this.buildFileTree(TREE_DATA, 0);
        // Notify the change.
        this.dataChange.next(data);
    };
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `ItemNode`.
     */
    nodeService.prototype.buildFileTree = function (obj, level) {
        var _this = this;
        return Object.keys(obj).reduce(function (accumulator, key) {
            var value = obj[key];
            var node = new ItemNode();
            node.item = key;
            node.catId = parseInt(key.split(",")[0]);
            node.catName = key.split(",")[1];
            if (value != null) {
                if (typeof value === 'object') {
                    node.children = _this.buildFileTree(value, level + 1);
                }
                else {
                    node.item = value;
                    node.catId = parseInt(key.split(",")[0]);
                    node.catName = key.split(",")[1];
                }
            }
            return accumulator.concat(node);
        }, []);
    };
    /** Add an item to list */
    nodeService.prototype.insertItem = function (parent, name) {
        if (parent.children) {
            parent.children.push({ item: name });
            this.dataChange.next(this.data);
        }
    };
    nodeService.prototype.updateItem = function (node, name) {
        node.item = name;
        this.dataChange.next(this.data);
    };
    nodeService.ctorParameters = function () { return [
        { type: _shared_product_product_service__WEBPACK_IMPORTED_MODULE_6__["ProductService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBar"] }
    ]; };
    nodeService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_shared_product_product_service__WEBPACK_IMPORTED_MODULE_6__["ProductService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBar"]])
    ], nodeService);
    return nodeService;
}());

var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(nodeService, productService, _snackBar) {
        var _this = this;
        this.nodeService = nodeService;
        this.productService = productService;
        this._snackBar = _snackBar;
        this.loading = false;
        /** Map from flat node to nested node. This helps us finding the nested node to be modified */
        this.flatNodeMap = new Map();
        /** Map from nested node to flattened node. This helps us to keep the same object for selection */
        this.nestedNodeMap = new Map();
        /** A selected parent node to be inserted */
        this.selectedParent = null;
        /** The new item's name */
        this.newItemName = '';
        /** The selection for checklist */
        this.checklistSelection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__["SelectionModel"](true /* multiple */);
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.expandable; };
        this.getChildren = function (node) { return node.children; };
        this.hasChild = function (_, _nodeData) { return _nodeData.expandable; };
        this.hasNoContent = function (_, _nodeData) { return _nodeData.item === ''; };
        /**
         * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
         */
        this.transformer = function (node, level) {
            var existingNode = _this.nestedNodeMap.get(node);
            var flatNode = existingNode && existingNode.item === node.item
                ? existingNode
                : new ItemFlatNode();
            flatNode.item = node.item;
            flatNode.catId = node.catId;
            flatNode.catName = node.catName;
            flatNode.level = level;
            flatNode.expandable = true; //(node.children != undefined && node.children.length) > 0 ? true : false;
            _this.flatNodeMap.set(flatNode, node);
            _this.nestedNodeMap.set(node, flatNode);
            return flatNode;
        };
        this.treeFlattener = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__["MatTreeFlattener"](this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["FlatTreeControl"](this.getLevel, this.isExpandable);
        this.dataSource = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__["MatTreeFlatDataSource"](this.treeControl, this.treeFlattener);
        nodeService.dataChange.subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    CategoryComponent.prototype.ngOnInit = function () {
    };
    /** Whether all the descendants of the node are selected. */
    CategoryComponent.prototype.descendantsAllSelected = function (node) {
        var _this = this;
        var descendants = this.treeControl.getDescendants(node);
        var descAllSelected = descendants.length > 0 && descendants.every(function (child) {
            return _this.checklistSelection.isSelected(child);
        });
        return descAllSelected;
    };
    /** Whether part of the descendants are selected */
    CategoryComponent.prototype.descendantsPartiallySelected = function (node) {
        var _this = this;
        var descendants = this.treeControl.getDescendants(node);
        var result = descendants.some(function (child) { return _this.checklistSelection.isSelected(child); });
        return result && !this.descendantsAllSelected(node);
    };
    /** Toggle the item selection. Select/deselect all the descendants node */
    CategoryComponent.prototype.ItemSelectionToggle = function (node) {
        var _a, _b;
        var _this = this;
        this.checklistSelection.toggle(node);
        var descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? (_a = this.checklistSelection).select.apply(_a, descendants) : (_b = this.checklistSelection).deselect.apply(_b, descendants);
        // Force update for the parent
        descendants.forEach(function (child) { return _this.checklistSelection.isSelected(child); });
        this.checkAllParentsSelection(node);
    };
    /** Toggle a leaf item selection. Check all the parents to see if they changed */
    CategoryComponent.prototype.LeafItemSelectionToggle = function (node) {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    };
    /* Checks all the parents when a leaf node is selected/unselected */
    CategoryComponent.prototype.checkAllParentsSelection = function (node) {
        var parent = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    };
    /** Check root node checked state and change it accordingly */
    CategoryComponent.prototype.checkRootNodeSelection = function (node) {
        var _this = this;
        var nodeSelected = this.checklistSelection.isSelected(node);
        var descendants = this.treeControl.getDescendants(node);
        var descAllSelected = descendants.length > 0 && descendants.every(function (child) {
            return _this.checklistSelection.isSelected(child);
        });
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        }
        else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    };
    /* Get the parent node of a node */
    CategoryComponent.prototype.getParentNode = function (node) {
        var currentLevel = this.getLevel(node);
        if (currentLevel < 1) {
            return null;
        }
        var startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
        for (var i = startIndex; i >= 0; i--) {
            var currentNode = this.treeControl.dataNodes[i];
            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    };
    /** Select the category so we can insert the new item. */
    CategoryComponent.prototype.addNewItem = function (node) {
        // node.expandable = true;
        var parentNode = this.flatNodeMap.get(node);
        if (parentNode.children === undefined || parentNode.children === null || parentNode.children.length <= 0) {
            parentNode.children = new Array();
        }
        this.addNewItemParent = parentNode;
        this.nodeService.insertItem(parentNode, '');
        this.treeControl.expand(node);
    };
    /** Save the node to database */
    CategoryComponent.prototype.saveNode = function (node, itemValue) {
        var nestedNode = this.flatNodeMap.get(node);
        this.nodeService.updateItem(nestedNode, itemValue);
        this.catName = itemValue;
        this.parentId = this.addNewItemParent.catId;
        this.createCategory();
    };
    CategoryComponent.prototype.showExpand = function (node) {
        var flatNode = this.flatNodeMap.get(node);
        if (flatNode === undefined || flatNode.children === undefined || flatNode.children === null) {
            return 'hidden';
        }
        else if (flatNode.children.length > 0) {
            return 'visible';
        }
        else {
            return 'hidden';
        }
    };
    CategoryComponent.prototype.deleteCategory = function () {
        var _this = this;
        this.loading = true;
        var deleteCategories = new Array();
        this.checklistSelection.selected.forEach(function (node) {
            deleteCategories.push(node.catId);
        });
        this.productService.deleteCategory(deleteCategories)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                TREE_DATA = resp.data != null ? resp.data : {};
                _this.nodeService.initialize();
                _this._snackBar.open('Category Deleted Successfully', '', {
                    duration: 3000,
                    panelClass: ['warn-snackbar']
                });
            }
            else {
                _this._snackBar.open('Error : ' + resp.errorMessages, '', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
            _this.loading = false;
        }, function (error) {
            _this._snackBar.open('Something went wrong !', '', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
        });
    };
    CategoryComponent.prototype.createCategory = function () {
        var _this = this;
        this.loading = true;
        this.productService.createCategory(this.catName, this.parentId)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                TREE_DATA = resp.data;
                _this.nodeService.initialize();
                _this._snackBar.open('Category Added Successfully', '', {
                    duration: 3000,
                    panelClass: ['success-snackbar']
                });
            }
            else {
                _this._snackBar.open('Error : ' + resp.errorMessages, '', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
            _this.loading = false;
        }, function (error) {
            _this._snackBar.open('Something went wrong !', '', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
        });
    };
    CategoryComponent.prototype.editCategory = function () {
        var _this = this;
        this.loading = true;
        this.productService.editCategoryName(this.editCatId, this.editCatName)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                TREE_DATA = resp.data;
                _this.nodeService.initialize();
                _this._snackBar.open('Category Modified Successfully', '', {
                    duration: 3000,
                    panelClass: ['success-snackbar']
                });
            }
            else {
                _this._snackBar.open('Error : ' + resp.errorMessages, '', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
            _this.loading = false;
        }, function (error) {
            _this._snackBar.open('Something went wrong !', '', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
        });
    };
    CategoryComponent.ctorParameters = function () { return [
        { type: nodeService },
        { type: _shared_product_product_service__WEBPACK_IMPORTED_MODULE_6__["ProductService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBar"] }
    ]; };
    CategoryComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-category',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./category.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/category/category.component.html")).default,
            providers: [nodeService],
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./category.component.css */ "./src/app/views/product/category/category.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [nodeService, _shared_product_product_service__WEBPACK_IMPORTED_MODULE_6__["ProductService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBar"]])
    ], CategoryComponent);
    return CategoryComponent;
}());



/***/ }),

/***/ "./src/app/views/product/manage-products/manage-product/manage-product.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/views/product/manage-products/manage-product/manage-product.component.css ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".matitem{\r\n  width: 100%;\r\n}\r\n\r\n.profileImg{\r\n  height: 100px;\r\n  width: inherit;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvcHJvZHVjdC9tYW5hZ2UtcHJvZHVjdHMvbWFuYWdlLXByb2R1Y3QvbWFuYWdlLXByb2R1Y3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvcHJvZHVjdC9tYW5hZ2UtcHJvZHVjdHMvbWFuYWdlLXByb2R1Y3QvbWFuYWdlLXByb2R1Y3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXRpdGVte1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ucHJvZmlsZUltZ3tcclxuICBoZWlnaHQ6IDEwMHB4O1xyXG4gIHdpZHRoOiBpbmhlcml0O1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/views/product/manage-products/manage-product/manage-product.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/views/product/manage-products/manage-product/manage-product.component.ts ***!
  \******************************************************************************************/
/*! exports provided: ManageProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageProductComponent", function() { return ManageProductComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _shared_product_product_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/product/product.service */ "./src/app/shared/product/product.service.ts");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/_alert */ "./src/app/shared/_alert/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");







var ManageProductComponent = /** @class */ (function () {
    function ManageProductComponent(sanitizer, productService, alertService) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.productService = productService;
        this.alertService = alertService;
        this.loading = false;
        this.productActive = true;
        this.defaultAvatar = "assets/img/avatars/Blank-Profile.png";
        //autoComplete
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.loading = true;
        this.productService.getCategoriesForTypeahead()
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.options = resp.dataList;
                _this.filteredOptions = _this.myControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (value) { return _this._filter(value); }));
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
    ManageProductComponent.prototype._filter = function (value) {
        if (value === "") {
            return;
        }
        var filterValue = value.toLowerCase();
        return this.options.filter(function (option) {
            return (option.categoryName.toLowerCase().indexOf(filterValue) === 0 || (option.categoryId + "").toLowerCase().indexOf(filterValue) === 0);
        });
    };
    ManageProductComponent.prototype.ngOnInit = function () {
    };
    ManageProductComponent.prototype.toggleProductActive = function () {
        this.productActive = !this.productActive;
    };
    ManageProductComponent.prototype.handleFileUpdate = function (files) {
        this.productPic = URL.createObjectURL(files.item(0));
        if (this.isValidFile(files.item(0).name)) {
            this.fileToUpdate = files.item(0);
        }
        else {
            alert('Format not supported! Please upload jpeg/jpg/png file');
        }
    };
    ManageProductComponent.prototype.isValidFile = function (name) {
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg') {
            return true;
        }
        else {
            return false;
        }
    };
    ManageProductComponent.prototype.checkImage = function (image) {
        if (image === undefined || image === null) {
            return this.defaultAvatar;
        }
        else {
            return this.sanitizer.bypassSecurityTrustUrl(image);
            ;
        }
    };
    ManageProductComponent.prototype.setCategory = function (cat) {
        this.searchCatId = cat.categoryId;
        this.searchCategory = "" + this.searchCatId;
    };
    ManageProductComponent.prototype.createProduct = function () {
        var _this = this;
        this.loading = true;
        this.productService.createOrUpdateProduct(this.fileToUpdate, this.searchCategory, null, this.pName, this.brand, this.cost, this.offer, this.pDescription, this.productActive, this.pCode, this.unitsInStock)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.alertService.success('Product created succesfully');
            }
            else {
                _this.alertService.error('Failed : ' + resp.errorMessages);
            }
            _this.loading = false;
        }, function (error) {
            _this.alertService.error("something went wrong!");
            _this.loading = false;
        });
    };
    ManageProductComponent.ctorParameters = function () { return [
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] },
        { type: _shared_product_product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"] },
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_5__["AlertService"] }
    ]; };
    ManageProductComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-manage-product',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./manage-product.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/manage-products/manage-product/manage-product.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./manage-product.component.css */ "./src/app/views/product/manage-products/manage-product/manage-product.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"], _shared_product_product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"],
            _shared_alert__WEBPACK_IMPORTED_MODULE_5__["AlertService"]])
    ], ManageProductComponent);
    return ManageProductComponent;
}());



/***/ }),

/***/ "./src/app/views/product/product-list/product-list.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/views/product/product-list/product-list.component.css ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".filterbar{\r\n  margin-bottom: -1.5rem;\r\n  margin-top: -1rem;\r\n}\r\n\r\n.table th, .table td {\r\n  border-top: 0px !important;\r\n}\r\n\r\n.mat-paginator-container{\r\n  justify-content: end;\r\n  margin-right: -12rem;\r\n}\r\n\r\n.mat-paginator-outer-container{\r\n  margin-left: -13rem !important;\r\n}\r\n\r\n.sortOption{\r\n  cursor: pointer;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvcHJvZHVjdC9wcm9kdWN0LWxpc3QvcHJvZHVjdC1saXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQkFBc0I7RUFDdEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG9CQUFvQjtBQUN0Qjs7QUFDQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGVBQWU7QUFDakIiLCJmaWxlIjoic3JjL2FwcC92aWV3cy9wcm9kdWN0L3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWxpc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5maWx0ZXJiYXJ7XHJcbiAgbWFyZ2luLWJvdHRvbTogLTEuNXJlbTtcclxuICBtYXJnaW4tdG9wOiAtMXJlbTtcclxufVxyXG5cclxuLnRhYmxlIHRoLCAudGFibGUgdGQge1xyXG4gIGJvcmRlci10b3A6IDBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ubWF0LXBhZ2luYXRvci1jb250YWluZXJ7XHJcbiAganVzdGlmeS1jb250ZW50OiBlbmQ7XHJcbiAgbWFyZ2luLXJpZ2h0OiAtMTJyZW07XHJcbn1cclxuLm1hdC1wYWdpbmF0b3Itb3V0ZXItY29udGFpbmVye1xyXG4gIG1hcmdpbi1sZWZ0OiAtMTNyZW0gIWltcG9ydGFudDtcclxufVxyXG5cclxuLnNvcnRPcHRpb257XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/views/product/product-list/product-list.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/views/product/product-list/product-list.component.ts ***!
  \**********************************************************************/
/*! exports provided: ProductListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListComponent", function() { return ProductListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_product_product_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/product/product.service */ "./src/app/shared/product/product.service.ts");




var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(productService, fb) {
        this.productService = productService;
        this.fb = fb;
        this.loading = false;
        this.filterloading = false;
        this.products = new Array();
        this.categories = new Array();
        this.pIds = new Array();
        this.cIds = new Array();
        this.isCollapsed = false;
        this.searchByProduts = false;
        this.loadActiveItemsOnly = true;
        // MatPaginator Inputs
        this.offset = 0;
        this.totalRecords = 100;
        this.pageSize = 25;
        this.pageSizeOptions = [25, 50, 75];
        this.disabled = false;
        this.ShowFilter = false;
        this.limitSelection = false;
        this.selectedItems = [];
        this.dropdownSettings = {};
    }
    ProductListComponent.prototype.toggleFilterCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterloading = true;
        this.productService.getCategoriesForTypeahead()
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.categories = resp.dataList;
            }
            else {
                alert("failed");
            }
            _this.filterloading = false;
        }, function (error) {
            alert("error");
        });
        this.setProducts();
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'categoryId',
            textField: 'categoryName',
            selectAllText: 'Select All Category',
            unSelectAllText: 'UnSelect All Category',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        this.myForm = this.fb.group({
            category: [this.selectedItems]
        });
    };
    ProductListComponent.prototype.setProducts = function () {
        var _this = this;
        this.loading = true;
        this.setProductCount();
        this.productService.getProducts(this.pIds, this.cIds, this.offset, this.pageSize, this.sortField, this.sortType, this.loadActiveItemsOnly)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.products = resp.dataList;
            }
            else {
                alert("failed");
            }
            _this.loading = false;
        }, function (error) {
            alert("error");
        });
    };
    ProductListComponent.prototype.setProductCount = function () {
        var _this = this;
        this.productService.getproductCount(this.cIds)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.totalRecords = resp.data.productCount;
            }
            else {
                alert("failed");
            }
        }, function (error) {
            alert("error");
        });
    };
    ProductListComponent.prototype.loadActiveItems = function () {
        this.setProducts();
    };
    ProductListComponent.prototype.sortBy = function (sortField, sortType) {
        this.sortType = sortType;
        this.sortField = sortField;
        this.setProducts();
    };
    ProductListComponent.prototype.clearSort = function () {
        this.sortType = null;
        this.sortField = null;
        this.setProducts();
    };
    ProductListComponent.prototype.onItemSelect = function (item) {
        if (!this.cIds.includes(item.categoryId)) {
            this.cIds.push(item.categoryId);
        }
        this.setProducts();
    };
    ProductListComponent.prototype.onDeSelect = function (item) {
        if (this.cIds.includes(item.categoryId)) {
            var index = this.cIds.indexOf(item.categoryId);
            this.cIds.splice(index, 1);
        }
        this.setProducts();
    };
    ProductListComponent.prototype.onDeSelectAll = function () {
        this.cIds.length = 0;
        this.setProducts();
    };
    ProductListComponent.prototype.onSelectAll = function (items) {
        var _this = this;
        console.log('onSelectAll', items);
        items.forEach(function (item) {
            if (!_this.cIds.includes(item.categoryId)) {
                _this.cIds.push(item.categoryId);
            }
        });
        this.setProducts();
    };
    ProductListComponent.prototype.toogleShowFilter = function () {
        this.ShowFilter = !this.ShowFilter;
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
    };
    ProductListComponent.prototype.handleLimitSelection = function () {
        if (this.limitSelection) {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
        }
        else {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
        }
    };
    ProductListComponent.prototype.setPageSizeOptions = function (setPageSizeOptionsInput) {
        if (setPageSizeOptionsInput) {
            this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(function (str) { return +str; });
        }
    };
    ProductListComponent.prototype.action = function (event) {
        this.pageSize = event.pageSize;
        var pageIndex = event.pageIndex;
        this.offset = pageIndex * this.pageSize;
        this.setProducts();
    };
    ProductListComponent.ctorParameters = function () { return [
        { type: _shared_product_product_service__WEBPACK_IMPORTED_MODULE_3__["ProductService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }
    ]; };
    ProductListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-product-list',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./product-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/product-list/product-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./product-list.component.css */ "./src/app/views/product/product-list/product-list.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_shared_product_product_service__WEBPACK_IMPORTED_MODULE_3__["ProductService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], ProductListComponent);
    return ProductListComponent;
}());



/***/ }),

/***/ "./src/app/views/product/product-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/product/product-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ProductRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductRoutingModule", function() { return ProductRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _category_category_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category/category.component */ "./src/app/views/product/category/category.component.ts");
/* harmony import */ var _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product-list/product-list.component */ "./src/app/views/product/product-list/product-list.component.ts");
/* harmony import */ var _manage_products_manage_product_manage_product_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./manage-products/manage-product/manage-product.component */ "./src/app/views/product/manage-products/manage-product/manage-product.component.ts");






var routes = [
    {
        path: '',
        data: {
            title: 'Products'
        },
        children: [
            {
                path: '',
                redirectTo: 'product-list'
            },
            {
                path: 'category',
                component: _category_category_component__WEBPACK_IMPORTED_MODULE_3__["CategoryComponent"],
                data: {
                    title: 'Manage Category'
                }
            },
            {
                path: 'product-list',
                component: _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_4__["ProductListComponent"],
                data: {
                    title: 'Products List'
                }
            },
            {
                path: 'manage-product',
                component: _manage_products_manage_product_manage_product_component__WEBPACK_IMPORTED_MODULE_5__["ManageProductComponent"],
                data: {
                    title: 'Products Management'
                }
            }
        ]
    }
];
var ProductRoutingModule = /** @class */ (function () {
    function ProductRoutingModule() {
    }
    ProductRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], ProductRoutingModule);
    return ProductRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/product/product.module.ts":
/*!*************************************************!*\
  !*** ./src/app/views/product/product.module.ts ***!
  \*************************************************/
/*! exports provided: ProductModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductModule", function() { return ProductModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm2015/ng2-charts.js");
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ "./node_modules/ngx-bootstrap/dropdown/fesm5/ngx-bootstrap-dropdown.js");
/* harmony import */ var ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/buttons */ "./node_modules/ngx-bootstrap/buttons/fesm5/ngx-bootstrap-buttons.js");
/* harmony import */ var _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/_alert/alert.module */ "./src/app/shared/_alert/alert.module.ts");
/* harmony import */ var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/carousel */ "./node_modules/ngx-bootstrap/carousel/fesm5/ngx-bootstrap-carousel.js");
/* harmony import */ var _shared_collapse__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/collapse */ "./src/app/shared/collapse/index.ts");
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
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _category_category_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./category/category.component */ "./src/app/views/product/category/category.component.ts");
/* harmony import */ var _product_routing_module__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./product-routing.module */ "./src/app/views/product/product-routing.module.ts");
/* harmony import */ var _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./product-list/product-list.component */ "./src/app/views/product/product-list/product-list.component.ts");
/* harmony import */ var _manage_products_manage_product_manage_product_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./manage-products/manage-product/manage-product.component */ "./src/app/views/product/manage-products/manage-product/manage-product.component.ts");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");










// Material modules









































var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _category_category_component__WEBPACK_IMPORTED_MODULE_46__["CategoryComponent"],
                _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_48__["ProductListComponent"],
                _manage_products_manage_product_manage_product_component__WEBPACK_IMPORTED_MODULE_49__["ManageProductComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                ng2_charts__WEBPACK_IMPORTED_MODULE_4__["ChartsModule"],
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__["BsDropdownModule"],
                ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_6__["ButtonsModule"].forRoot(),
                _product_routing_module__WEBPACK_IMPORTED_MODULE_47__["ProductRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
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
                ngx_loading__WEBPACK_IMPORTED_MODULE_44__["NgxLoadingModule"].forRoot({
                    animationType: ngx_loading__WEBPACK_IMPORTED_MODULE_44__["ngxLoadingAnimationTypes"].rectangleBounce,
                    backdropBackgroundColour: 'rgba(0,0,0,0.3)',
                    backdropBorderRadius: '4px',
                    primaryColour: 'cornflowerblue',
                    secondaryColour: 'chocolate',
                    tertiaryColour: 'darkred'
                }),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_45__["SharedModule"],
                _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_7__["AlertModule"],
                ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_8__["CarouselModule"],
                _shared_collapse__WEBPACK_IMPORTED_MODULE_9__["CollapseModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_50__["NgMultiSelectDropDownModule"].forRoot()
            ]
        })
    ], ProductModule);
    return ProductModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-product-product-module.js.map