(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-dashboard-dashboard-module~views-task-task-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/task/task.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/task/task.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<alert class=\"p-4 text-center\"></alert>\r\n<div class=\"card\">\r\n  <ngx-loading [show]=\"loading\"></ngx-loading>\r\n  <div class=\"card-header\">\r\n    <i class=\"fa fa-tasks\"></i>TASKS\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"row\">\r\n      <table class=\"table table-responsive-sm table-hover table-outline mb-0\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <thead class=\"thead-light\">\r\n          <tr>\r\n            <th>STATUS</th>\r\n            <th>TASK CONTENT</th>\r\n            <th>DUE DATE</th>\r\n            <th>OWNER</th>\r\n            <th *ngIf=\"showTaskActions()\">ACTIONS</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody style=\"background: white;\">\r\n          <tr *ngFor=\"let item of assignedTasks\">\r\n            <td>\r\n              <span *ngIf=\"item.status === 'Completed' ? true : false\" class=\"badge badge-success\">{{item.status}}</span>\r\n              <span *ngIf=\"item.status === 'Overdue' ? true : false\" class=\"badge badge-danger\">{{item.status}}</span>\r\n              <span *ngIf=\"item.status === 'Pending' ? true : false\" class=\"badge badge-warning\">{{item.status}}</span>\r\n            </td>\r\n            <td>\r\n              {{item.content}}\r\n            </td>\r\n            <td>\r\n              {{item.enddate | date : 'dd-MM-yyyy'}}\r\n            </td>\r\n            <td>\r\n              {{item.creatorName}}\r\n            </td>\r\n            <td *ngIf=\"showTaskActions()\">\r\n              <span title=\"Mark Complete\" class=\"hover-cursor mousestyle\" [class.text-success]=\"item.status==='Completed' ? true : false\" >\r\n                <i class=\"fa fa-lg\" [ngClass]=\"item.status==='Completed'?'fa-check-circle-o':'fa-circle-thin'\" (click)=\"item.status = 'Completed'; completeTask(item)\"></i>\r\n              </span>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <mat-paginator [length]=\"total\"\r\n        [pageSize]=\"pageSize\"\r\n        [pageSizeOptions]=\"pageSizeOptions\"\r\n        (page)=\"action($event)\">\r\n      </mat-paginator>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card\" *ngIf=\"showCreateCard()\">\r\n  <ngx-loading [show]=\"createLoading\"></ngx-loading>\r\n  <div class=\"card-header\">\r\n    <i class=\"fa fa-tasks\"></i>CREATE TASK\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"row\">\r\n      <form>\r\n        <textarea id=\"textarea-input\" name=\"textarea-input\" rows=\"3\" class=\"form-control\" placeholder=\"Type What Has to be Done?\" [(ngModel)]=\"content\"></textarea>\r\n        <br>\r\n        <mat-form-field appearance=\"fill\" class=\"matitem\">\r\n          <input type=\"text\"\r\n                 placeholder=\"Assign To Employee\"\r\n                 matInput\r\n                 [formControl]=\"myControl\"\r\n                 [matAutocomplete]=\"auto\">\r\n          <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" >\r\n            <mat-option (onSelectionChange)=\"setUser(option)\" *ngFor=\"let option of filteredOptions | async\" [value]=\"option.firstName+' '+option.lastName\">\r\n              {{option.firstName}} {{option.lastName}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        <mat-form-field appearance=\"fill\" class=\"matitem\">\r\n          <mat-label>DUE Date</mat-label>\r\n          <input required matInput [matDatepicker]=\"dobpicker\" [formControl]=\"dateFormControl\" (dateChange)=\"setEndDate('change', $event)\" disabled>\r\n          <mat-datepicker-toggle matSuffix [for]=\"dobpicker\"></mat-datepicker-toggle>\r\n          <mat-datepicker #dobpicker disabled=\"false\"></mat-datepicker>\r\n        </mat-form-field>\r\n        <button mat-button class=\"btn btn-ghost-primary\" style=\"border: 1px solid;\" (click)=\"createTask()\">\r\n          <i class=\"fa fa-plus-square-o\"></i> Create TASK\r\n        </button>\r\n      </form>\r\n    </div>\r\n    <br/>\r\n    <div class=\"row\">\r\n      <table class=\"table table-responsive-sm table-hover table-outline mb-0\">\r\n        <ngx-loading [show]=\"loading\"></ngx-loading>\r\n        <thead class=\"thead-light\">\r\n          <tr>\r\n            <th>STATUS</th>\r\n            <th>TASK CONTENT</th>\r\n            <th>DUE DATE</th>\r\n            <th>ASSIGNEE ID</th>\r\n            <th>ASSIGNEE NAME</th>\r\n            <th>ACTIONS</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody style=\"background: white;\">\r\n          <tr *ngFor=\"let item of createdTasks\">\r\n            <td>\r\n              <span *ngIf=\"item.status === 'Completed' ? true : false\" class=\"badge badge-success\">{{item.status}}</span>\r\n              <span *ngIf=\"item.status === 'Overdue' ? true : false\" class=\"badge badge-danger\">{{item.status}}</span>\r\n              <span *ngIf=\"item.status === 'Pending' ? true : false\" class=\"badge badge-warning\">{{item.status}}</span>\r\n            </td>\r\n            <td>\r\n              {{item.content}}\r\n            </td>\r\n            <td>\r\n              {{item.enddate | date : 'dd-MM-yyyy'}}\r\n            </td>\r\n            <td>\r\n              {{item.assigneeId}}\r\n            </td>\r\n            <td>\r\n              {{item.assigneeName}}\r\n            </td>\r\n            <td>\r\n              <i class=\"fa fa-remove\" style=\"color: red; cursor: pointer;\" (click)=\"removeTask(item)\"></i>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <mat-paginator [length]=\"total\"\r\n        [pageSize]=\"pageSize\"\r\n        [pageSizeOptions]=\"pageSizeOptions\"\r\n        (page)=\"action($event)\">\r\n      </mat-paginator>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/shared/task/task.service.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/task/task.service.ts ***!
  \*********************************************/
/*! exports provided: TaskService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskService", function() { return TaskService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var TaskService = /** @class */ (function () {
    function TaskService(http) {
        this.http = http;
        this.getCreatedTaskEndpoint = "/secure/admin/task/getCreatedTasks";
        this.getAssignedTaskEndpoint = "/secure/admin/task/getAssignedTasks";
        this.createTaskEndpoint = "/secure/admin/task/createTask";
        this.getAllEmployeeNamesAndEmailEndpoint = "/secure/admin/employee/getAllEmployeeNames";
        this.deleteTaskEndpoint = "/secure/admin/task/deleteTask";
        this.updateTaskEndpoint = "/secure/admin/task/updateTask";
    }
    TaskService.prototype.getAssignedTask = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendBaseUrl + this.getAssignedTaskEndpoint);
    };
    TaskService.prototype.getCreatedTask = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendBaseUrl + this.getCreatedTaskEndpoint);
    };
    TaskService.prototype.createTask = function (content, assigneeId, duedate) {
        var body = {
            assigneeId: assigneeId,
            content: content,
            enddate: duedate
        };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendBaseUrl + this.createTaskEndpoint, body);
    };
    TaskService.prototype.getAllEmployeeNamesAndEmail = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendBaseUrl + this.getAllEmployeeNamesAndEmailEndpoint);
    };
    TaskService.prototype.removeTask = function (id) {
        var httpOptions = {
            params: { id: id }
        };
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendBaseUrl + this.deleteTaskEndpoint, httpOptions);
    };
    TaskService.prototype.updateTask = function (id, status) {
        var body = {
            taskId: id,
            status: status
        };
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendBaseUrl + this.updateTaskEndpoint, body);
    };
    TaskService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    TaskService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], TaskService);
    return TaskService;
}());



/***/ }),

/***/ "./src/app/views/task/task-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/task/task-routing.module.ts ***!
  \***************************************************/
/*! exports provided: TaskRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskRoutingModule", function() { return TaskRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _task_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task.component */ "./src/app/views/task/task.component.ts");




var routes = [
    {
        path: '',
        data: {
            title: 'Tasks'
        },
        children: [
            {
                path: '',
                redirectTo: 'task'
            },
            {
                path: 'task/:isTaskpage',
                component: _task_component__WEBPACK_IMPORTED_MODULE_3__["TaskComponent"],
                data: {
                    title: 'Manage Tasks'
                }
            }
        ]
    }
];
var TaskRoutingModule = /** @class */ (function () {
    function TaskRoutingModule() {
    }
    TaskRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], TaskRoutingModule);
    return TaskRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/task/task.component.scss":
/*!************************************************!*\
  !*** ./src/app/views/task/task.component.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mousestyle {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvdGFzay9DOlxcVXNlcnNcXEFETUlOU1xcRGVza3RvcFxcUHJvamVjdDFcXG9jdFxcTGVhcm5pbmctQXBwLVdlYlNob3BwaW5nXFxhZG1pbi11aS9zcmNcXGFwcFxcdmlld3NcXHRhc2tcXHRhc2suY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3ZpZXdzL3Rhc2svdGFzay5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Rhc2svdGFzay5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tb3VzZXN0eWxle1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4iLCIubW91c2VzdHlsZSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/views/task/task.component.ts":
/*!**********************************************!*\
  !*** ./src/app/views/task/task.component.ts ***!
  \**********************************************/
/*! exports provided: TaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskComponent", function() { return TaskComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/_alert */ "./src/app/shared/_alert/index.ts");
/* harmony import */ var _shared_task_task_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/task/task.service */ "./src/app/shared/task/task.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _service_userStore_user_store_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../service/userStore/user-store.service */ "./src/app/service/userStore/user-store.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/fesm5/ngx-cookie-service.js");









var TaskComponent = /** @class */ (function () {
    function TaskComponent(route, alertService, taskService, userStore, cookieService) {
        var _this = this;
        this.route = route;
        this.alertService = alertService;
        this.taskService = taskService;
        this.userStore = userStore;
        this.cookieService = cookieService;
        this.loading = false;
        this.createLoading = false;
        this.createCard = false;
        this.isCreateTaskAllowed = false;
        this.makeCallOninit = false;
        // MatPaginator Inputs
        this.offset = 0;
        this.total = 10;
        this.pageSize = 5;
        this.pageSizeOptions = [5, 10, 50];
        //autoComplete
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required
        ]);
        this.endDate = new Date();
        this.assignedTasks = new Array();
        this.createdTasks = new Array();
        this.selectedStatus = '';
        this.dateFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required
        ]);
        var allowCall = this.cookieService.get('JWT');
        if (allowCall != null && allowCall != undefined && allowCall != '') {
            this.makeCallOninit = true;
            this.loading = true;
            //show create card for only admin and manager permission
            var onLoad_1 = setInterval(function () {
                _this.userPermissions = _this.userStore.employeePermissions;
                if (_this.userPermissions != undefined && _this.userPermissions.length > 0) {
                    var permissionIds_1 = new Array(4);
                    _this.userPermissions.forEach(function (permission) {
                        permissionIds_1.push(permission.permission.permissionId);
                    });
                    if (permissionIds_1.includes(1) || permissionIds_1.includes(2)) {
                        _this.isCreateTaskAllowed = true;
                    }
                    clearInterval(onLoad_1);
                }
            }, 500);
            //get all assigned tasks
            this.taskService.getAssignedTask()
                .subscribe(function (resp) {
                if (resp.statusCode === 200) {
                    _this.assignedTasks = resp.dataList;
                }
                _this.loading = false;
            }, function (error) {
                _this.loading = false;
            });
            this.taskService.getAllEmployeeNamesAndEmail()
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
    }
    TaskComponent.prototype.changeSlected = function (event) {
        this.selectedStatus = event.target.value;
    };
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.makeCallOninit) {
            this.createLoading = true;
            this.sub = this.route.params.subscribe(function (params) {
                _this.createCard = params['isTaskpage'];
            });
            this.taskService.getCreatedTask()
                .subscribe(function (resp) {
                if (resp.statusCode === 200) {
                    _this.createdTasks = resp.dataList;
                }
                else {
                    _this.alertService.error('Failed : ' + resp.errorMessages);
                }
                _this.createLoading = false;
            }, function (error) {
                _this.alertService.error("something went wrong!");
                _this.createLoading = false;
            });
        }
    };
    TaskComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.options.filter(function (option) { return option.firstName.toLowerCase().indexOf(filterValue) === 0; });
    };
    TaskComponent.prototype.showTaskActions = function () {
        if (this.createCard) {
            return true;
        }
        else {
            return false;
        }
    };
    TaskComponent.prototype.showCreateCard = function () {
        if (this.createCard && this.isCreateTaskAllowed) {
            return true;
        }
        else {
            return false;
        }
    };
    TaskComponent.prototype.setUser = function (user) {
        this.assigneeId = user.employeeId;
    };
    TaskComponent.prototype.setEndDate = function (type, event) {
        this.endDate = event.value;
    };
    TaskComponent.prototype.createTask = function () {
        var _this = this;
        this.createLoading = true;
        this.taskService.createTask(this.content, this.assigneeId, this.endDate)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.createdTasks = resp.dataList;
            }
            else {
                _this.alertService.error('Failed : ' + resp.errorMessages);
            }
            _this.createLoading = false;
        }, function (error) {
            _this.alertService.error("something went wrong!");
            _this.createLoading = false;
        });
    };
    TaskComponent.prototype.removeTask = function (task) {
        var _this = this;
        this.createLoading = true;
        this.taskService.removeTask(task.taskId)
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.createdTasks = resp.dataList;
            }
            else {
            }
            _this.createLoading = false;
        }, function (error) {
            _this.alertService.error("something went wrong!");
            _this.createLoading = false;
        });
    };
    TaskComponent.prototype.completeTask = function (task) {
        var _this = this;
        this.loading = true;
        this.taskService.updateTask(task.taskId, 'Completed')
            .subscribe(function (resp) {
            if (resp.statusCode === 200) {
                _this.assignedTasks = resp.dataList;
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
    TaskComponent.prototype.action = function (event) {
    };
    TaskComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _shared_alert__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: _shared_task_task_service__WEBPACK_IMPORTED_MODULE_4__["TaskService"] },
        { type: _service_userStore_user_store_service__WEBPACK_IMPORTED_MODULE_7__["UserStoreService"] },
        { type: ngx_cookie_service__WEBPACK_IMPORTED_MODULE_8__["CookieService"] }
    ]; };
    TaskComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-task',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./task.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/task/task.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./task.component.scss */ "./src/app/views/task/task.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _shared_alert__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            _shared_task_task_service__WEBPACK_IMPORTED_MODULE_4__["TaskService"],
            _service_userStore_user_store_service__WEBPACK_IMPORTED_MODULE_7__["UserStoreService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_8__["CookieService"]])
    ], TaskComponent);
    return TaskComponent;
}());



/***/ }),

/***/ "./src/app/views/task/task.module.ts":
/*!*******************************************!*\
  !*** ./src/app/views/task/task.module.ts ***!
  \*******************************************/
/*! exports provided: TaskModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskModule", function() { return TaskModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/_alert/alert.module */ "./src/app/shared/_alert/alert.module.ts");
/* harmony import */ var _task_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./task-routing.module */ "./src/app/views/task/task-routing.module.ts");
/* harmony import */ var _task_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./task.component */ "./src/app/views/task/task.component.ts");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm5/autocomplete.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/fesm5/badge.js");
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/bottom-sheet */ "./node_modules/@angular/material/fesm5/bottom-sheet.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm5/button.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/fesm5/button-toggle.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/fesm5/checkbox.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/fesm5/chips.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/fesm5/stepper.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/fesm5/datepicker.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/fesm5/divider.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/fesm5/expansion.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/fesm5/grid-list.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/fesm5/icon.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm5/input.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/fesm5/list.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/fesm5/menu.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/fesm5/paginator.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/fesm5/progress-bar.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm5/progress-spinner.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/fesm5/radio.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/fesm5/select.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/fesm5/sidenav.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/fesm5/slider.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/fesm5/slide-toggle.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/fesm5/snack-bar.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/fesm5/sort.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/fesm5/table.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/fesm5/tabs.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/fesm5/toolbar.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm5/tooltip.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/fesm5/tree.js");









// Material modules


































var TaskModule = /** @class */ (function () {
    function TaskModule() {
    }
    TaskModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _task_component__WEBPACK_IMPORTED_MODULE_8__["TaskComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _task_routing_module__WEBPACK_IMPORTED_MODULE_7__["TaskRoutingModule"],
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
                _shared_alert_alert_module__WEBPACK_IMPORTED_MODULE_6__["AlertModule"],
                _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteModule"],
                _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__["MatBadgeModule"],
                _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__["MatBottomSheetModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__["MatButtonToggleModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__["MatCheckboxModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__["MatChipsModule"],
                _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__["MatStepperModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__["MatDatepickerModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialogModule"],
                _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__["MatDividerModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_21__["MatExpansionModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__["MatGridListModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__["MatIconModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_24__["MatInputModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__["MatMenuModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_27__["MatNativeDateModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__["MatPaginatorModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__["MatProgressBarModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_30__["MatProgressSpinnerModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_31__["MatRadioModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_27__["MatRippleModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_32__["MatSelectModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_33__["MatSidenavModule"],
                _angular_material_slider__WEBPACK_IMPORTED_MODULE_34__["MatSliderModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_35__["MatSlideToggleModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_36__["MatSnackBarModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_37__["MatSortModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_38__["MatTableModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_39__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_40__["MatToolbarModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_41__["MatTooltipModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_42__["MatTreeModule"],
            ],
            exports: [
                _task_component__WEBPACK_IMPORTED_MODULE_8__["TaskComponent"]
            ]
        })
    ], TaskModule);
    return TaskModule;
}());



/***/ })

}]);
//# sourceMappingURL=default~views-dashboard-dashboard-module~views-task-task-module.js.map