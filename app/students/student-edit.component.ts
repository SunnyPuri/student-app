import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IStudent } from './student';
import { StudentService } from './student.service';

import { GenericValidator } from '../shared/generic-validator';



@Component({
    templateUrl: 'app/students/student-edit.component.html'
})
export class StudentEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Student Edit';
    errorMessage: string;
    studentForm: FormGroup;
    emailMessage: string;

    student: IStudent;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    get skills(): FormArray {
        return <FormArray>this.studentForm.get('skills');
    }

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private studentService: StudentService) {

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
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.studentForm = this.fb.group({
            firstName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            lastName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            email: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
            mobile: ['',Validators.required],
            gender: ['', Validators.required],
            skills: this.fb.array([])
        });

        // Read the student Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getStudent(id);
            }
        );

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.studentForm.valueChanges, ...controlBlurs).debounceTime(600).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.studentForm);
        });
    }

    addSkill(): void {
        this.skills.push(new FormControl());
    }

    getStudent(id: number): void {
        this.studentService.getStudent(id)
            .subscribe(
                (student: IStudent) => this.onStudentRetrieved(student),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onStudentRetrieved(student: IStudent): void {
        if (this.studentForm) {
            this.studentForm.reset();
        }
        this.student = student;

        if (this.student.id === 0) {
            this.pageTitle = 'Add Student';
        } else {
            this.pageTitle = `Edit Student: ${this.student.firstName}`;
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
    }

    deleteStudent(): void {
        if (this.student.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Are you sure: Delete the student: ${this.student.firstName}?`)) {
                this.studentService.deleteStudent(this.student.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveStudent(): void {
        if (this.studentForm.dirty && this.studentForm.valid) {
            // Copy the form values over the student object values
            let p = Object.assign({}, this.student, this.studentForm.value);

            this.studentService.saveStudent(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.studentForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.studentForm.reset();
        this.router.navigate(['/students']);
    }
}
