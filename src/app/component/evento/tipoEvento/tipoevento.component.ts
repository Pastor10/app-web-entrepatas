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
import { TipoEventoService } from 'src/app/shared/service/tipoevento.service';
import { TipoEvento } from 'src/app/shared/model/tipoevento.model';

@Component({
    selector: 'app-tipoevento',
    templateUrl: './tipoevento.component.html'
   
})

export class TipoEventoComponent implements OnInit{

    totalRecords: 10;
    perPage = 10;
    cols: any[];

    mf: FormGroup;
    tipoEventos: TipoEvento[];
    tipoEvento: TipoEvento;
    model= new TipoEvento();
    id: number;

    nombre:string;
    estado: boolean=true;
    data: TipoEvento;
    uploadedFiles: any[] = [];
    file:File;
    imagenUp: string;

    @ViewChild('dt', {static: true}) public tabla: Table;
    lastLazyLoadEvent: LazyLoadEvent;
     constructor(public messageService: MessageService, public fb: FormBuilder, public tipoEventoService: TipoEventoService){

    }

    ngOnInit(){
        this.cols = [
            {field: 'tipnombreo', header: 'Tipo', width: '170px'},
            {field: 'imagen', header: 'Imagen', width: '150px'},
            {field: 'estado', header: 'Estado', width: '80px'},
        ];
       // this.getAllTipoevento();
        this.builderForm();
        //this.getAllLocales();
    }

    builderForm() {
        this.mf = this.fb.group({
            ubigeo: [null, [Validators.required]],
         
        });

    }

    getAllTipoevento(){
        this.tipoEventoService.getAll().subscribe((data: TipoEvento[]) =>{
            this.tipoEventos = data;
            console.log(this.tipoEventos );
            
        });

    }

 
    loadLazy(event: LazyLoadEvent) {
        this.getAllTipoevento();
    }

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    onBasicUpload(event) {
        this.file = event.files[0]
        if(this.file!=null){
            this.imagenUp="IMAGEN SUBIDA CORRECTAMENTE";
        }else{
            this.imagenUp='';
        }
       
        console.log('this.file', this.file);
      }

    formToModel(): void {
        this.model.id = this.id;
        this.model.nombre = this.nombre;
        this.model.file = this.file;
        this.model.estado = this.estado;
        
    }

    
 
    save() {
        let message;
        this.formToModel();

        //params.join('&')
        this.tipoEventoService.save(this.model).subscribe((res) => {
          if (res != null) {
            message = 'Tipo Evento creado correctamente.';
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
        this.tipoEvento = null;
        this.nombre = '';
      }

      onReject() {
        this.messageService.clear('c');
      }
      
      onConfirm(data) {
          console.log(data);
          
        this.deleteRaza(data, 'Tipo Evento eliminado correctamente');
        this.messageService.clear('c');
      }

      public deleteRaza(data, message): void {
        this.tipoEventoService.delete(data.id).subscribe(
          data => {
            this.showMsg('success', message, 'Tipo Evento');
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
                message = 'Tipo Evento activado correctamente.';
            } else {
                message = 'Tipo Evento desactivado correctamente.';
            }
           // this.updateUser(data, message);

        } else {
            console.log(data);
            
             this.id = data.id;
             this.nombre = data.nombre
             this.tipoEvento = data.tipoEvento;
             this.estado = data.estado;

             

        }


    }

    showMsg( type: string, msg: string, title: string = 'Tipo Evento') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }
}