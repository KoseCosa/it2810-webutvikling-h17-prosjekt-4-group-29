import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'app-my-page',
    templateUrl: './my-page.component.html',
    styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
    users: Array<any>;

    constructor(private _dataService: DataService) { }

    ngOnInit() {
        this._dataService.getUsers().subscribe(res => {
            this.users = res.user;
        });

    }

}
