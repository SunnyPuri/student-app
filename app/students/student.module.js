"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
// Imports for loading & configuring the in-memory web api
var angular_in_memory_web_api_1 = require('angular-in-memory-web-api');
var student_data_1 = require('./student-data');
var student_service_1 = require('./student.service');
var student_list_component_1 = require('./student-list.component');
var student_detail_component_1 = require('./student-detail.component');
var student_guard_service_1 = require('./student-guard.service');
var student_edit_component_1 = require('./student-edit.component');
var student_filter_pipe_1 = require('./student-filter.pipe');
var shared_module_1 = require('../shared/shared.module');
var StudentModule = (function () {
    function StudentModule() {
    }
    StudentModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(student_data_1.StudentData),
                router_1.RouterModule.forChild([
                    { path: 'students', component: student_list_component_1.StudentListComponent },
                    { path: 'student/:id',
                        canActivate: [student_guard_service_1.StudentDetailGuard],
                        component: student_detail_component_1.StudentDetailComponent
                    },
                    { path: 'studentEdit/:id',
                        canDeactivate: [student_guard_service_1.StudentEditGuard],
                        component: student_edit_component_1.StudentEditComponent },
                ])
            ],
            declarations: [
                student_list_component_1.StudentListComponent,
                student_detail_component_1.StudentDetailComponent,
                student_edit_component_1.StudentEditComponent,
                student_filter_pipe_1.StudentFilterPipe
            ],
            providers: [
                student_service_1.StudentService,
                student_guard_service_1.StudentDetailGuard,
                student_guard_service_1.StudentEditGuard
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], StudentModule);
    return StudentModule;
}());
exports.StudentModule = StudentModule;
//# sourceMappingURL=student.module.js.map