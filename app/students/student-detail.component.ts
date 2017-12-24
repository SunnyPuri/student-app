import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
    templateUrl: 'app/students/student-detail.component.html'
})
export class StudentDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Student Detail';
    student: IStudent;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private studentService: StudentService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getStudent(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getStudent(id: number) {
        this.studentService.getStudent(id).subscribe(
            student => this.student = student,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/students']);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Student Detail: ' + message;
    }
}
