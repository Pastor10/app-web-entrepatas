import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService, LazyLoadEvent} from 'primeng/api';
import {Store} from '@ngxs/store';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { ProfileService } from 'src/app/shared/service/profile.service';



@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
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
export class ProfilesComponent implements OnInit {

    totalRecords: number;
    perPage = 10;
    cols: any[];
    loading: boolean;
    tokenGenerated: any;
    visibleTokenGenerado = false;
    public listProfile = [];



    constructor(private route: ActivatedRoute,
                private router: Router,
                private loginService: AuthService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private store: Store, 
                public profileService: ProfileService) {
    }

    ngOnInit() {
        this.loadProfiles();
        this.cols = [
            {field: 'nombre', header: 'nombre'},
            {field: 'roles', header: 'Roles'}
        ];
        this.loading = true;

    }

    get modeRoot() {
        return this.route.snapshot.data.modeRoot;
    }



    public loadProfiles(){
        this.profileService.getAll().subscribe(
          data => {
           let profiles = <Perfil[]>data;
            for(let i =0; i <  profiles.length;i++){
             let  roles = "";
             let rolesJson = profiles[i].roles;
             for(let x = 0; x < rolesJson.length; x++){
               let roleName = rolesJson[x].name.toLowerCase();
              roles +=  roleName.substring(0, 1).toUpperCase() +
             roleName.substring(1) + " , ";
             }
             roles = roles.replace(/,\s*$/, "");
            // roles +=".";
             let profile = {
              id: profiles[i].idPerfil,
              nombre: profiles[i].nombre,
              roles: roles
             };

             this.listProfile.push(profile);
            }
          //  console.log(this .listProfile);
          },
          error => {
            const errorMessage =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
          }
        );
      }

      linkUpdate(id){
        return `main/perfiles/editar/${id}`;
      }
}
