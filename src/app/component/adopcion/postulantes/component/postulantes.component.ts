import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/model/User.model';
import { Publicacion } from 'src/app/shared/model/publicacion.model';
import { PublicacionService } from 'src/app/shared/service/publicacion.service';
import { PostulanteService } from 'src/app/shared/service/postulante.service';
import { Postulante } from 'src/app/shared/model/postulante.model';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { AdopcionService } from 'src/app/shared/service/adopcion.service';
import { Adopcion } from 'src/app/shared/model/adopcion.model';
import { Estado } from 'src/app/shared/model/estado.model';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { Pregunta } from 'src/app/shared/model/pregunta.model';
import { Opcion } from 'src/app/shared/model/opcion.model';
import { Cuestionario } from 'src/app/shared/model/cuestionario.model';
import { CuestionarioService } from 'src/app/shared/service/cuestionario.service';
import { DetalleCuestionario } from 'src/app/shared/model/detalleCuestionario.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'app-postulantes',
    templateUrl: './postulantes.component.html',
    styleUrls: ['./postulantes.component.scss']

})

export class PostulanteComponent implements OnInit {


    responsiveOptions;
    publicaciones: Publicacion[];
    totalRecords: 10;
    perPage = 10;
    cols: any[];
    colsPostulantes: any[];
    publicacionSelected: Publicacion;
    postulantes: Postulante[];
    puntuacion: number;
    postulante: Postulante;
    msgs: Message[] = [];
    creaUser: boolean = false;
    adopcion: Adopcion;
    estadoAdopcion: Estado;
    user: User;
    perfil: Perfil;
    display: boolean = false;
    mayorEdad: number;
    vivencia: number;
    propiedad: number;
    acuerdo: number;
    pregunta: Pregunta;
    opcion: Opcion;
    listaDetalle: DetalleCuestionario[];
    detalleCuestionario: DetalleCuestionario;
    cuestionario: Cuestionario;
    showCuestionario: boolean = false;
    showAdopcion: boolean = false;
    nombrePostulante: string;
    nombreMascota: string;

    constructor(public publicacionService: PublicacionService,
        public postulanteService: PostulanteService, public messageService: MessageService, public cuestionarioService: CuestionarioService,
        private confirmationService: ConfirmationService, public adopcionService: AdopcionService) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];

    }

    ngOnInit() {
        this.getAllPublicacion();
        this.cols = [
            { field: 'fecha', header: 'Fecha', width: '100px' },
            { field: 'hora', header: 'Hora', width: '80px' },
            { field: 'usuario', header: 'Usuario publica', width: '250px' },
            { field: 'nombre', header: 'Mascota', width: '100px' },
            { field: 'foto', header: 'Foto', width: '80px' },
            { field: 'sexo', header: 'Tipo/Sexo', width: '120px' },
            { field: 'condicion', header: 'Condición', width: '150px' },
            { field: 'cantidad', header: 'Total', width: '80px' },
            { field: 'estado', header: 'Estado', width: '100px' },
        ];

        this.colsPostulantes = [
            { field: 'nombres', header: 'Nombres', width: '170px' },
            { field: 'correo', header: 'Correo', width: '200px' },
            { field: 'direccion', header: 'Dirección', width: '200px' },
            { field: 'celular', header: 'Celular', width: '120px' },
            { field: 'documento', header: 'Documento', width: '120px' },
            { field: 'puntuacion', header: 'Puntuación', width: '150px' }
        ];
    }


    getAllPublicacion() {
        this.publicacionService.getAllCondicionAdopcion().subscribe((data: Publicacion[]) => {
            this.publicaciones = data;
            console.log(this.publicaciones );
            
        });

    }

    getAllPostulantesByPublicacion(publicacion) {
        this.nombreMascota = publicacion.animal.nombre;
        this.postulanteService.getAllByPublicacionId(publicacion).subscribe((data: Postulante[]) => {
            this.postulantes = data;

        });
        this.display = true;
    }

    calificar(data) {
        this.limpiarOpciones();
        this.postulante = data;
        console.log('postulante', this.postulante);

        this.nombrePostulante = this.postulante.persona.nombreCompleto.toUpperCase();

        if (this.postulante.cuestionario != null) {
            this.modelCuestionarioToForm(data);
        }
        this.showCuestionario = true;
        this.showAdopcion = false;
    }

    showConfirm(data) {
        this.postulante = data;
        this.nombrePostulante = this.postulante.persona.nombreCompleto.toUpperCase();
        this.showAdopcion = true;
        this.showCuestionario = false;
        //this.messageService.clear();
        //this.data = data;
        //this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Esta seguro de generar adopción?' });
    }



    confirm1() {
        this.confirmationService.confirm({
            message: 'Esta seguro de generar adopción?',
            header: 'Generando adopción',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
            },
            reject: () => {
                this.msgs = [{ severity: 'error', summary: 'Rejected', detail: 'You have rejected' }];
            }
        });
    }

    onReject() {
        this.messageService.clear('c');
    }

    formToModel(data) {
        this.adopcion = new Adopcion();
        this.adopcion.animal = data.publicacion.animal;
        this.adopcion.persona = data.persona;
        this.adopcion.createUser = this.creaUser;

    }

    onConfirm() {
        let message;
        this.formToModel(this.postulante);
        this.adopcionService.save(this.adopcion).subscribe(res => {
            if (res != null) {
                message = 'Se registro la adopción correctamente';
                this.showSaveCuestionario('success', message, 'Adopción');
                this.salirDialog();
                this.getAllPublicacion();

            }
        }, error => {
            const errorMessage =
                error.message != undefined
                    ? error.error.mensaje
                    : 'No se pudo procesar la petición';
            this.showSaveCuestionario('error', errorMessage, 'Adopción');
        });

    }


    showMsg(type: string, msg: string, title: string) {
        this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
    }



    showSaveCuestionario(type: string, msg: string, title: string) {
        this.messageService.add({ key: 'cuestionario', severity: type, summary: title, detail: msg });
    }

    showPostulantes() {
        this.display = true;
    }

    salirDialog() {
        this.display = false;
        this.showCuestionario = false;
        this.showAdopcion = false;
    }

    modelCuestionarioToForm(data) {
        let count = 1;
        //this.cuestionario = new Cuestionario();
        // this.cuestionario = data.cuestionario;
        data.cuestionario.listaDetalle.forEach(item => {
            if (count == 1) {
                this.mayorEdad = item.opcion.id;
            }
            if (count == 2) {
                this.vivencia = item.opcion.id;
            }
            if (count == 3) {
                this.propiedad = item.opcion.id;
            }
            if (count == 4) {
                this.acuerdo = item.opcion.id;
            }

            count++;
        });


    }

    guardarCuestionario() {
        if (this.postulante.cuestionario == null) {
            this.cuestionario = new Cuestionario();
            this.cuestionario.idPostulante = this.postulante.id;
            this.listaDetalle = [];
            for (let i = 1; i <= 4; i++) {
                this.detalleCuestionario = new DetalleCuestionario();

                this.opcion = new Opcion();
                this.pregunta = new Pregunta();
                this.pregunta.id = i;
                if (i == 1) {
                    this.opcion.id = this.mayorEdad
                }
                if (i == 2) {
                    this.opcion.id = this.vivencia;
                }
                if (i == 3) {
                    this.opcion.id = this.propiedad
                }
                if (i == 4) {
                    this.opcion.id = this.acuerdo;
                }
                this.detalleCuestionario.opcion = this.opcion;
                this.detalleCuestionario.pregunta = this.pregunta;
                this.listaDetalle.push(this.detalleCuestionario);

            }
            this.cuestionario.listaDetalle = this.listaDetalle;
        } else {
            let count = 1;
            this.cuestionario.idPostulante = this.postulante.id;
            this.cuestionario.listaDetalle.forEach(item => {
                if (count == 1) {
                    item.opcion.id = this.mayorEdad
                }
                if (count == 2) {
                    item.opcion.id = this.vivencia;
                }
                if (count == 3) {
                    item.opcion.id = this.propiedad
                }
                if (count == 4) {
                    item.opcion.id = this.acuerdo;
                }

                count++;
            });
        }

        let message;
        this.cuestionarioService.save(this.cuestionario).subscribe(res => {
            if (res != null) {
                message = 'El cuestionario se guardo correctamente';
                this.showSaveCuestionario('success', message, 'Postulante');
                this.getAllPostulantesByPublicacion(this.postulante.publicacion)
                //this.showMsg('success', message, 'Postulante');
            }
        });

        this.limpiarOpciones();
        this.showCuestionario = false;

    }

    limpiarOpciones() {
        this.mayorEdad = null;
        this.vivencia = null
        this.propiedad = null;
        this.acuerdo = null;
    }

}