import { Component, OnInit }  from '@angular/core';

import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
    templateUrl: 'app/students/student-list.component.html',
    styleUrls: ['app/students/student-list.component.css']
})
export class StudentListComponent implements OnInit {
    pageTitle: string = 'Student List';
    listFilter: string;
    errorMessage: string;

    students: IStudent[];

    constructor(private studentService: StudentService) {

    }


    ngOnInit(): void {
        this.studentService.getStudents()
                .subscribe(students => this.students = students,
                           error => this.errorMessage = <any>error);
    }

}
