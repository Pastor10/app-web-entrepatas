import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoLocal } from 'src/app/shared/model/tipolocal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { TipoLocalService } from 'src/app/shared/service/tipolocal.service';
import { Table } from 'primeng/table';
import { TipoAnimal } from 'src/app/shared/model/tipoanimal.model';
import { TipoAnimalService } from 'src/app/shared/service/tipoanimal.service';

@Component({
    selector: 'app-tipoanimal',
    templateUrl: './tipoanimal.component.html',
    styleUrls: ['./tipoanimal.component.scss']
   
})

export class TipoAnimalComponent implements OnInit{

    listaTipoAnimal: TipoAnimal[];
    tipoAnimal: TipoAnimal;
    nombre: string;
    estadoSelected: boolean=true;
    id: number;
    model = new TipoLocal();
    lastLazyLoadEvent: LazyLoadEvent;
    public saveProfile = true;
    public edit = false;

    cols: any[];
    @ViewChild('dt', {static: true}) public tabla: Table;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService, public fb: FormBuilder,
        public tipoAnimalService: TipoAnimalService) {
    }

    ngOnInit(){
        this.listarTipoAnimal();

        this.cols = [
            {field: 'nombre', header: 'Tipo ', width: '250px'},
            {field: 'estado', header: 'Estado', width: '150px'}
        ];
    }



    listarTipoAnimal(){
    this.listaTipoAnimal = [];
            this.tipoAnimalService.getAll().subscribe(
                (data: TipoAnimal[]) => { 
                  this.listaTipoAnimal = data;
                },
                error => {
                  this.listaTipoAnimal = [];
                  const errorMessage =
                    error.message != undefined
                      ? error.message
                      : 'No se pudo procesar la petición';
                  //this.alertService.danger(errorMessage);
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

    loadLazy(event: LazyLoadEvent) {
        this.listarTipoAnimal();
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
           // this.updateUser(data, message);

        } else {
             this.nombre = data.nombre;
             this.id = data.id;
             this.estadoSelected = data.estado;


        }
    }

    formToModel(): void {
        this.model.id = this.id;
        this.model.nombre = this.nombre;
        this.model.estado = this.estadoSelected;

        
    }

    limpiarData() {
        this.id = undefined;
        this.nombre = '';
    
      }

      showConshowConfirmDeletefirm(data) {
        this.messageService.clear();
        this.tipoAnimal = data;
        this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?'});
    }
  
    onConfirm(data) {
      this.deleteTipoAnimal(data, 'Tipo Animal eliminado correctamente');
      this.messageService.clear('c');
    }

    onReject() {
        this.messageService.clear('c');
    }

    public deleteTipoAnimal(data, message): void {
        this.tipoAnimalService.delete(data.id).subscribe(
          data => {
            this.showMsg('success', message, 'Tipo Animal');
            this.refreshTable();
          },
          error => {
            const errorMessage =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
            this.showMsg('error',  errorMessage, 'Tipo Animal');
  
          }
        );
      }

    save() {
        let message;
        this.formToModel();

        if(this.nombre=='' || this.nombre== undefined){
            this.showMsg('warn', 'Escriba un tipo animal', 'Tipo Animal');
            return;
          }

          if (this.id != undefined) {
            this.model.id = this.id;
            this.edit = true;
          } else {
            this.model.id = undefined;
            this.edit = false;
          }
   
        this.listaTipoAnimal.forEach(item => {
            if (item.nombre.toUpperCase() === this.nombre.toUpperCase() && !this.edit) {
            this.saveProfile = false;
            }
        });
        if (this.saveProfile) {
            this.tipoAnimalService.save(this.model).subscribe(
            data => {
                this.showMsg('success', 'Se guardó correctamente', 'Tipo Animal');
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
            this.showMsg('warn', 'Tipo Animal ya existe', 'Tipo Animal');
            this.saveProfile = true;
        }
        this.limpiarData();

    }

    showMsg( type: string, msg: string, title: string = 'Tipo Animal') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }

}