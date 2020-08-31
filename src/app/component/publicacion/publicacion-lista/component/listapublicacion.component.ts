import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/model/User.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { PublicacionService } from 'src/app/shared/service/publicacion.service';
import { Publicacion } from 'src/app/shared/model/publicacion.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Estado } from 'src/app/shared/model/estado.model';
import { Condicion } from 'src/app/shared/model/condicion.model';
import { CondicionService } from 'src/app/shared/service/condicion.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-eventolista',
    templateUrl: './listapublicacion.component.html',
    styleUrls: ['./listapublicacion.component.scss']

})

export class PublicacionListaComponent implements OnInit {

    totalRecords: number;
    perPage = 10;
    cols: any[];

    mf: FormGroup;
    id: number;
    nombre: string;
    estado: boolean = true;
    uploadedFiles: any[] = [];
    file: File;
    publicaciones: Publicacion[];
    estadoPublicacion: Estado;
    token;
    pl;
    usuario: User;
    modalRechazo: boolean = false;
    publicacion: Publicacion;
    observacion: string;
    lastLazyLoadEvent: LazyLoadEvent;
    listaCondicion: Condicion[];
    condicionSelected: any;
    fechaSearch: Date;

    @ViewChild('dt', { static: true }) public tabla: Table;
    constructor(public messageService: MessageService, public fb: FormBuilder, public publicacionService: PublicacionService,
        public usuarioService: UsuarioService, public condicionService: CondicionService) {

        this.token = localStorage.getItem("userLogin");
        this.pl = JSON.parse(this.token);
        this.publicacion = new Publicacion();


    }

    ngOnInit() {

        this.cols = [
            { field: 'fecha', header: 'Fecha', width: '100px' },
            { field: 'hora', header: 'Hora', width: '70px' },
            { field: 'usuario', header: 'Usuario', width: '230px' },
            { field: 'nombre', header: 'Mascota', width: '120px' },
            { field: 'foto', header: 'Foto', width: '80px' },
            { field: 'sexo', header: 'Tipo/Sexo', width: '120px' },
            { field: 'condicion', header: 'Condición', width: '120px' },
            { field: 'observacion', header: 'Observación', width: '200px' },
            { field: 'estado', header: 'Estado', width: '120px' },
        ];

        this.builderForm();
        this.getAllCondiciones();

    }



    builderForm() {
        this.mf = this.fb.group({
            ubigeo: [null, [Validators.required]],

        });

    }

    getAllPublicacion(event) {
        const params = [];
        this.lastLazyLoadEvent = event;
        const pageNumber = event.first / this.perPage;

        params.push(`page=${pageNumber}`);
        params.push(`perPage=${this.perPage}`);

        if (this.condicionSelected != undefined) {
            this.condicionSelected.forEach(element => {
                params.push(`condicion=${element.nombre}`);

            });

        }

        // if(this.fechaSearch!=undefined){
        //     params.push(`fecha=${this.fechaSearch}`);
        // }

        this.publicacionService.getAll(params.join('&')).subscribe((data: Publicacion[]) => {
            this.totalRecords = data['totalElements'];
            this.publicaciones = data['content'];

        });

    }

    getAllCondiciones() {
        this.condicionService.getAll().subscribe(
            (data: Condicion[]) => {
                this.listaCondicion = data;
            }
        )
    }

    getAllPublicacionUser(idUser, event) {
        const params = [];
        this.lastLazyLoadEvent = event;
        const pageNumber = event.first / this.perPage;

        params.push(`page=${pageNumber}`);
        params.push(`perPage=${this.perPage}`);
        params.push(`id=${idUser}`);

        this.publicacionService.getAllFindById(idUser).subscribe((data: Publicacion[]) => {
            //this.publicaciones = data;
            //this.totalRecords = data['totalElements'];
            this.publicaciones = data;


        });

    }

    getUserId(id) {
        this.usuarioService.getUserId(id).subscribe((data: User) => {
            this.usuario = data;
        });
    }

    loadLazy(event: LazyLoadEvent) {

        this.usuarioService.getUserId(this.pl.user.id).subscribe((data: User) => {
            this.usuario = data;
            if (this.usuario.perfil.nombre == 'VISITANTE') {
                this.getAllPublicacionUser(this.usuario.id, event);
            } else {
                this.getAllPublicacion(event);
            }
        });
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

    onBasicUpload(event) {
        this.file = event.files[0]
       
    }

    // formToModel(): void {
    //     this.model.id = this.id;
    //     this.model.nombre = this.nombre;
    //     this.model.file = this.file;
    //     this.model.estado = this.estado;

    // }




    udpdatePublicacion(publicacion) {
        let message;
        this.publicacionService.save(publicacion).subscribe((res) => {
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
        //this.tabla.reset();
        if (this.lastLazyLoadEvent) {
            this.loadLazy(this.lastLazyLoadEvent);
        }
    }


    limpiarData() {
        this.id = undefined;
        this.nombre = '';
        this.observacion = '';
    }


    doAction(data, accion) {

        data.estadoPublicacion = accion;
        data.usuarioEvalua = this.usuario;
        data.observacion = this.observacion;
        this.udpdatePublicacion(data);
        this.modalRechazo = false;

    }

    showDialogRechazo(data) {
        this.publicacion = data;
        this.modalRechazo = true;
    }

    linkUpdate(id) {
        return `/main/generar-publicacion/${id}`;
    }

    linkCitaMedica(id) {
        return `/main/publicacion-cita/${id}`;
    }

    showMsg(type: string, msg: string, title: string = 'publicacion') {
        this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
    }
}