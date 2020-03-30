import {Component, OnInit, ɵConsole, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService, LazyLoadEvent} from 'primeng/api';
import {Store} from '@ngxs/store';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { RoleService } from 'src/app/shared/service/role.service';
import { Role } from 'src/app/shared/model/role.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Table } from 'primeng/table';



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
    perfil: string;
    idPerfil: number;

    public roles = [];
    public listRole: Role[];

    public listaRoles = [];
    modelForm: FormGroup;
    ROLE_REPORTE: number;
    ROLE_REPORTE_NO_COBERTURADO: number;
    ROLE_PERFIL: number;
    ROLE_USER: number;
    public form: FormGroup;
    lastLazyLoadEvent: LazyLoadEvent;
    public data: Perfil;
    public saveProfile = true;
    public edit = false;

    @ViewChild('dt', {static: true}) public tabla: Table;


    constructor(private route: ActivatedRoute,
                private messageService: MessageService,
                public profileService: ProfileService, public fb: FormBuilder,
                public roleService: RoleService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        //this.loadProfiles();
        this.cols = [
            {field: 'nombre', header: 'Perfil'},
            {field: 'roles', header: 'Roles'}
        ];
        this.loading = true;
        //this.builderForm();
        //this.loadRoles();

    }

    builderForm() {

        this.modelForm = this.fb.group({
            perfil: ['', [Validators.required]],

        });
    }

    get modeRoot() {
        return this.route.snapshot.data.modeRoot;
    }



    public loadProfiles() {
      this.listProfile = [];
      this.profileService.getAll().subscribe(
          data => {
            let profiles = <Perfil[]>data;
            for (let i =0; i <  profiles.length;i++) {
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
              idPerfil: profiles[i].idPerfil,
              nombre: profiles[i].nombre,
              activo: profiles[i].activo,
              roles: roles
             };

             this.listProfile.push(profile);
            }
            
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

      doAction(data, accion) {
        if (accion =='delete') {
            data.enabled = !data.enabled;
            data.activo = !data.activo;
            let message;
            if (data.activo) {
                message = 'perfil eliminado correctamente.';
            } else {
                message = 'perfil eliminado correctamente.';
            }
           // this.updatePerfil(data, message);
            this.deletePerfil(data, message);


        } else {
            this.getPerfilId(data);
            
        }

    }

    getPerfilId(perfil) {
        this.ROLE_USER = 0;
        this.ROLE_PERFIL = 0;
        this.ROLE_REPORTE = 0;
        this.ROLE_REPORTE_NO_COBERTURADO = 0;
        this.profileService.getFindId(perfil.idPerfil).subscribe(
            (data: Perfil) => {
                this.perfil = data.nombre;
                this.roles = data.roles;
                this.idPerfil = data.idPerfil;

                this.roles.forEach( item => {

                    if (item.name === 'ROLE_USER') {
                        this.ROLE_USER = item.id;
                    } else if (item.name === 'ROLE_PERFIL') {
                        this.ROLE_PERFIL = item.id;
                    } else if (item.name === 'ROLE_REPORTE') {
                        this.ROLE_REPORTE = item.id;
                    }else if (item.name === 'ROLE_REPORTE_NO_COBERTURADO') {
                      this.ROLE_REPORTE_NO_COBERTURADO = item.id;
                  }
                });
            },
            error => {

            const errorMessage =
                error.message != undefined
                  ? error.message
                  : 'No se pudo procesar la petición';
            this.showMsg('error', error.message, 'Perfil');
            }
          );
    }


    public deletePerfil(data, message): void {

      this.profileService.delete(data.idPerfil).subscribe(
        data => {
          this.showMsg('success', message, 'Perfil');
          this.loadProfiles();
        },
        error => {
          const errorMessage =
            error.message != undefined
              ? error.message
              : 'No se pudo procesar la petición';
          this.showMsg('error',  errorMessage, 'Perfil');

        }
      );
    }

    public showConfirmDelete(id: number) {
      // this.id = id;
      // this.confirmDelete.show();
    }

    showConshowConfirmDeletefirm(data) {
      this.messageService.clear();
      this.data = data;
      this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?'});
  }

  onConfirm(data) {
    this.deletePerfil(data, 'Perfil eliminado correctamente');
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  } 

    

    updatePerfil(data, message) {
      this.profileService.getFindId(data.idPerfil).subscribe(
        (datax: Perfil) => {
          this.listRole = datax.roles;
          data.roles =  this.listRole;

          this.profileService.save(data).subscribe(
            item => {
              this.showMsg('success', message, 'Perfil');
              this.loadProfiles();
              //this.refreshTable();
            },
            error => {
              const errorMessage =
                error.message != undefined
                  ? error.message
                  : 'No se pudo procesar la petición';
              this.showMsg('error', errorMessage, 'Perfil');
            }
           );

        },
        
      );
    }


    limpiarData() {
      this.perfil = '';
      this.idPerfil = undefined;
      this.ROLE_USER = 0;
      this.ROLE_PERFIL = 0;
      this.ROLE_REPORTE = 0;
      this.ROLE_REPORTE_NO_COBERTURADO = 0;
      this.saveProfile = true;
    }

    showMsg( type: string, msg: string, title: string = 'Perfil') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }

      public save(): void {
        let perfil = new Perfil();
        const rolesToSaved: Role[] = [];

        if(this.perfil=='' || this.perfil== undefined){
          this.showMsg('warn', 'Escriba un perfil', 'Perfil');
          return;
        }

        if (this.idPerfil != undefined) {
          perfil.idPerfil = this.idPerfil;
          this.edit = true;
        } else {
          perfil.idPerfil = undefined;
          this.edit = false;
        }

        perfil.nombre = this.perfil;
        perfil.activo = true;

        if (this.ROLE_PERFIL != 0 ) {
            const role = new Role();
            role.id = 2;
            role.name = 'ROLE_PERFIL';
            rolesToSaved.push(role);

        } 
        if (this.ROLE_USER != 0  ) {
            const role = new Role();
            role.id = 1;
            role.name = 'ROLE_USER';
            rolesToSaved.push(role);

        } 
        if (this.ROLE_REPORTE != 0  ) {
            const role = new Role();
            role.id = 3;
            role.name = 'ROLE_REPORTE';
            rolesToSaved.push(role);

        }
        if (this.ROLE_REPORTE_NO_COBERTURADO != 0  ) {
          const role = new Role();
          role.id = 4;
          role.name = 'ROLE_REPORTE_NO_COBERTURADO';
          rolesToSaved.push(role);

      }
        perfil.roles = rolesToSaved;


        this.listProfile.forEach(item => {
          if (item.nombre.toUpperCase() === this.perfil.toUpperCase() && !this.edit) {
            this.saveProfile = false;
          }
        });
        
        if (this.saveProfile) {
          this.profileService.save(perfil).subscribe(
            data => {
              this.showMsg('success', 'Se guardó correctamente', 'Perfil');
              this.refreshTable();

            },
            error => {
              const errorMessage =
                error.message != undefined
                  ? error.message
                  : 'No se pudo procesar la petición';
              this.showMsg('danger', errorMessage);
            }
           );
        } else {
          this.showMsg('warn', 'Peril ya existe', 'Perfil');
          this.saveProfile = true;
        }
        this.limpiarData();
        
      }

      refreshTable() {
        this.tabla.reset();
        if (this.lastLazyLoadEvent) {
            this.loadLazy(this.lastLazyLoadEvent);
        }
    }

    loadLazy(event: LazyLoadEvent) {
      this.loadProfiles();
    }

      public loadRoles() {
        this.roleService.getAll().subscribe(
          data => {
            this.listRole = <Role[]>data;
            const tam = this.listRole.length;
            let i = 0;
            this.listRole.forEach(rol => {
              let description = rol.name.replace('ROLE_', '');
              while (description.indexOf('_') != -1) {
                description = description.replace('_', ' ');
              }
              this.roles[i++] = {
                name: rol.name,
                description: description,
                status: false
              };
            });
            
            this.builRoles();
          },
          error => {
            this.listRole = [];
            const errorMessage: string =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
            this.showMsg('danger', errorMessage);
          }
        );
      }

      builRoles() {
        const controls = this.roles.map(c => new FormControl(false));        
        controls[0].setValue(true);
        this.form = this.formBuilder.group({
          roles: new FormArray(controls, this.minSelectedCheckboxes(1))
        });

      }

      public minSelectedCheckboxes(min = 1) {
        const validator: ValidatorFn = (formArray: FormArray) => {
          const totalSelected = formArray.controls
            .map(control => control.value)
            .reduce((prev, next) => (next ? prev + next : prev), 0);
    
          return totalSelected >= min ? null : { required: true };
        };
    
        return validator;
      }


      public rolesSelected(): boolean {
        let one = false;
        this.roles.forEach(o => {
          if (o.status) {
            one = true;
          }
        });
        return one;
      }
}
