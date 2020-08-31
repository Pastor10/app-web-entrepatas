import { Component, OnInit, ViewChild } from '@angular/core';
import { Ubigeo } from 'src/app/shared/model/ubigeo.model';
import { FormGroup } from '@angular/forms';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { Veterinario } from 'src/app/shared/model/veterinario.model';
import { Veterinaria } from 'src/app/shared/model/veterinaria.model';
import { VeterinariaService } from 'src/app/shared/service/veterinaria.service';
import { VeterinarioService } from 'src/app/shared/service/veterinario.service';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-veterinario',
    templateUrl: './veterinario.component.html',
    styleUrls: ['./veterinario.component.scss']
   
})

export class VeterinarioComponent implements OnInit{

    totalRecords: 10;
    perPage = 10;
    cols: any[];
    mf: FormGroup;
    veterinarios: Veterinario[];
    veterinarias: Veterinaria[];
    veterinaria: Veterinaria;
    model= new Veterinario();
    id: number;
    estado: boolean=true;
    data: Veterinario;
    nombre: string;

    lastLazyLoadEvent: LazyLoadEvent;
    @ViewChild('dt', {static: true}) public tabla: Table;
     constructor( public messageService: MessageService, public veterinariaService: VeterinariaService,
        public veterinarioService: VeterinarioService){

    }

    ngOnInit(){
        this.cols = [
            {field: 'nombre', header: 'Nombres', width: '170px'},
            {field: 'veterinaria', header: 'Veterinaria', width: '150px'},
            {field: 'estado', header: 'Estado', width: '70px'}
        ];
        this.getAllVeterinarias();
    }

    getAllVeterinarias(){
        this.veterinariaService.getAll().subscribe((data: Veterinaria[]) =>{
            this.veterinarias = data;
        });

    }

    getAllVeterinarios(){
        this.veterinarioService.getAll().subscribe((data: Veterinario[]) =>{
            this.veterinarios = data;
        
            
        });

    }
    loadLazy(event: LazyLoadEvent) {
        this.getAllVeterinarios();
    }


    onSelectCiudad(e: Ubigeo) {
        this.mf.patchValue({
            'ubigeo': e
        });
    }



    formToModel(): void {
        this.model.id = this.id;
        this.model.nombre = this.nombre;
        this.model.veterinaria = this.veterinaria;
        this.model.estado = this.estado;
        
    }

    save() {
        let message;
        this.formToModel();
        this.veterinarioService.save(this.model).subscribe((res) => {
          if (res != null) {
            message = 'Datos guardados correctamente.';
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
        this.nombre = '';
        this.veterinaria = null;
        this.estado =true;
      }

      onReject() {
        this.messageService.clear('c');
      }
      
      onConfirm(data) {
        this.deleteUser(data, 'Veterinario eliminado correctamente');
        this.messageService.clear('c');
      }

      public deleteUser(data, message): void {
        this.veterinarioService.delete(data.id).subscribe(
          data => {
            this.showMsg('success', message, 'Veterinario');
            this.refreshTable();
          },
          error => {
            const errorMessage =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
            this.showMsg('error',  errorMessage, 'Veterinario');
  
          }
        );
      }

      doAction(data, accion) {
        if (accion =='state') {
            data.estado = !data.estado;
            
            let message;
            if (data.estado) {
                message = 'Veterinario activado correctamente.';
            } else {
                message = 'Veterinario desactivado correctamente.';
            }
            this.updateVeterinario(data, message);

        } else {
             this.id = data.id;
             this.nombre = data.nombre
             this.veterinaria = data.veterinaria;
             this.estado = data.estado;


        }

    }

    updateVeterinario(data, message){
        this.veterinarioService.save(data).subscribe((res) => {
            if (res != null) {
                this.showMsg('success', message);
                this.limpiarData();
                //this.refreshTable();
            }
        });
    }

    showMsg( type: string, msg: string, title: string = 'Veterinario') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }
}