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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/observable/merge');
var Observable_1 = require('rxjs/Observable');
var student_service_1 = require('./student.service');
var generic_validator_1 = require('../shared/generic-validator');
var StudentEditComponent = (function () {
    function StudentEditComponent(fb, route, router, studentService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.studentService = studentService;
        this.pageTitle = 'Student Edit';
        // Use with the generic validation message class
        this.displayMessage = {};
        // Defines all of the validation messages for the form.
        this.validationMessages = {
            firstName: {
                required: 'First name is required.',
                minlength: 'First name must be at least three characters.',
                maxlength: 'First name cannot exceed 50 characters.'
            },
            lastName: {
                required: 'Last name is required.',
                minlength: 'Last name must be at least three characters.',
                maxlength: 'Last name cannot exceed 50 characters.'
            },
            email: {
                required: 'Please enter your email address.',
                pattern: 'Please enter a valid email address.'
            },
            mobile: {
                required: 'Mobile Number is required.',
            },
            gender: {
                required: 'Gender is required'
            }
        };
        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new generic_validator_1.GenericValidator(this.validationMessages);
    }
    Object.defineProperty(StudentEditComponent.prototype, "skills", {
        get: function () {
            return this.studentForm.get('skills');
        },
        enumerable: true,
        configurable: true
    });
    StudentEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.studentForm = this.fb.group({
            firstName: ['', [forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(50)]],
            lastName: ['', [forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(50)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
            mobile: ['', forms_1.Validators.required],
            gender: ['', forms_1.Validators.required],
            skills: this.fb.array([])
        });
        // Read the student Id from the route parameter
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getStudent(id);
        });
    };
    StudentEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    StudentEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Watch for the blur event from any input element on the form.
        var controlBlurs = this.formInputElements
            .map(function (formControl) { return Observable_1.Observable.fromEvent(formControl.nativeElement, 'blur'); });
        // Merge the blur event observable with the valueChanges observable
        Observable_1.Observable.merge.apply(Observable_1.Observable, [this.studentForm.valueChanges].concat(controlBlurs)).debounceTime(600).subscribe(function (value) {
            _this.displayMessage = _this.genericValidator.processMessages(_this.studentForm);
        });
    };
    StudentEditComponent.prototype.addSkill = function () {
        this.skills.push(new forms_1.FormControl());
    };
    StudentEditComponent.prototype.getStudent = function (id) {
        var _this = this;
        this.studentService.getStudent(id)
            .subscribe(function (student) { return _this.onStudentRetrieved(student); }, function (error) { return _this.errorMessage = error; });
    };
    StudentEditComponent.prototype.onStudentRetrieved = function (student) {
        if (this.studentForm) {
            this.studentForm.reset();
        }
        this.student = student;
        if (this.student.id === 0) {
            this.pageTitle = 'Add Student';
        }
        else {
            this.pageTitle = "Edit Student: " + this.student.firstName;
        }
        // Update the data on the form
        this.studentForm.patchValue({
            firstName: this.student.firstName,
            lastName: this.student.lastName,
            email: this.student.email,
            mobile: this.student.mobile,
            gender: this.student.gender
        });
        this.studentForm.setControl('skills', this.fb.array(this.student.skills || []));
    };
    StudentEditComponent.prototype.deleteStudent = function () {
        var _this = this;
        if (this.student.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        }
        else {
            if (confirm("Are you sure: Delete the student: " + this.student.firstName + "?")) {
                this.studentService.deleteStudent(this.student.id)
                    .subscribe(function () { return _this.onSaveComplete(); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    StudentEditComponent.prototype.saveStudent = function () {
        var _this = this;
        if (this.studentForm.dirty && this.studentForm.valid) {
            // Copy the form values over the student object values
            var p = Object.assign({}, this.student, this.studentForm.value);
            this.studentService.saveStudent(p)
                .subscribe(function () { return _this.onSaveComplete(); }, function (error) { return _this.errorMessage = error; });
        }
        else if (!this.studentForm.dirty) {
            this.onSaveComplete();
        }
    };
    StudentEditComponent.prototype.onSaveComplete = function () {
        // Reset the form to clear the flags
        this.studentForm.reset();
        this.router.navigate(['/students']);
    };
    __decorate([
        core_1.ViewChildren(forms_1.FormControlName, { read: core_1.ElementRef }), 
        __metadata('design:type', Array)
    ], StudentEditComponent.prototype, "formInputElements", void 0);
    StudentEditComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/students/student-edit.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, student_service_1.StudentService])
    ], StudentEditComponent);
    return StudentEditComponent;
}());
exports.StudentEditComponent = StudentEditComponent;
//# sourceMappingURL=student-edit.component.js.map