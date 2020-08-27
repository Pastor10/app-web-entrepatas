import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PostulanteColaborador } from 'src/app/shared/model/postulantecolaborador.model';
import { PostulanteColaboradorService } from 'src/app/shared/service/postulante-colaborador.service';
import { DetalleCuestionario } from 'src/app/shared/model/detalleCuestionario.model';
import { FichaColaborador } from 'src/app/shared/model/ficha-colaborador.model';
import { Opcion } from 'src/app/shared/model/opcion.model';



@Component({
    selector: 'app-postulante-colaborador',
    templateUrl: './postulante-colaborador.component.html'

})

export class PostulanteColaboradorComponent implements OnInit {
    cols: any[]
    postulantes: PostulanteColaborador[];
    lastLazyLoadEvent: LazyLoadEvent;
    totalRecords: number;
    perPage = 10;
    modalSolicitud: boolean = false;
    postulante: PostulanteColaborador;
    listaDetalle: DetalleCuestionario[];
    fichaColaborador: FichaColaborador;
    listafichaColaborador: FichaColaborador[];
    opciones: Opcion[];
    constructor(public postulanteColaboradorService: PostulanteColaboradorService) {

    }

    ngOnInit() {
        this.cols = [
            { field: 'fecha', header: 'Fecha', width: '90px' },
            { field: 'nombres', header: 'Nombres', width: '150px' },
            { field: 'documento', header: 'Documento', width: '120px' },
            { field: 'ubigeo', header: 'Lugar', width: '200px' },
            { field: 'celular', header: 'Celular', width: '100px' },
            { field: 'correo', header: 'Correo', width: '150px' },
            // { field: 'accion', header: 'Acciones', width: '90px' }
        ];

    }

    loadLazy(event: LazyLoadEvent) {
        this.getAllPostulantes(event);
    }

    getAllPostulantes(event) {
        const params = [];
        this.lastLazyLoadEvent = event;
        const pageNumber = event.first / this.perPage;

        params.push(`page=${pageNumber}`);
        params.push(`perPage=${this.perPage}`);
        this.postulanteColaboradorService.getAll().subscribe((data: PostulanteColaborador[]) => {
            this.postulantes = data;
            console.log(data);

        });
    }

    showSolicitud(data) {
        this.postulante = data;
        this.listaDetalle = this.postulante.cuestionario.listaDetalle;
        this.listafichaColaborador = [];

        this.opciones = this.listaDetalle
            .map(p => p.opcion)
            .filter((opcion, index, arr) => arr.indexOf(opcion) == index)
            .sort();
        this.modalSolicitud = true;
    }

}