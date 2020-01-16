import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService, LazyLoadEvent} from 'primeng/api';
import {Store} from '@ngxs/store';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Perfil } from 'src/app/shared/model/perfil.model';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: [`
        /* Column Priorities */
        @media only all {
            th.ui-p-6,
            td.ui-p-6,
            th.ui-p-5,
            td.ui-p-5,
            th.ui-p-4,
            td.ui-p-4,
            th.ui-p-3,
            td.ui-p-3,
            th.ui-p-2,
            td.ui-p-2,
            th.ui-p-1,
            td.ui-p-1 {
                display: none;
            }
        }

        /* Show priority 1 at 320px (20em x 16px) */
        @media screen and (min-width: 20em) {
            th.ui-p-1,
            td.ui-p-1 {
                display: table-cell;
            }
        }

        /* Show priority 2 at 480px (30em x 16px) */
        @media screen and (min-width: 30em) {
            th.ui-p-2,
            td.ui-p-2 {
                display: table-cell;
            }
        }

        /* Show priority 3 at 640px (40em x 16px) */
        @media screen and (min-width: 40em) {
            th.ui-p-3,
            td.ui-p-3 {
                display: table-cell;
            }
        }

        /* Show priority 4 at 800px (50em x 16px) */
        @media screen and (min-width: 50em) {
            th.ui-p-4,
            td.ui-p-4 {
                display: table-cell;
            }
        }

        /* Show priority 5 at 960px (60em x 16px) */
        @media screen and (min-width: 60em) {
            th.ui-p-5,
            td.ui-p-5 {
                display: table-cell;
            }
        }

        /* Show priority 6 at 1,120px (70em x 16px) */
        @media screen and (min-width: 70em) {
            th.ui-p-6,
            td.ui-p-6 {
                display: table-cell;
            }
        }
    `]
})
export class UsuariosComponent implements OnInit {

    totalRecords: number;
    perPage = 10;
    cols: any[];
    loading: boolean;
    tokenGenerated: any;
    visibleTokenGenerado = false;
    public listPerfil: Perfil[];
    


    constructor(private route: ActivatedRoute,
                private router: Router,
                private loginService: AuthService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private store: Store, public usuarioService: UsuarioService) {
    }

    ngOnInit() {
        this.loadUsers();
        this.cols = [
            {field: 'nombres', header: 'Nombres'},
            {field: 'apellidos', header: 'Apellidos'},
            {field: 'dni', header: 'DNI'},
            {field: 'email', header: 'Email'},
            {field: 'username', header: 'Nombre de usuario'},
            {field: 'cargo', header: 'Cargo'},
            {header: 'Acciones', isActions: true}
        ];
        this.loading = true;

    }

    get modeRoot() {
        return this.route.snapshot.data.modeRoot;
    }


    focusInputToken(inputElement: HTMLInputElement) {
        inputElement.select();
        document.execCommand('copy');
    }

    newUser() {
        // this.router.navigateByUrl(`/main/usuarios/nuevo`);
        this.router.navigate(['/main/usuarios/nuevo']);
    }


    public loadUsers(){
        this.usuarioService.getAll().subscribe(
          data => {
            this.listPerfil = <Perfil[]>data;
          },
          error => {
            this.listPerfil = [];
            const errorMessage =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
            //this.alertService.danger(errorMessage);
          }
        );
      }

}
