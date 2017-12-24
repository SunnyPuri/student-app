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
var student_service_1 = require('./student.service');
var StudentListComponent = (function () {
    function StudentListComponent(studentService) {
        this.studentService = studentService;
        this.pageTitle = 'Student List';
    }
    StudentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.studentService.getStudents()
            .subscribe(function (students) { return _this.students = students; }, function (error) { return _this.errorMessage = error; });
    };
    StudentListComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/students/student-list.component.html',
            styleUrls: ['app/students/student-list.component.css']
        }), 
        __metadata('design:paramtypes', [student_service_1.StudentService])
    ], StudentListComponent);
    return StudentListComponent;
}());
exports.StudentListComponent = StudentListComponent;
//# sourceMappingURL=student-list.component.js.map