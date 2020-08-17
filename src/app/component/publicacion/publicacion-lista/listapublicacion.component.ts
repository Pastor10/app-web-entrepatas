import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/model/User.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { TipoEventoService } from 'src/app/shared/service/tipoevento.service';
import { TipoEvento } from 'src/app/shared/model/tipoevento.model';
import { EventoService } from 'src/app/shared/service/evento.service';
import { Evento } from 'src/app/shared/model/evento.model';
import { PublicacionService } from 'src/app/shared/service/publicacion.service';
import { Publicacion } from 'src/app/shared/model/publicacion.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Estado } from 'src/app/shared/model/estado.model';

@Component({
    selector: 'app-eventolista',
    templateUrl: './listapublicacion.component.html',
    styleUrls: ['./listapublicacion.component.scss']

})

export class PublicacionListaComponent implements OnInit {

    totalRecords: 10;
    perPage = 10;
    cols: any[];

    mf: FormGroup;
    tipoEventos: TipoEvento[];
    tipoEvento: TipoEvento;
    model = new TipoEvento();
    id: number;
    eventos: Evento[];
    nombre: string;
    estado: boolean = true;
    data: TipoEvento;
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

    @ViewChild('dt', { static: true }) public tabla: Table;
    lastLazyLoadEvent: LazyLoadEvent;
    constructor(public messageService: MessageService, public fb: FormBuilder, public tipoEventoService: TipoEventoService,
        public eventoService: EventoService, public publicacionService: PublicacionService, public usuarioService: UsuarioService) {

        this.token = localStorage.getItem("userLogin");
        this.pl = JSON.parse(this.token);
        this.publicacion = new Publicacion();


    }

    ngOnInit() {

        this.cols = [
            { field: 'fecha', header: 'Fecha', width: '70px' },
            { field: 'hora', header: 'Hora', width: '70px' },
            { field: 'usuario', header: 'Usuario', width: '230px' },
            { field: 'nombre', header: 'Mascota', width: '120px' },
            { field: 'foto', header: 'Foto', width: '80px' },
            { field: 'sexo', header: 'Tipo/Sexo', width: '120px' },
            { field: 'condicion', header: 'Condicion', width: '90px' },
            { field: 'observacion', header: 'Observación', width: '120px' },
            { field: 'estado', header: 'Estado', width: '100px' },
        ];
        // this.getAllTipoevento();
        this.builderForm();

    }



    builderForm() {
        this.mf = this.fb.group({
            ubigeo: [null, [Validators.required]],

        });

    }

    getAllPublicacion() {
        this.publicacionService.getAll().subscribe((data: Publicacion[]) => {
            // this.publicaciones = data;
            this.publicaciones = data.filter(item => {
                return item.usuarioPublica.perfil.nombre != 'VISITANTE'
            });
            console.log(this.publicaciones);

        });

    }

    getAllPublicacionUser(idUser) {
        this.publicacionService.getAllFindById(idUser).subscribe((data: Publicacion[]) => {
            this.publicaciones = data;
            console.log(this.publicaciones);

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
                this.getAllPublicacionUser(this.usuario.id);
            } else {
                this.getAllPublicacion();
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
        this.tabla.reset();
        if (this.lastLazyLoadEvent) {
            this.loadLazy(this.lastLazyLoadEvent);
        }
    }

    showConfirmDelete(data) {
        this.messageService.clear();
        this.data = data;
        this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?' });
    }

    limpiarData() {
        this.id = undefined;
        this.tipoEvento = null;
        this.nombre = '';
        this.observacion= '';
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
                this.showMsg('error', errorMessage, 'Raza');

            }
        );
    }

    doAction(data, accion) {

        data.estadoPublicacion = accion;
        data.usuarioEvalua = this.usuario;
        data.observacion = this.observacion;
        this.udpdatePublicacion(data);
        this.modalRechazo = false;

    }

    showDialogRechazo(data){
        this.publicacion = data;
        this.modalRechazo = true;
    }

    linkUpdate(id) {
        return `/main/publicacion-editar/${id}`;
    }

    linkCitaMedica(id) {
        return `/main/publicacion-cita/${id}`;
    }

    showMsg(type: string, msg: string, title: string = 'publicacion') {
        this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
    }
}