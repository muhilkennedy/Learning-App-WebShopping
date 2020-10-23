(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-dashboard-dashboard-module~views-employee-employee-module~views-invoice-invoice-templa~99464cf2"],{

/***/ "./node_modules/ngx-typeahead/fesm5/ngx-typeahead.js":
/*!***********************************************************!*\
  !*** ./node_modules/ngx-typeahead/fesm5/ngx-typeahead.js ***!
  \***********************************************************/
/*! exports provided: NgxTypeAheadComponent, NgxTypeaheadModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTypeAheadComponent", function() { return NgxTypeAheadComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTypeaheadModule", function() { return NgxTypeaheadModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");







var Key;
(function (Key) {
    Key["Backspace"] = "Backspace";
    Key["Tab"] = "Tab";
    Key["Enter"] = "Enter";
    Key["ShiftLeft"] = "ShiftLeft";
    Key["ShiftRight"] = "ShiftRight";
    Key["Escape"] = "Escape";
    Key["ArrowLeft"] = "ArrowLeft";
    Key["ArrowRight"] = "ArrowRight";
    Key["ArrowUp"] = "ArrowUp";
    Key["ArrowDown"] = "ArrowDown";
    // http://unixpapa.com/js/key.html
    Key["MetaLeft"] = "MetaLeft";
    Key["MetaRight"] = "MetaRight";
})(Key || (Key = {}));

function validateNonCharKeyCode(keyCode) {
    return [
        Key.Enter,
        Key.Tab,
        Key.ShiftLeft,
        Key.ShiftRight,
        Key.ArrowLeft,
        Key.ArrowUp,
        Key.ArrowRight,
        Key.ArrowDown,
        Key.MetaLeft,
        Key.MetaRight,
    ].every(function (codeKey) { return codeKey !== keyCode; });
}
function validateArrowKeys(keyCode) {
    return keyCode === Key.ArrowDown || keyCode === Key.ArrowUp;
}
function isIndexActive(index, currentIndex) {
    return index === currentIndex;
}
function isEnterKey(event) {
    return event.code === Key.Enter;
}
function isEscapeKey(event) {
    // tslint:disable-next-line: deprecation
    return event.code === Key.Escape;
}
function createParamsForQuery(query, queryParamKey, customParams) {
    var _a;
    if (queryParamKey === void 0) { queryParamKey = 'q'; }
    if (customParams === void 0) { customParams = {}; }
    var searchParams = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])((_a = {}, _a[queryParamKey] = query, _a), customParams);
    // tslint:disable-next-line
    var setParam = function (acc, param) {
        return acc.set(param, searchParams[param]);
    };
    var params = Object.keys(searchParams).reduce(setParam, new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]());
    return params;
}
function resolveApiMethod(method) {
    if (method === void 0) { method = ''; }
    var isMethodValid = [
        'get',
        'post',
        'put',
        'delete',
        'patch',
        'request',
    ].some(function (methodName) { return method === methodName; });
    var apiMethod = isMethodValid ? method : 'get';
    return apiMethod;
}
var NO_INDEX = -1;
function resolveNextIndex(currentIndex, stepUp, listLength) {
    if (listLength === void 0) { listLength = 10; }
    var step = stepUp ? 1 : -1;
    var topLimit = listLength - 1;
    var bottomLimit = NO_INDEX;
    var currentResultIndex = currentIndex + step;
    var resultIndex = currentResultIndex;
    if (currentResultIndex === topLimit + 1) {
        resultIndex = bottomLimit;
    }
    if (currentResultIndex === bottomLimit - 1) {
        resultIndex = topLimit;
    }
    return resultIndex;
}
function toJsonpSingleResult(response) {
    return response[1];
}
function toJsonpFinalResults(results) {
    return results.map(function (result) { return result[0]; });
}
function hasCharacters(query) {
    return query.length > 0;
}
function toFormControlValue(e) {
    return e.target.value;
}
function resolveItemValue(item, fieldsToExtract, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = false; }
    var newItem = item;
    if (!item.hasOwnProperty('length')) {
        var fields = !fieldsToExtract.length
            ? Object.keys(item)
            : fieldsToExtract;
        newItem = fields.reduce(function (acc, cur) { return "" + acc + item[cur]; }, '');
    }
    return caseSensitive ? newItem : newItem.toLowerCase();
}

/*
 using an external template:
 <input [taItemTpl]="itemTpl" >

  <ng-template #itemTpl let-result>
    <strong>MY {{ result.result }}</strong>
  </ng-template>
*/
var NgxTypeAheadComponent = /** @class */ (function () {
    function NgxTypeAheadComponent(element, viewContainer, http, cdr) {
        this.element = element;
        this.viewContainer = viewContainer;
        this.http = http;
        this.cdr = cdr;
        this.showSuggestions = false;
        this.results = [];
        this.taUrl = '';
        this.taParams = {};
        this.taQueryParam = 'q';
        this.taApi = 'jsonp';
        this.taApiMethod = 'get';
        this.taList = [];
        this.taListItemField = [];
        this.taListItemLabel = '';
        this.taDebounce = 300;
        this.taAllowEmpty = false;
        this.taCaseSensitive = false;
        this.taDisplayOnFocus = false;
        this.taSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.suggestionIndex = 0;
        this.subscriptions = [];
        this.activeResult = '';
        this.searchQuery = '';
        this.selectedItem = {};
        this.resultsAsItems = [];
        this.keydown$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.keyup$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    NgxTypeAheadComponent.prototype.handleEsc = function (event) {
        if (isEscapeKey(event)) {
            this.hideSuggestions();
            event.preventDefault();
        }
        this.keydown$.next(event);
    };
    NgxTypeAheadComponent.prototype.onkeyup = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.keyup$.next(event);
    };
    NgxTypeAheadComponent.prototype.onClick = function () {
        if (this.taDisplayOnFocus) {
            this.displaySuggestions();
        }
    };
    NgxTypeAheadComponent.prototype.ngOnInit = function () {
        this.filterEnterEvent(this.keydown$);
        this.listenAndSuggest(this.keyup$);
        this.navigateWithArrows(this.keydown$);
        this.renderTemplate();
    };
    NgxTypeAheadComponent.prototype.ngOnDestroy = function () {
        this.keydown$.complete();
        this.keyup$.complete();
    };
    NgxTypeAheadComponent.prototype.renderTemplate = function () {
        if (!this.suggestionsTplRef) {
            console.error('NO NGXTA Template Found. Requires NG9');
            return;
        }
        this.viewContainer.createEmbeddedView(this.suggestionsTplRef);
        this.cdr.markForCheck();
    };
    NgxTypeAheadComponent.prototype.listenAndSuggest = function (obs) {
        var _this = this;
        obs
            .pipe(
        // tslint:disable-next-line: deprecation
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (e) { return validateNonCharKeyCode(e.code); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(toFormControlValue), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(this.taDebounce), 
        // tslint:disable-next-line: deprecation
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["concat"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (query) { return _this.taAllowEmpty || hasCharacters(query); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (query) { return (_this.searchQuery = query); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (query) { return _this.suggest(query); }))
            .subscribe(function (results) {
            _this.assignResults(results);
            // this.updateIndex(Key.ArrowDown);
            _this.displaySuggestions();
        });
    };
    NgxTypeAheadComponent.prototype.assignResults = function (results) {
        var labelForDisplay = this.taListItemLabel;
        this.resultsAsItems = results;
        this.results = results.map(function (item) {
            return labelForDisplay ? item[labelForDisplay] : item;
        });
        this.suggestionIndex = NO_INDEX;
        if (!results || !results.length) {
            this.activeResult = this.searchQuery;
        }
    };
    NgxTypeAheadComponent.prototype.filterEnterEvent = function (elementObs) {
        var _this = this;
        elementObs.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(isEnterKey)).subscribe(function (event) {
            _this.handleSelectSuggestion(_this.activeResult);
        });
    };
    NgxTypeAheadComponent.prototype.navigateWithArrows = function (elementObs) {
        var _this = this;
        elementObs
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (e) { return validateArrowKeys(e.keyCode); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (e) { return e.keyCode; }))
            .subscribe(function (keyCode) {
            _this.updateIndex(keyCode);
            _this.displaySuggestions();
        });
    };
    NgxTypeAheadComponent.prototype.updateIndex = function (keyCode) {
        this.suggestionIndex = resolveNextIndex(this.suggestionIndex, keyCode === Key.ArrowDown, this.results.length);
    };
    NgxTypeAheadComponent.prototype.displaySuggestions = function () {
        this.showSuggestions = true;
        this.cdr.markForCheck();
    };
    NgxTypeAheadComponent.prototype.suggest = function (query) {
        return this.taList.length
            ? this.createListSource(this.taList, query)
            : this.request(query);
    };
    /**
     * peforms a jsonp/http request to search with query and params
     * @param query the query to search from the remote source
     */
    NgxTypeAheadComponent.prototype.request = function (query) {
        var url = this.taUrl;
        var searchConfig = createParamsForQuery(query, this.taQueryParam, this.taParams);
        var options = {
            params: searchConfig,
        };
        var isJsonpApi = this.taApi === 'jsonp';
        return isJsonpApi
            ? this.requestJsonp(url, options, this.taCallbackParamValue)
            : this.requestHttp(url, options);
    };
    NgxTypeAheadComponent.prototype.requestHttp = function (url, options) {
        var apiMethod = resolveApiMethod(this.taApiMethod);
        return this.http[apiMethod](url, options);
    };
    NgxTypeAheadComponent.prototype.requestJsonp = function (url, options, callback) {
        if (callback === void 0) { callback = 'callback'; }
        var params = options.params.toString();
        return this.http
            .jsonp(url + "?" + params, callback)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(toJsonpSingleResult), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(toJsonpFinalResults));
    };
    NgxTypeAheadComponent.prototype.markIsActive = function (index, result) {
        var isActive = isIndexActive(index, this.suggestionIndex);
        if (isActive) {
            this.activeResult = result;
        }
        return isActive;
    };
    NgxTypeAheadComponent.prototype.handleSelectionClick = function (suggestion, index) {
        this.suggestionIndex = index;
        this.handleSelectSuggestion(suggestion);
    };
    NgxTypeAheadComponent.prototype.handleSelectSuggestion = function (suggestion) {
        var result = this.resultsAsItems.length
            ? this.resultsAsItems[this.suggestionIndex]
            : suggestion;
        this.hideSuggestions();
        var resolvedResult = this.suggestionIndex === NO_INDEX ? this.searchQuery : result;
        this.taSelected.emit(resolvedResult);
    };
    NgxTypeAheadComponent.prototype.hideSuggestions = function () {
        this.showSuggestions = false;
    };
    NgxTypeAheadComponent.prototype.hasItemTemplate = function () {
        return this.taItemTpl !== undefined;
    };
    NgxTypeAheadComponent.prototype.createListSource = function (list, query) {
        var _this = this;
        var sanitizedQuery = this.taCaseSensitive ? query : query.toLowerCase();
        var fieldsToExtract = this.taListItemField;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(list.filter(function (item) {
            return resolveItemValue(item, fieldsToExtract, _this.taCaseSensitive).includes(sanitizedQuery);
        }));
    };
    NgxTypeAheadComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] }
    ]; };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taItemTpl", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taUrl", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taParams", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taQueryParam", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taCallbackParamValue", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taApi", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taApiMethod", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taList", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taListItemField", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taListItemLabel", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taDebounce", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taAllowEmpty", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taCaseSensitive", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], NgxTypeAheadComponent.prototype, "taDisplayOnFocus", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])()
    ], NgxTypeAheadComponent.prototype, "taSelected", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"], { static: true })
    ], NgxTypeAheadComponent.prototype, "suggestionsTplRef", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"])('keydown', ['$event'])
    ], NgxTypeAheadComponent.prototype, "handleEsc", null);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"])('keyup', ['$event'])
    ], NgxTypeAheadComponent.prototype, "onkeyup", null);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"])('click')
    ], NgxTypeAheadComponent.prototype, "onClick", null);
    NgxTypeAheadComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            // tslint:disable-next-line: component-selector
            selector: 'ngx-typeahead, [ngxTypeahead]',
            template: "\n    <ng-template #suggestionsTplRef>\n      <section class=\"ta-results list-group\" *ngIf=\"showSuggestions\">\n        <div class=\"ta-backdrop\" (click)=\"hideSuggestions()\"></div>\n        <button\n          type=\"button\"\n          class=\"ta-item list-group-item\"\n          *ngFor=\"let result of results; let i = index\"\n          [class.active]=\"markIsActive(i, result)\"\n          (click)=\"handleSelectionClick(result, i)\"\n        >\n          <span *ngIf=\"!taItemTpl\"\n            ><i class=\"fa fa-search\"></i> {{ result }}</span\n          >\n          <ng-template\n            [ngTemplateOutlet]=\"taItemTpl\"\n            [ngTemplateOutletContext]=\"{\n              $implicit: { result: result, index: i }\n            }\"\n          ></ng-template>\n        </button>\n      </section>\n    </ng-template>\n  ",
            styles: ["\n      .ta-results {\n        position: absolute;\n      }\n      .ta-backdrop {\n        bottom: 0;\n        left: 0;\n        position: fixed;\n        right: 0;\n        top: 0;\n        z-index: 1;\n      }\n      .ta-item {\n        position: relative;\n        z-index: 2;\n        display: block;\n      }\n    "]
        })
    ], NgxTypeAheadComponent);
    return NgxTypeAheadComponent;
}());

var NgxTypeaheadModule = /** @class */ (function () {
    function NgxTypeaheadModule() {
    }
    NgxTypeaheadModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [NgxTypeAheadComponent],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientJsonpModule"]],
            exports: [NgxTypeAheadComponent, _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"]]
        })
    ], NgxTypeaheadModule);
    return NgxTypeaheadModule;
}());

/*
 * Public API Surface of ngx-typeahead
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ngx-typeahead.js.map


/***/ })

}]);
//# sourceMappingURL=default~views-dashboard-dashboard-module~views-employee-employee-module~views-invoice-invoice-templa~99464cf2.js.map