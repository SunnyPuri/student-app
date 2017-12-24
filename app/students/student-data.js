"use strict";
var StudentData = (function () {
    function StudentData() {
    }
    StudentData.prototype.createDb = function () {
        var students = [
            {
                'id': 1,
                'firstName': 'Sunny',
                'lastName': 'Puri',
                'gender': 'Male',
                'mobile': 9696822525,
                'email': 'sunnypuri2002@gmail.com',
                'skills': ['Angular 2', 'HTML5']
            },
            {
                'id': 2,
                'firstName': 'Khushboo',
                'lastName': 'Singh',
                'gender': 'Female',
                'mobile': 9999999999,
                'email': 'xyz@gmail.com',
                'skills': ['AngularJS']
            },
            {
                'id': 3,
                'firstName': 'Harsh',
                'lastName': 'Shukla',
                'gender': 'Male',
                'mobile': 8888888888,
                'email': 'abc@gmail.com',
                'skills': ['CSS3']
            }
        ];
        return { students: students };
    };
    return StudentData;
}());
exports.StudentData = StudentData;
//# sourceMappingURL=student-data.js.map