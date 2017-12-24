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
var student_service_1 = require('./student.service');
var StudentDetailComponent = (function () {
    function StudentDetailComponent(route, router, studentService) {
        this.route = route;
        this.router = router;
        this.studentService = studentService;
        this.pageTitle = 'Student Detail';
    }
    StudentDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getStudent(id);
        });
    };
    StudentDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    StudentDetailComponent.prototype.getStudent = function (id) {
        var _this = this;
        this.studentService.getStudent(id).subscribe(function (student) { return _this.student = student; }, function (error) { return _this.errorMessage = error; });
    };
    StudentDetailComponent.prototype.onBack = function () {
        this.router.navigate(['/students']);
    };
    StudentDetailComponent.prototype.onRatingClicked = function (message) {
        this.pageTitle = 'Student Detail: ' + message;
    };
    StudentDetailComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/students/student-detail.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, student_service_1.StudentService])
    ], StudentDetailComponent);
    return StudentDetailComponent;
}());
exports.StudentDetailComponent = StudentDetailComponent;
//# sourceMappingURL=student-detail.component.js.map