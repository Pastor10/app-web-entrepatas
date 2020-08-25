import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService } from 'src/app/shared/service/tipodocumento.service';
import { PersonaService } from 'src/app/shared/service/persona.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TipoDocumento } from 'src/app/shared/model/tipoDocumento.model';
import { Persona } from 'src/app/shared/model/persona.model';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PostulanteColaborador } from 'src/app/shared/model/postulantecolaborador.model';
import { Pregunta } from 'src/app/shared/model/pregunta.model';
import { Opcion } from 'src/app/shared/model/opcion.model';
import { Cuestionario } from 'src/app/shared/model/cuestionario.model';
import { DetalleCuestionario } from 'src/app/shared/model/detalleCuestionario.model';
import { element } from 'protractor';
import { PostulanteService } from 'src/app/shared/service/postulante.service';


@Component({
    selector: 'app-unete',
    templateUrl: './unete.component.html'

})

export class UneteComponent implements OnInit {

    listTipoDocumento: TipoDocumento[];
    public apPaterno: string;
    public apMaterno: string;
    public repetPassword: string;
    public nombres: string;
    public persona: Persona;
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    correo: string;
    celular: number;
    display: boolean = false;
    politica: boolean = false;
    postulanteColaborador: PostulanteColaborador = new PostulanteColaborador();
    hogar: number;
    tratoAnimal: any;
    experiencia: any;
    pregunta: Pregunta;
    opcion: Opcion;
    cuestionario: Cuestionario;
    listaDetalle: DetalleCuestionario[];
    detalleCuestionario: DetalleCuestionario;

    public numberMask = createNumberMask({
        prefix: '',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: '.',
        decimalLimit: 1,
        integerLimit: 12,
        requireDecimal: false,
        allowNegative: false,
        allowLeadingZeroes: true
    });

    constructor(public router: Router,
        public messageService: MessageService, public tipoDocumentoService: TipoDocumentoService, 
        public personaService: PersonaService, public postulanteService: PostulanteService) {
    }

    ngOnInit() {
        this.getAllTipoDocumento();
    }

    getAllTipoDocumento() {
        this.tipoDocumentoService.getAll().subscribe((data: TipoDocumento[]) => {
            this.listTipoDocumento = data;
        });
    }

    public filterListTipoDocumento(event) {
        let query = event.query
        this.listTipoDocumento = this.filterDocumento(query, this.listTipoDocumento);

    }

    filterDocumento(query, lista: TipoDocumento[]): TipoDocumento[] {
        let filtered: TipoDocumento[] = [];
        for (let i = 0; i < lista.length; i++) {
            let model = lista[i];
            if (model.abreviatura.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(model);
            }
        }
        return filtered;
    }

    modelToForm(data) {

        this.nombres = data.nombre;
        this.apMaterno = data.apeMaterno
        this.apPaterno = data.apePaterno
        this.correo = data.correo;
        this.numeroDocumento = data.numeroDocumento;
        this.tipoDocumento = data.tipoDocumento;
        this.celular = data.celular;

        console.log(data);

    }

    soloLetras(e) {
        var tecla = (document.all) ? e.keyCode : e.which;

        //Tecla de retroceso para borrar, siempre la permite
        if (tecla == 8) {
            return true;
        }
        var patron = /[A-Za-z ]/;
        var tecla_final = String.fromCharCode(tecla);
        return patron.test(tecla_final);
    }

    getPersona() {

        const params = [
            `documento=${this.numeroDocumento}`
        ];
        this.personaService.getByDocumento(params.join('&')).subscribe(
            data => {
                if (data != null) {
                    this.modelToForm(data);

                }
            }, error => {
                const errorMessage = error.error.mensaje != undefined ? error.error.mensaje : 'No se pudo procesar la petición. Error ' + error.status;
                // this.showMsg('error', errorMessage, 'Solicitud');
                console.log('error', errorMessage);
                // this.limpiarDataBusqueda();

            }
        );

    }

    formToModel() {

        this.persona = new Persona();
        this.persona.nombre = this.nombres;
        this.persona.apePaterno = this.apPaterno;
        this.persona.apeMaterno = this.apMaterno;
        this.persona.nombreCompleto = this.nombres + ' ' + this.apPaterno + ' ' + this.apMaterno;
        this.persona.tipoDocumento = this.tipoDocumento;
        this.persona.numeroDocumento = this.numeroDocumento;
        this.persona.correo = this.correo;
        this.persona.celular = this.celular;

        this.postulanteColaborador.persona = this.persona;

        this.cuestionario = new Cuestionario;
        this.listaDetalle = [];

        this.detalleCuestionario = new DetalleCuestionario();
        this.opcion = new Opcion();
        this.pregunta = new Pregunta();
        this.pregunta.id = 5;
        this.opcion.id = this.hogar;
        this.detalleCuestionario.opcion = this.opcion;
        this.detalleCuestionario.pregunta = this.pregunta;
        this.listaDetalle.push(this.detalleCuestionario)

        this.tratoAnimal.forEach(element => {
            this.detalleCuestionario = new DetalleCuestionario();
            this.opcion = new Opcion();
            this.pregunta = new Pregunta();
            this.pregunta.id = 6;
            this.opcion.id = element;
            this.detalleCuestionario.opcion = this.opcion;
            this.detalleCuestionario.pregunta = this.pregunta;
            this.listaDetalle.push(this.detalleCuestionario)
        })

        this.experiencia.forEach(element => {
            this.detalleCuestionario = new DetalleCuestionario();
            this.opcion = new Opcion();
            this.pregunta = new Pregunta();
            this.pregunta.id = 7;
            this.opcion.id = element;
            this.detalleCuestionario.opcion = this.opcion;
            this.detalleCuestionario.pregunta = this.pregunta;
            this.listaDetalle.push(this.detalleCuestionario)
        });

        this.cuestionario.listaDetalle = this.listaDetalle

        this.postulanteColaborador.cuestionario = this.cuestionario;
        console.log(this.postulanteColaborador);


    }

    save() {
        let message;
        if (this.tipoDocumento == undefined) {
            message = 'Seleccione tipo documento';
            this.showMsg('info', message, 'Colaborador');
            return;
          }
      
          if (this.numeroDocumento== null || this.numeroDocumento == '') {
            message = 'Escriba número documento';
            this.showMsg('info', message, 'Colaborador');
            return;
          }
      
          if (this.nombres == null || this.nombres == '') {
            message = 'Escriba su nombre';
            this.showMsg('info', message, 'Colaborador');
            return;
          }
      
      
          if (this.apPaterno == null || this.apPaterno == '') {
            message = 'Escriba apellido paterno';
            this.showMsg('info', message, 'Colaborador');
            return;
          }
      
          if (this.apMaterno == null || this.apMaterno == '') {
            message = 'Escriba apellido materno';
            this.showMsg('info', message, 'Colaborador');
            return;
          }
      
          if (this.correo == null || this.correo == '') {
            message = 'Escriba un correo ';
            this.showMsg('info', message, 'Colaborador');
            return;
          }

          if (this.celular == null || this.celular == 0) {
            message = 'Escriba un número de celular ';
            this.showMsg('info', message, 'Colaborador');
            return;
          }

          if (this.hogar == null || this.hogar == 0) {
            message = 'Seleccione una opción para la preguna 1 ';
            this.showMsg('info', message, 'Colaborador');
            return;
          }

          if (this.tratoAnimal == null || this.tratoAnimal == 0) {
            message = 'Seleccione al menos una opción para la preguna 2 ';
            this.showMsg('info', message, 'Colaborador');
            return;
          }

          if (this.experiencia == null || this.experiencia == 0) {
            message = 'Seleccione al menos una opción para la preguna 3 ';
            this.showMsg('info', message, 'Colaborador');
            return;
          }
         
  
       

        this.formToModel();
        this.postulanteService.saveColaborador(this.postulanteColaborador).subscribe((res) => {
            if (res != null) {
              message = 'Se envio la solicitud correctamente.';
              this.showMsg('success', message, 'Colaborador');
              this.limpiarData();
            }
          }, error => {
            const errorMessage = error.error.mensaje != undefined ? error.error.mensaje : 'No se pudo procesar la petición. Error ' + error.status;
           // this.showMsg('error', errorMessage, 'Usuario');
           this.showMsg('error', errorMessage, 'Colaborador');
      
          });
        
    }

    limpiarData(){

        this.apPaterno="";
        this.apMaterno=""
        this.nombres='';
        this.tipoDocumento=null;
        this.numeroDocumento= '';
        this.correo='';
        this.celular=null;
        this.hogar=null;
        this.tratoAnimal= null;
        this.experiencia= null;
    }

    showMsg(type: string, msg: string, title: string) {
        this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
      }
}