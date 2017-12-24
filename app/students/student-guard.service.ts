import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { StudentEditComponent } from './student-edit.component';

@Injectable()
export  class StudentDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid student Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/students']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export  class StudentEditGuard implements CanDeactivate<StudentEditComponent> {

    canDeactivate(component: StudentEditComponent): boolean {
        if (component.studentForm.dirty) {
            let firstName = component.studentForm.get('firstName').value || 'New Student';
            return confirm(`Navigate away and lose all changes to ${firstName}?`);
        }
        return true;
    }
}
