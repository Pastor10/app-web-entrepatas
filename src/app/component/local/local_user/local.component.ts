import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { User } from 'src/app/shared/model/User.model';
import { Ubigeo } from 'src/app/shared/model/ubigeo.model';
import { UbigeoService } from 'src/app/shared/service/ubigeo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoLocal } from 'src/app/shared/model/tipolocal.model';
import { TipoLocalService } from 'src/app/shared/service/tipolocal.service';
import { Local } from 'src/app/shared/model/local.model';
import { LocalService } from 'src/app/shared/service/local.service';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-locales',
    templateUrl: './local.component.html',
    styleUrls: ['./local.component.scss']
   
})

export class LocalComponent implements OnInit{

    totalRecords: 10;
    perPage = 10;
    cols: any[];
    filterUser: User[];
    user: User;
    filteredCities: Ubigeo[];
    ubigeo: Ubigeo;
    mf: FormGroup;
    tipoLocales: TipoLocal[];
    locales: Local[];
    tipoLocal: TipoLocal;
    model= new Local();
    id: number;
    capacidad: number;
    direccion: string;
    nombreLocal: string;
    estado: boolean=true;
    data: User;
    ubigeoAux: any;
    lastLazyLoadEvent: LazyLoadEvent;
    @ViewChild('dt', {static: true}) public tabla: Table;

     constructor( public usuarioService: UsuarioService, public ubigeoService: UbigeoService,
        public tipoLocalService: TipoLocalService, public localService: LocalService, 
        public messageService: MessageService, public fb: FormBuilder){

    }

    ngOnInit(){
        this.cols = [
            {field: 'encargado', header: 'Encargado', width: '170px'},
            {field: 'local', header: 'Local', width: '150px'},
            {field: 'direccion', header: 'Direccíon', width: '200px'},
            {field: 'tipo', header: 'Tipo', width: '90px'},
            {field: 'capacidad', header: 'Cap.', width: '70px'},
            {field: 'alojado', header: 'Alojado', width: '90px'},
            {field: 'estado', header: 'Estado', width: '90px'},
        ];
        this.getAlltipoLocal();
        this.builderForm();
        //this.getAllLocales();
    }

    builderForm() {
        this.mf = this.fb.group({
            ubigeo: [null, [Validators.required]],
         
        });

    }

    getAlltipoLocal(){
        this.tipoLocalService.getAll().subscribe((data: TipoLocal[]) =>{
            this.tipoLocales = data;
        });

    }

    getAllLocales(){
        this.localService.getAll().subscribe((data: Local[]) =>{
            this.locales = data;
            console.log('locales ', this.locales);
            
        });

    }
    loadLazy(event: LazyLoadEvent) {
        this.getAllLocales();
    }

    filterUsers(event) {
        let query = event.query;
        this.usuarioService.getAllIntegrantes().subscribe((users: User[]) => {
            this.filterUser = this.filterUsuario(query, users);
        });
    }

    filterCitiesByNombre(event) {
        const query = event.query;
        this.ubigeoService.findCity(query).subscribe(data => {
            this.filteredCities = data;
        });
    }

    onSelectCiudad(e: Ubigeo) {
        console.log("city ", e);
        
        this.mf.patchValue({
            'ubigeo': e
        });
    }

    // onSelectCiudad(e: Ubigeo) {
    //     this.mf.patchValue({
    //         ubigeo: e

            
    //     });
    //     console.log("city ", this.mf);
    // }

    filterUsuario(query, users: User[]):any[] {
        let filtered : User[] = [];
        for(let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.persona.nombreCompleto.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(user);
            }
        }
        return filtered;
    }

    filterUbigeos(query, cities: Ubigeo[]):any[] {
        let filtered : Ubigeo[] = [];
        for(let i = 0; i < cities.length; i++) {
            let city = cities[i];
            if (city.descripcion.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(city);
            }
        }
        return filtered;
    }

    formToModel(): void {
        this.model.id = this.id;
        this.model.ubigeo = this.ubigeo;
        this.model.usuario = this.user;
        this.model.tipoLocal = this.tipoLocal;
        this.model.capacidad = this.capacidad;
        this.model.estado = this.estado;
        this.model.direccion = this.direccion; 
        this.model.nombre = this.nombreLocal;

        console.log('local ', this.model);
        
    }

    ubigeoObjectToString(o: Ubigeo) {
        return `${o.codDepartamento}${o.codProvincia}${o.codDistrito}`;
    }

    save() {
        let message;
        this.formToModel();
        this.localService.save(this.model).subscribe((res) => {
          if (res != null) {
            message = 'Datos guardados correctamente.';
            this.showMsg('success', message);

            this.limpiarData();
            this.refreshTable();

            }
       });

    }

    showConfirmDelete(data) {
        this.messageService.clear();
        this.data = data;
        this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?'});
    }

    limpiarData() {
        this.id = undefined;
        this.capacidad = null;
        this.user = null;
        this.ubigeo = null;
        this.direccion = '';
        this.estado = true;
        this.tipoLocal = null;
        this.nombreLocal=null;
      }

      refreshTable() {
        this.tabla.reset();
        if (this.lastLazyLoadEvent) {
            this.loadLazy(this.lastLazyLoadEvent);
        }
    }

      onReject() {
        this.messageService.clear('c');
      }
      
      onConfirm(data) {
          console.log(data);
          
        //this.deleteUser(data, 'Usuario eliminado correctamente');
        this.messageService.clear('c');
      }

      doAction(data, accion) {
        if (accion =='state') {
            data.estado = !data.estado;
            
            let message;
            if (data.estado) {
                message = 'usuario activado correctamente.';
            } else {
                message = 'usuario desactivado correctamente.';
            }
           // this.updateUser(data, message);

        } else {
        
             this.id = data.id;
             this.capacidad = data.capacidad
             this.direccion = data.direccion;
             this.user = data.usuario;
             this.estado = data.estado;
             this.tipoLocal = data.tipoLocal;
             this.nombreLocal = data.nombre;
             this.getCity(data.ubigeo);             

        }


    }

    getCity(ubigeo: Ubigeo) {
        const params = [
            `codDepartamento=${ubigeo.codDepartamento}`,
            `codProvincia=${ubigeo.codProvincia}`,
            `codDistrito=${ubigeo.codDistrito}`
        ];
        this.ubigeoService.getCity(params.join('&')).subscribe(
            data => {
                if (data != null) {
                    this.ubigeo= data;
                }
               
            }
        );

    }

    showMsg( type: string, msg: string, title: string = 'Local') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }
}