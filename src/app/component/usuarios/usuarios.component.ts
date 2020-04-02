import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService, LazyLoadEvent} from 'primeng/api';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { User } from 'src/app/shared/model/User.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { Table } from 'primeng/table';


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

    totalRecords: 10;
    perPage = 10;
    cols: any[];
    loading: boolean;
    tokenGenerated: any;
    modelForm: FormGroup;
    visibleTokenGenerado = false;
    public listaUsuarios: User[];
    public listFilterUser: User[];
    public listaPerfil: Perfil[];
    public listaUsuariosApp: User[];
    model = new User();
    emailSelected: User;
    perfilSelected = new Perfil();
    estadoSelected: boolean=true;
    nombre: string;
    tipo: string;
    id: number;
    lastLazyLoadEvent: LazyLoadEvent;
    public listFilterPerfil: Perfil [];
    public data: User;

    @ViewChild('dt', {static: true}) public tabla: Table;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private messageService: MessageService, public fb: FormBuilder,
                public perfilService: ProfileService, public usuarioService: UsuarioService) {
    }

    ngOnInit() {
        this.listarUsuariosAplicacion();

        this.cols = [
            {field: 'fullname', header: 'Nombres y Apellidos', width: '180px'},
            {field: 'email', header: 'Email', width: '250px'},
            {field: 'profile', header: 'Perfil', width: '100px'},
        ];
        this.getUsers();
        this.listarPerfiles();
        this.loading = true;
        this.builderForm();


    }

    public filterListEmail(event) {
        let query = event.query
        this.listFilterUser = this.filterListUserEmail(query, this.listaUsuarios);

      }

      public filterListPerfil(event) {
        let query = event.query
        this.listFilterPerfil = this.filterListPerfilName(query, this.listaPerfil);

      }


      filterListUserEmail(query, driverTypeList: User[] ): User[]  {
        let filtered : User[] = [];
        for(let i = 0; i < driverTypeList.length; i++) {
            let driverType = driverTypeList[i];
            if(driverType.email.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(driverType);
            }
        }
        return filtered;
      }

      filterListPerfilName(query, driverTypeList: Perfil[] ): Perfil[]  {
        let filtered : Perfil[] = [];
        for(let i = 0; i < driverTypeList.length; i++) {
            let driverType = driverTypeList[i];
            if(driverType.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(driverType);
            }
        }
        return filtered;
      }

    builderForm() {

        this.modelForm = this.fb.group({
            email: ['', [Validators.required]],
            nombre: [{ value: '', disabled: true }, [Validators.required]],
            perfil: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            tipo: [ {value: '', disabled: true}, [Validators.required]],
            id: ['', [Validators.required]],
            
     
            //roles: new FormArray(controls, this.minSelectedCheckboxes(1))

        });
    }
    findEmail() {
        this.nombre = this.emailSelected.fullname;
        this.tipo = this.emailSelected.user_type;
        this.id = this.emailSelected.id;

    }

    formToModel(): void {
        this.model.id = this.id;
        this.model.email = this.emailSelected.email;
        this.model.fullname = this.emailSelected.fullname;
        this.model.profileEntity = this.perfilSelected;
        this.model.enabled = this.estadoSelected;
        this.model.type = this.tipo;
        this.model.deleted = false;
    }

 

    resetAndRefreshTable() {
        this.tabla.reset();
        this.refreshTable();
    }

    refreshTable() {
        this.tabla.reset();
        if (this.lastLazyLoadEvent) {
            this.loadLazy(this.lastLazyLoadEvent);
        }
    }

    loadLazy(event: LazyLoadEvent) {
        this.getUsers();
    }


    updateUser(data, message){
        this.usuarioService.update(data).then((res) => {
            if (res != null) {
                this.showMsg('success', message);
                var root = this;
                setTimeout(function(){
                        //root.router.navigateByUrl('main/perfiles');
                }, 2500)
                this.refreshTable();
            }
        });
    }

    doAction(data, accion) {
        if (accion =='state') {
            data.enabled = !data.enabled;
            
            let message;
            if (data.enabled) {
                message = 'usuario activado correctamente.';
            } else {
                message = 'usuario desactivado correctamente.';
            }
            this.updateUser(data, message);

        } else {
             this.nombre = data.fullname;
             this.tipo = data.type;
             this.id = data.id;
             this.emailSelected = new User(data.id, data.email, data.fullname, data.enabled, data.deleted, 
                data.type, data.type, data.user_type);
             this.estadoSelected = data.enabled;
             this.perfilSelected = data.profileEntity;

        }


    }

    limpiarData() {
        this.emailSelected = null;
        this.id = undefined;
        this.nombre = '';
        this.tipo = '';
        this.perfilSelected = null;
      }

    modelToForm(model: User): void {
        this.modelForm.patchValue({
            nombres: model.fullname,
            email: model.email,
            perfil: model.profileEntity.idPerfil

        });
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


    listarUsuariosAplicacion() {
        this.listaUsuarios = [];
        this.usuarioService.listarUsuariosAplicacion().subscribe(
          (data: User[]) => {
            this.listaUsuarios = data;
          });
    }

    listarPerfiles() {
        this.perfilService.getAll().subscribe(
          (data: Perfil[]) => {
            this.listaPerfil = data;
          });
    }

        getUsers() {
            this.listaUsuariosApp = [];
            this.usuarioService.getUsers().subscribe(
                (data: User[]) => { 
                  this.listaUsuariosApp = data;
                },
                error => {
                  this.listaUsuariosApp = [];
                  const errorMessage =
                    error.message != undefined
                      ? error.message
                      : 'No se pudo procesar la petición';
                  //this.alertService.danger(errorMessage);
                }
              );
        }


      linkUpdate(id) {
       this.router.navigate(['usuarios/editar', id]);
    }

    trackByFn(index, item) {
        return index; // or item.id
      }

      showMsg( type: string, msg: string, title: string = 'Usuario') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }

      save() {
        let message;
        this.formToModel();
        this.usuarioService.save(this.model).then((res) => {
          if (res != null) {
            message = 'Usuario creado correctamente.';
            this.showMsg('success', message);
            setTimeout(function() {
                        
            }, 2500);
            this.refreshTable();
            }
                   });

    }

    showConshowConfirmDeletefirm(data) {
        this.messageService.clear();
        this.data = data;
        this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?'});
    }

    onReject() {
        this.messageService.clear('c');
      }
      
      onConfirm(data) {
        this.deleteUser(data, 'Usuario eliminado correctamente');
        this.messageService.clear('c');
      }

      public deleteUser(data, message): void {
        this.usuarioService.delete(data.id).subscribe(
          data => {
            this.showMsg('success', message, 'Usuario');
            this.getUsers();
          },
          error => {
            const errorMessage =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
            this.showMsg('error',  errorMessage, 'Usuario');
  
          }
        );
      }
  

}
