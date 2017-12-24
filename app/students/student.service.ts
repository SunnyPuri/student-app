import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IStudent } from './student';

@Injectable()
export class StudentService {
    private baseUrl = 'api/students';

    constructor(private http: Http) { }

    getStudents(): Observable<IStudent[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getStudents: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getStudent(id: number): Observable<IStudent> {
        if (id === 0) {
        return Observable.of(this.initializeStudent());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getStudent: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteStudent(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteStudent: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveStudent(student: IStudent): Observable<IStudent> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (student.id === 0) {
            return this.createStudent(student, options);
        }
        return this.updateStudent(student, options);
    }

    private createStudent(student: IStudent, options: RequestOptions): Observable<IStudent> {
        student.id = undefined;
        return this.http.post(this.baseUrl, student, options)
            .map(this.extractData)
            .do(data => console.log('createStudent: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateStudent(student: IStudent, options: RequestOptions): Observable<IStudent> {
        const url = `${this.baseUrl}/${student.id}`;
        return this.http.put(url, student, options)
            .map(() => student)
            .do(data => console.log('updateStudent: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeStudent(): IStudent {
        // Return an initialized object
        return {
            id: 0,
            firstName: null,
            lastName: null,
            gender: null,
            mobile: null,
            email: null,
            skills: ['']
        };
    }
}
