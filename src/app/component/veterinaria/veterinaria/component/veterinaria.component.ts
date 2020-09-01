import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Ubigeo } from 'src/app/shared/model/ubigeo.model';
import { UbigeoService } from 'src/app/shared/service/ubigeo.service';
import { FormGroup } from '@angular/forms';
import { LocalService } from 'src/app/shared/service/local.service';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { VeterinariaService } from 'src/app/shared/service/veterinaria.service';
import { Veterinaria } from 'src/app/shared/model/veterinaria.model';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-veterinaria',
    templateUrl: './veterinaria.component.html',
    styleUrls: ['./veterinaria.component.scss']
   
})

export class VeterinariaComponent implements OnInit{

    totalRecords: 10;
    perPage = 10;
    cols: any[];
    filteredCities: Ubigeo[];
    ubigeo: Ubigeo;
    mf: FormGroup;
    veterinarias: Veterinaria[];
    model= new Veterinaria();
    id: number;
    direccion: string;
    estado: boolean=true;
    data: Veterinaria;
    nombre: string;
    lastLazyLoadEvent: LazyLoadEvent;
    @ViewChild('dt', {static: true}) public tabla: Table;

     constructor( public usuarioService: UsuarioService, public ubigeoService: UbigeoService,
        public localService: LocalService, 
        public messageService: MessageService, public veterinariaService: VeterinariaService){

    }

    ngOnInit(){
        this.cols = [
            {field: 'encargado', header: 'Nombre', width: '170px'},
            {field: 'direccion', header: 'Direccíon', width: '150px'},
            {field: 'estado', header: 'Estado', width: '80px'},
        ];

        //this.getAllLocales();
    }

  

    getAllVeterinaria(){
        this.veterinariaService.getAll().subscribe((data: Veterinaria[]) =>{
            this.veterinarias = data;
           
            
        });

    }


    loadLazy(event: LazyLoadEvent) {
        this.getAllVeterinaria();
    }



    filterCitiesByNombre(event) {
        const query = event.query;
        this.ubigeoService.findCity(query).subscribe(data => {
            this.filteredCities = data;
        });
    }

    onSelectCiudad(e: Ubigeo) {
        this.mf.patchValue({
            'ubigeo': e
        });
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

    // filterUsuario(query, users: User[]):any[] {
    //     let filtered : User[] = [];
    //     for(let i = 0; i < users.length; i++) {
    //         let user = users[i];
    //         if (user.nombreCompleto.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //             filtered.push(user);
    //         }
    //     }
    //     return filtered;
    // }

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
        this.model.nombre = this.nombre,
        this.model.estado = this.estado;
        this.model.direccion = this.direccion;   

        
    }

    save() {
        let message;
        this.formToModel();
        this.veterinariaService.save(this.model).subscribe((res) => {
          if (res != null) {
            message = 'Datos guardados correctamente';
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
        this.ubigeo = null;
        this.direccion = '';
        this.nombre = '';
      }

      onReject() {
        this.messageService.clear('c');
      }
      
      onConfirm(data) {
        this.deleteVeterinaria(data, 'Veterinaria eliminado correctamente');
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
             this.direccion = data.direccion;
             this.nombre = data.nombre;
             //this.ubigeo = data.ubigeo;
             this.estado = data.estado;
             this.getCity(data.ubigeo);

        }


    }

    public deleteVeterinaria(data, message): void {
        this.veterinariaService.delete(data.id).subscribe(
          data => {
            this.showMsg('success', message, 'Veterinaria');
            this.refreshTable();
          },
          error => {
            const errorMessage =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
            this.showMsg('error',  errorMessage, 'Veterinaria');
  
          }
        );
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

    showMsg( type: string, msg: string, title: string = 'Veterinaria') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }
}