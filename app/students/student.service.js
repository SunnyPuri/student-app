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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var StudentService = (function () {
    function StudentService(http) {
        this.http = http;
        this.baseUrl = 'api/students';
    }
    StudentService.prototype.getStudents = function () {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(function (data) { return console.log('getStudents: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    StudentService.prototype.getStudent = function (id) {
        if (id === 0) {
            return Observable_1.Observable.of(this.initializeStudent());
        }
        ;
        var url = this.baseUrl + "/" + id;
        return this.http.get(url)
            .map(this.extractData)
            .do(function (data) { return console.log('getStudent: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    StudentService.prototype.deleteStudent = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.baseUrl + "/" + id;
        return this.http.delete(url, options)
            .do(function (data) { return console.log('deleteStudent: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    StudentService.prototype.saveStudent = function (student) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        if (student.id === 0) {
            return this.createStudent(student, options);
        }
        return this.updateStudent(student, options);
    };
    StudentService.prototype.createStudent = function (student, options) {
        student.id = undefined;
        return this.http.post(this.baseUrl, student, options)
            .map(this.extractData)
            .do(function (data) { return console.log('createStudent: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    StudentService.prototype.updateStudent = function (student, options) {
        var url = this.baseUrl + "/" + student.id;
        return this.http.put(url, student, options)
            .map(function () { return student; })
            .do(function (data) { return console.log('updateStudent: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    StudentService.prototype.extractData = function (response) {
        var body = response.json();
        return body.data || {};
    };
    StudentService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    StudentService.prototype.initializeStudent = function () {
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
    };
    StudentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], StudentService);
    return StudentService;
}());
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map