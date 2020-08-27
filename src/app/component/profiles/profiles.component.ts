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
import { RoleName } from 'src/app/enums/role';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss'],
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
    ROLE_PUBLICACION_REGISTRO: number;
    ROLE_PUBLICACION_LISTADO: number;
    ROLE_PUBLICACION_HISTORIAL_CLINICO: number;
    ROLE_PUBLICACION_APROBACION: number;
    ROLE_ADOPCION_POSTULANTE_LISTADO: number;
    ROLE_ADOPCION_GENERAR: number;
    ROLE_ADOPCION_LISTADO: number;
    ROLE_ADOPCION_DEVOLUCION: number;
    ROLE_EVENTO_GENERA: number;
    ROLE_EVENTO_LISTADO: number;
    ROLE_EVENTO_TIPO: number;
    ROLE_COLABORA_REFUGIO: number;
    ROLE_LOCAL_CREA: number;
    ROLE_LOCAL_TIPO: number;
    ROLE_VETERINARIA: number;
    ROLE_VETERINARIO: number;
    ROLE_ANIMAL_RAZA: number;
    ROLE_ANIMAL_TAMANO: number;
    ROLE_ANIMAL_TIPO: number;
    ROLE_POSTULANTE_COLABORADOR: number;
    public role: RoleName;
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
        this.limpiarData();
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
              id: profiles[i].id,
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
      console.log('perfil', perfil);
      
        this.ROLE_USER = 0;
        this.ROLE_PERFIL = 0;
        this.ROLE_REPORTE = 0;
        this.ROLE_REPORTE_NO_COBERTURADO = 0;
        this.ROLE_PUBLICACION_REGISTRO= 0;
        this.ROLE_PUBLICACION_LISTADO= 0;
        this.ROLE_PUBLICACION_HISTORIAL_CLINICO= 0;
        this.ROLE_PUBLICACION_APROBACION= 0;
        this.ROLE_ADOPCION_POSTULANTE_LISTADO= 0;
        this.ROLE_ADOPCION_GENERAR= 0;
        this.ROLE_ADOPCION_LISTADO= 0;
        this.ROLE_ADOPCION_DEVOLUCION= 0;
        this.ROLE_EVENTO_GENERA= 0;
        this.ROLE_EVENTO_LISTADO= 0;
        this.ROLE_EVENTO_TIPO= 0;
        this.ROLE_COLABORA_REFUGIO= 0;
        this.ROLE_LOCAL_CREA= 0;
        this.ROLE_LOCAL_TIPO= 0;
        this.ROLE_VETERINARIA= 0;
        this.ROLE_VETERINARIO= 0;
        this.ROLE_ANIMAL_RAZA= 0;
        this.ROLE_ANIMAL_TAMANO= 0;
        this.ROLE_ANIMAL_TIPO= 0;
        this.ROLE_POSTULANTE_COLABORADOR=0;
        this.profileService.getFindId(perfil.id).subscribe(
            (data: Perfil) => {
                this.perfil = data.nombre;
                this.roles = data.roles;
                this.idPerfil = data.id;

                this.roles.forEach( item => {

                    if (item.name === 'ROLE_USER') {
                        this.ROLE_USER = item.id;
                    } else if (item.name === 'ROLE_PERFIL') {
                        this.ROLE_PERFIL = item.id;
                    }else if (item.name === 'ROLE_ADOPCION_GENERAR') {
                      this.ROLE_ADOPCION_GENERAR = item.id;
                    }else if (item.name === 'ROLE_ADOPCION_POSTULANTE_LISTADO') {
                      this.ROLE_ADOPCION_POSTULANTE_LISTADO = item.id;
                    }else if (item.name === 'ROLE_ADOPCION_LISTADO') {
                      this.ROLE_ADOPCION_LISTADO = item.id;
                    }else if (item.name === 'ROLE_ADOPCION_DEVOLUCION') {
                      this.ROLE_ADOPCION_DEVOLUCION = item.id;
                    }else if (item.name === 'ROLE_PUBLICACION_APROBACION') {
                      this.ROLE_PUBLICACION_APROBACION = item.id;
                    }else if (item.name === 'ROLE_PUBLICACION_HISTORIAL_CLINICO') {
                      this.ROLE_PUBLICACION_HISTORIAL_CLINICO = item.id;
                    }else if (item.name === 'ROLE_PUBLICACION_LISTADO') {
                      this.ROLE_PUBLICACION_LISTADO = item.id;
                    }else if (item.name === 'ROLE_PUBLICACION_REGISTRO') {
                      this.ROLE_PUBLICACION_REGISTRO = item.id;
                    }else if (item.name === 'ROLE_EVENTO_GENERA') {
                      this.ROLE_EVENTO_GENERA = item.id;
                    }else if (item.name === 'ROLE_EVENTO_LISTADO') {
                      this.ROLE_EVENTO_LISTADO = item.id;
                    }else if (item.name === 'ROLE_EVENTO_TIPO') {
                      this.ROLE_EVENTO_TIPO = item.id;
                    }else if (item.name === 'ROLE_COLABORA_REFUGIO') {
                      this.ROLE_COLABORA_REFUGIO = item.id;
                    }else if (item.name === 'ROLE_LOCAL_CREA') {
                      this.ROLE_LOCAL_CREA = item.id;
                    }else if (item.name === 'ROLE_LOCAL_TIPO') {
                      this.ROLE_LOCAL_TIPO = item.id;
                    }else if (item.name === 'ROLE_VETERINARIA') {
                      this.ROLE_VETERINARIA = item.id;
                    }else if (item.name === 'ROLE_VETERINARIO') {
                      this.ROLE_VETERINARIO = item.id;
                    }else if (item.name === 'ROLE_ANIMAL_RAZA') {
                      this.ROLE_ANIMAL_RAZA = item.id;
                    }else if (item.name === 'ROLE_ANIMAL_TAMANO') {
                      this.ROLE_ANIMAL_TAMANO = item.id;
                    }else if (item.name === 'ROLE_ANIMAL_TIPO') {
                      this.ROLE_ANIMAL_TIPO = item.id;
                    }else if (item.name === 'ROLE_POSTULANTE_COLABORADOR') {
                      this.ROLE_POSTULANTE_COLABORADOR = item.id;
                    }else if (item.name === 'ROLE_REPORTE') {
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

      this.profileService.delete(data.id).subscribe(
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
      this.ROLE_PUBLICACION_REGISTRO= 0;
      this.ROLE_PUBLICACION_LISTADO= 0;
      this.ROLE_PUBLICACION_HISTORIAL_CLINICO= 0;
      this.ROLE_PUBLICACION_APROBACION= 0;
      this.ROLE_ADOPCION_POSTULANTE_LISTADO= 0;
      this.ROLE_ADOPCION_GENERAR= 0;
      this.ROLE_ADOPCION_LISTADO= 0;
      this.ROLE_ADOPCION_DEVOLUCION= 0;
      this.ROLE_EVENTO_GENERA= 0;
      this.ROLE_EVENTO_LISTADO= 0;
      this.ROLE_EVENTO_TIPO= 0;
      this.ROLE_COLABORA_REFUGIO= 0;
      this.ROLE_LOCAL_CREA= 0;
      this.ROLE_LOCAL_TIPO= 0;
      this.ROLE_VETERINARIA= 0;
      this.ROLE_VETERINARIO= 0;
      this.ROLE_ANIMAL_RAZA= 0;
      this.ROLE_ANIMAL_TAMANO= 0;
      this.ROLE_ANIMAL_TIPO= 0;
      this.ROLE_POSTULANTE_COLABORADOR=0;
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
          perfil.id = this.idPerfil;
          this.edit = true;
        } else {
          perfil.id = undefined;
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
        if (this.ROLE_PUBLICACION_REGISTRO != 0  ) {
          const role = new Role();
          role.id = 5;
          role.name = 'ROLE_PUBLICACION_REGISTRO';
          rolesToSaved.push(role);

        }
        if (this.ROLE_PUBLICACION_LISTADO != 0  ) {
          const role = new Role();
          role.id = 6;
          role.name = 'ROLE_PUBLICACION_LISTADO';
          rolesToSaved.push(role);

        }
        if (this.ROLE_PUBLICACION_HISTORIAL_CLINICO != 0  ) {
          const role = new Role();
          role.id = 7;
          role.name = 'ROLE_PUBLICACION_HISTORIAL_CLINICO';
          rolesToSaved.push(role);

        }
        if (this.ROLE_PUBLICACION_APROBACION != 0  ) {
          const role = new Role();
          role.id = 8;
          role.name = 'ROLE_PUBLICACION_APROBACION';
          rolesToSaved.push(role);

        }
        if (this.ROLE_ADOPCION_POSTULANTE_LISTADO != 0  ) {
          const role = new Role();
          role.id = 9;
          role.name = 'ROLE_ADOPCION_POSTULANTE_LISTADO';
          rolesToSaved.push(role);

        }
        if (this.ROLE_ADOPCION_GENERAR != 0  ) {
          const role = new Role();
          role.id = 10;
          role.name = 'ROLE_ADOPCION_GENERAR';
          rolesToSaved.push(role);

        }
        if (this.ROLE_ADOPCION_LISTADO != 0  ) {
          const role = new Role();
          role.id = 11;
          role.name = 'ROLE_ADOPCION_LISTADO';
          rolesToSaved.push(role);

        }
        if (this.ROLE_ADOPCION_DEVOLUCION != 0  ) {
          const role = new Role();
          role.id = 12;
          role.name = 'ROLE_ADOPCION_DEVOLUCION';
          rolesToSaved.push(role);

        }
        if (this.ROLE_EVENTO_GENERA != 0  ) {
          const role = new Role();
          role.id = 13;
          role.name = 'ROLE_EVENTO_GENERA';
          rolesToSaved.push(role);

        }
        if (this.ROLE_EVENTO_LISTADO != 0  ) {
          const role = new Role();
          role.id = 14;
          role.name = 'ROLE_EVENTO_LISTADO';
          rolesToSaved.push(role);

        }
        if (this.ROLE_EVENTO_TIPO != 0  ) {
          const role = new Role();
          role.id = 15;
          role.name = 'ROLE_EVENTO_TIPO';
          rolesToSaved.push(role);

        }
        if (this.ROLE_COLABORA_REFUGIO != 0  ) {
          const role = new Role();
          role.id = 16;
          role.name = 'ROLE_COLABORA_REFUGIO';
          rolesToSaved.push(role);

        }
        if (this.ROLE_LOCAL_CREA != 0  ) {
          const role = new Role();
          role.id = 17;
          role.name = 'ROLE_LOCAL_CREA';
          rolesToSaved.push(role);

        }
        if (this.ROLE_LOCAL_TIPO != 0  ) {
          const role = new Role();
          role.id = 18;
          role.name = 'ROLE_LOCAL_TIPO';
          rolesToSaved.push(role);

        }
        if (this.ROLE_VETERINARIA != 0  ) {
          const role = new Role();
          role.id = 19;
          role.name = 'ROLE_VETERINARIA';
          rolesToSaved.push(role);

        }
        if (this.ROLE_VETERINARIO != 0  ) {
          const role = new Role();
          role.id = 20;
          role.name = 'ROLE_VETERINARIO';
          rolesToSaved.push(role);

        }

        if (this.ROLE_ANIMAL_RAZA != 0  ) {
          const role = new Role();
          role.id = 21;
          role.name = 'ROLE_ANIMAL_RAZA';
          rolesToSaved.push(role);

        }

        if (this.ROLE_ANIMAL_TAMANO != 0  ) {
          const role = new Role();
          role.id = 22;
          role.name = 'ROLE_ANIMAL_TAMANO';
          rolesToSaved.push(role);

        }

        if (this.ROLE_ANIMAL_TIPO != 0  ) {
          const role = new Role();
          role.id = 23;
          role.name = 'ROLE_ANIMAL_TIPO';
          rolesToSaved.push(role);

        }

        if (this.ROLE_POSTULANTE_COLABORADOR != 0  ) {
          const role = new Role();
          role.id = 24;
          role.name = 'ROLE_POSTULANTE_COLABORADOR';
          rolesToSaved.push(role);

        }

        if(rolesToSaved.length==0){
          this.showMsg('info', 'Seleccione al menos un rol', 'Perfil');
          return;
        }

        perfil.roles = rolesToSaved;

        
        console.log(perfil.roles);
        

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
