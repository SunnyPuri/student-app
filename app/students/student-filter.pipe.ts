import {  PipeTransform, Pipe } from '@angular/core';
import { IStudent } from './student';

@Pipe({
    name: 'studentFilter'
})
export class StudentFilterPipe implements PipeTransform {

    transform(value: IStudent[], filterBy: string): IStudent[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((student: IStudent) =>
            student.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}

