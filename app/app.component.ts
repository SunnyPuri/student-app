import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Student App';
    sideBar: boolean = true;

    toggleSideBar(){
        this.sideBar=!this.sideBar;
    }

}
