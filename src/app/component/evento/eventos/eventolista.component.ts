import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { TipoEventoService } from 'src/app/shared/service/tipoevento.service';
import { TipoEvento } from 'src/app/shared/model/tipoevento.model';
import { EventoService } from 'src/app/shared/service/evento.service';
import { Evento } from 'src/app/shared/model/evento.model';

@Component({
    selector: 'app-eventolista',
    templateUrl: './eventolista.component.html'
   
})

export class EventoListaComponent implements OnInit{

    totalRecords: 10;
    perPage = 10;
    cols: any[];

    mf: FormGroup;
    tipoEventos: TipoEvento[];
    tipoEvento: TipoEvento;
    model= new TipoEvento();
    id: number;
    eventos: Evento[];
    nombre:string;
    estado: boolean=true;
    data: TipoEvento;
    uploadedFiles: any[] = [];
    file:File;

    @ViewChild('dt', {static: true}) public tabla: Table;
    lastLazyLoadEvent: LazyLoadEvent;
     constructor(public messageService: MessageService, public fb: FormBuilder, public tipoEventoService: TipoEventoService,
        public eventoService: EventoService){

    }

    ngOnInit(){
        this.cols = [
            {field: 'fecha', header: 'Fecha', width: '70px'},
            {field: 'fecha', header: 'Hora', width: '50px'},
            {field: 'tipo', header: 'Tipo', width: '80px'},
            {field: 'titulo', header: 'Titulo', width: '80px'},
            {field: 'ubigeo', header: 'Lugar', width: '200px'},
            {field: 'descripcion', header: 'Descripcíon', width: '200px'},
            {field: 'estado', header: 'Estado', width: '80px'},
        ];
       // this.getAllTipoevento();
        this.builderForm();
        this.getAllEvento();
    }

    builderForm() {
        this.mf = this.fb.group({
            ubigeo: [null, [Validators.required]],
         
        });

    }

    getAllEvento(){
        this.eventoService.getAll().subscribe((data: Evento[]) =>{
            this.eventos = data;
            console.log(this.eventos );
            
        });

    }

 
    loadLazy(event: LazyLoadEvent) {
        this.getAllEvento();
    }

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    onBasicUpload(event) {
        this.file = event.files[0]
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