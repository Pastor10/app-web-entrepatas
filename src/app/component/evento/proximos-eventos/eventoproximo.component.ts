import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { TipoAnimalService } from 'src/app/shared/service/tipoanimal.service';
import { Evento } from 'src/app/shared/model/evento.model';
import { EventoService } from 'src/app/shared/service/evento.service';

@Component({
    selector: 'app-eventoproximo',
    templateUrl: './eventoproximo.component.html',
    styleUrls: ['./eventoproximo.component.scss']
   
})

export class EventoProximoComponent implements OnInit{


    eventos: Evento[];
    

    cols: any[];
    @ViewChild('dt', {static: true}) public tabla: Table;

    constructor(public eventoService: EventoService) {
    }

    ngOnInit(){

        this.getAllEvento();
        this.cols = [
            {field: 'nombre', header: 'Tipo ', width: '250px'},
            {field: 'estado', header: 'Estado', width: '150px'}
        ];
    }

   
    getAllEvento(){
        this.eventoService.getAll().subscribe((data: Evento[]) =>{
            this.eventos = data;
            console.log(this.eventos );
            
        });

    }

}