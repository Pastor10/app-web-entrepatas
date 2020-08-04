import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/model/User.model';
import { Ubigeo } from 'src/app/shared/model/ubigeo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoLocal } from 'src/app/shared/model/tipolocal.model';
import { Local } from 'src/app/shared/model/local.model';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { TipoAnimal } from 'src/app/shared/model/tipoanimal.model';
import { Raza } from 'src/app/shared/model/raza.model';
import { TipoAnimalService } from 'src/app/shared/service/tipoanimal.service';
import { RazaService } from 'src/app/shared/service/raza.service';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-raza',
    templateUrl: './raza.component.html'
   
})

export class RazaComponent implements OnInit{

    totalRecords: 10;
    perPage = 10;
    cols: any[];

    mf: FormGroup;
    tipoAnimales: TipoAnimal[];
    razas: Raza[];
    tipoAnimal: TipoAnimal;
    model= new Raza();
    id: number;

    nombre:string;
    estado: boolean=true;
    data: Raza;

    @ViewChild('dt', {static: true}) public tabla: Table;
    lastLazyLoadEvent: LazyLoadEvent;
     constructor(public tipoAnimalService: TipoAnimalService, public razaService: RazaService, 
        public messageService: MessageService, public fb: FormBuilder){

    }

    ngOnInit(){
        this.cols = [
            {field: 'raza', header: 'Raza', width: '170px'},
            {field: 'tipoAnimal', header: 'Tipo Animal', width: '150px'},
            {field: 'estado', header: 'Estado', width: '80px'},
        ];
        this.getAlltipoAnimal();
        this.builderForm();
        //this.getAllLocales();
    }

    builderForm() {
        this.mf = this.fb.group({
            ubigeo: [null, [Validators.required]],
         
        });

    }

    getAlltipoAnimal(){
        this.tipoAnimalService.getAll().subscribe((data: TipoAnimal[]) =>{
            this.tipoAnimales = data;
        });

    }

    getAllRazas(){
        this.razaService.getAll().subscribe((data: Raza[]) =>{
            this.razas = data;
            console.log('razas', this.razas);
            
            
        });

    }
    loadLazy(event: LazyLoadEvent) {
        this.getAllRazas();
    }



    formToModel(): void {
        this.model.id = this.id;
        this.model.nombre = this.nombre;
        this.model.tipoAnimal = this.tipoAnimal;
        this.model.estado = this.estado;
        
    }

 
    save() {
        let message;
        this.formToModel();
        this.razaService.save(this.model).subscribe((res) => {
          if (res != null) {
            message = 'Raza creado correctamente.';
            this.showMsg('success', message);

            this.limpiarData();
            this.refreshTable();

            }
       });

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

    showConfirmDelete(data) {
        this.messageService.clear();
        this.data = data;
        this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?'});
    }

    limpiarData() {
        this.id = undefined;
        this.tipoAnimal = null;
        this.nombre = '';
      }

      onReject() {
        this.messageService.clear('c');
      }
      
      onConfirm(data) {
          console.log(data);
          
        this.deleteRaza(data, 'Raza eliminado correctamente');
        this.messageService.clear('c');
      }

      public deleteRaza(data, message): void {
        this.razaService.delete(data.id).subscribe(
          data => {
            this.showMsg('success', message, 'Raza');
            this.refreshTable();
          },
          error => {
            const errorMessage =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
            this.showMsg('error',  errorMessage, 'Raza');
  
          }
        );
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
            console.log(data);
            
             this.id = data.id;
             this.nombre = data.nombre
             this.tipoAnimal = data.tipoAnimal;
             this.estado = data.estado;

             

        }


    }

    showMsg( type: string, msg: string, title: string = 'Raza') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }
}