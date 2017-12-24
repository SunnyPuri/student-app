import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IStudent } from './student';

export class StudentData implements InMemoryDbService {

    createDb() {
        let students: IStudent[] = [
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
        return { students };
    }
}
