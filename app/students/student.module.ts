import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StudentData }  from './student-data';

import { StudentService } from './student.service';


import { StudentListComponent } from './student-list.component';
import { StudentDetailComponent } from './student-detail.component';
import { StudentDetailGuard, StudentEditGuard } from './student-guard.service';
import { StudentEditComponent } from './student-edit.component';

import { StudentFilterPipe } from './student-filter.pipe';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(StudentData),
    RouterModule.forChild([
      { path: 'students', component: StudentListComponent },
      { path: 'student/:id',
        canActivate: [ StudentDetailGuard ],
        component: StudentDetailComponent
      },
      { path: 'studentEdit/:id',
        canDeactivate: [ StudentEditGuard ],
        component: StudentEditComponent},
    ])
  ],
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentEditComponent,
    StudentFilterPipe
  ],
  providers: [
    StudentService,
    StudentDetailGuard,
    StudentEditGuard
  ]
})
export class StudentModule {}
