import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoLocal } from 'src/app/shared/model/tipolocal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { TipoAnimal } from 'src/app/shared/model/tipoanimal.model';
import { TipoAnimalService } from 'src/app/shared/service/tipoanimal.service';
import { TamanoAnimalService } from 'src/app/shared/service/tamanoanimal.service';
import { TamanoAnimal } from 'src/app/shared/model/tamanoanimal.model';

@Component({
    selector: 'app-tamanoanimal',
    templateUrl: './tamanoanimal.component.html',
    styleUrls: ['./tamanoanimal.component.scss']
   
})

export class TamanoAnimalComponent implements OnInit{

    listaTamanoAnimal: TamanoAnimal[];
    tamanoAnimal: TamanoAnimal;
    nombre: string;
    estadoSelected: boolean=true;
    id: number;
    model = new TamanoAnimal();
    lastLazyLoadEvent: LazyLoadEvent;
    public saveProfile = true;
    public edit = false;

    cols: any[];
    @ViewChild('dt', {static: true}) public tabla: Table;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService, public fb: FormBuilder,
        public tamanoAnimalService: TamanoAnimalService) {
    }

    ngOnInit(){
        this.listarTamanoAnimal();

        this.cols = [
            {field: 'nombre', header: 'Tamaño ', width: '250px'},
            {field: 'estado', header: 'Estado', width: '150px'}
        ];
    }



    listarTamanoAnimal(){
    this.listaTamanoAnimal = [];
            this.tamanoAnimalService.getAll().subscribe(
                (data: TamanoAnimal[]) => { 
                  this.listaTamanoAnimal = data;
                },
                error => {
                  this.listaTamanoAnimal = [];
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
        this.listarTamanoAnimal();
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
        this.tamanoAnimal = data;
        this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?'});
    }
  
    onConfirm(data) {
        console.log('data elimina', data);
      this.deleteTamanoAnimal(data, 'Tamaño Animal eliminado correctamente');
      this.messageService.clear('c');
    }

    onReject() {
        this.messageService.clear('c');
    }

    public deleteTamanoAnimal(data, message): void {
        this.tamanoAnimalService.delete(data.id).subscribe(
          data => {
            this.showMsg('success', message, 'Tamaño Animal');
            this.refreshTable();
          },
          error => {
            const errorMessage =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
            this.showMsg('error',  errorMessage, 'Tamaño Animal');
  
          }
        );
      }

    save() {
        let message;
        this.formToModel();

        if(this.nombre=='' || this.nombre== undefined){
            this.showMsg('warn', 'Escriba un tamaño animal', 'Tamaño Animal');
            return;
          }

          if (this.id != undefined) {
            this.model.id = this.id;
            this.edit = true;
          } else {
            this.model.id = undefined;
            this.edit = false;
          }
   
        this.listaTamanoAnimal.forEach(item => {
            if (item.nombre.toUpperCase() === this.nombre.toUpperCase() && !this.edit) {
            this.saveProfile = false;
            }
        });
        if (this.saveProfile) {
            this.tamanoAnimalService.save(this.model).subscribe(
            data => {
                this.showMsg('success', 'Se guardó correctamente', 'Tamaño Animal');
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
            this.showMsg('warn', 'Tipo Animal ya existe', 'Tamaño Animal');
            this.saveProfile = true;
        }
        this.limpiarData();

    }

    showMsg( type: string, msg: string, title: string = 'Tamaño Animal') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }

}