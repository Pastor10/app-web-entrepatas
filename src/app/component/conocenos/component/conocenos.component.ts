import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/model/User.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';


@Component({
    selector: 'app-conocenos',
    styleUrls: ['./conocenos.component.scss'],
    templateUrl: './conocenos.component.html'

})

export class ConocenosComponent implements OnInit {

    users: User[];
    responsiveOptions;

    constructor(public userService: UsuarioService) {
        this.users = [];
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];

    }

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
        this.userService.getAllIntegrantes().subscribe((data: User[]) => {
            this.users = data;

        });
    }

}