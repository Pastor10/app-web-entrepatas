import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/model/User.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { AnimalService } from 'src/app/shared/service/animal.service';
import { Animal } from 'src/app/shared/model/animal.model';
import { TipoDocumento } from 'src/app/shared/model/tipoDocumento.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipodocumento.service';
import { UbigeoService } from 'src/app/shared/service/ubigeo.service';
import { Ubigeo } from 'src/app/shared/model/ubigeo.model';
import { SolicitudAdopcionService } from 'src/app/shared/service/solicitudAdopcion.service';
import { MessageService, SelectItem } from 'primeng/api';
import { PublicacionService } from 'src/app/shared/service/publicacion.service';
import { Publicacion } from 'src/app/shared/model/publicacion.model';
import { PostulanteService } from 'src/app/shared/service/postulante.service';
import { Postulante } from 'src/app/shared/model/postulante.model';
import { Persona } from 'src/app/shared/model/persona.model';
import { PersonaService } from 'src/app/shared/service/persona.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


@Component({
    selector: 'app-adopta',
    templateUrl: './adopta.component.html',
    styleUrls: ['./adopta.component.scss']

})

export class AdoptaComponent implements OnInit {


    responsiveOptions;
    animales: Animal[];
    layout;
    displayDialog;
    selectAnimal: Animal;
    selectPublicacion: Publicacion;
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    documento: string;
    celular: number= undefined;
    email: string;
    direccion: string;
    tipoDocumento: TipoDocumento;
    listTipoDocumento: TipoDocumento[];
    filteredCities: Ubigeo[];
    ubigeo: Ubigeo;
    data = new Postulante();
    sortOptions: SelectItem[];
    sortKey: string;
    sortField: string;
    sortOrder: number;
    publicaciones: Publicacion[];
    persona: Persona;

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

    constructor(public animalService: AnimalService, public tipoDocumentoService: TipoDocumentoService,
        public ubigeoService: UbigeoService, public solicitudAdopcionService: SolicitudAdopcionService,
        public messageService: MessageService, public publicacionService: PublicacionService,
        public postulanteService: PostulanteService, public personaService: PersonaService) {

        this.persona = new Persona();

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

        this.sortOptions = [
            { label: 'Macho', value: 'macho' },
            { label: 'Hembra', value: 'hembra' },
            { label: 'Perdidos', value: 'brand' }
        ];

    }

    ngOnInit() {
        this.getAllTipoDocumento();
        this.getAllPublicacion();
        this.layout = 'grid';
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }


    getAllPublicacion() {
        this.publicacionService.getAllAprobados().subscribe((data: Publicacion[]) => {
            this.publicaciones = data;
            console.log(data);

        });
    }

    getAllTipoDocumento() {
        this.tipoDocumentoService.getAll().subscribe((data: TipoDocumento[]) => {
            this.listTipoDocumento = data;
        });
    }

    filterCitiesByNombre(event) {
        const query = event.query;
        this.ubigeoService.findCity(query).subscribe(data => {
            this.filteredCities = data;
        });
    }

    getPublicacion(event: Event, publicacion: Publicacion) {
        this.limpiarData();
        this.selectPublicacion = publicacion;
        this.displayDialog = true;
        event.preventDefault();
    }

    formToModel() {
        this.persona.nombre = this.nombres;
        this.persona.apeMaterno = this.apeMaterno;
        this.persona.apePaterno = this.apePaterno;
        this.persona.ubigeo = this.ubigeo;
        this.persona.direccion = this.direccion;
        this.persona.correo = this.email;
        this.persona.celular = this.celular;
        this.persona.numeroDocumento = this.documento;
        this.persona.tipoDocumento = this.tipoDocumento;
        this.persona.nombreCompleto = this.nombres + ' ' + this.apePaterno + ' ' + this.apeMaterno;
        this.data.estado = true;
        this.data.publicacion = this.selectPublicacion;
        this.data.persona = this.persona;
        console.log(this.data);

    }

    save() {

        let documento = this.documento == undefined ? '' : this.documento;
        let nombres = this.nombres == undefined ? '' : this.nombres;
        let apePaterno = this.apePaterno == undefined ? '' : this.apePaterno;
        let apeMaterno = this.apeMaterno == undefined ? '' : this.apeMaterno;
        let email = this.email == undefined ? '' : this.email;
        let direccion = this.direccion == undefined ? '' : this.direccion;
        let ubigeo = this.ubigeo != undefined ? this.ubigeo.nombre : undefined;
        let celular = this.celular;



        if (this.tipoDocumento == null) {
            this.showMsg('info', 'Seleccione tipo documento', 'Solicitud');
            return;
        }

        if (documento.trim() == '') {
            this.showMsg('info', 'Ingrese un documento de identidad', 'Solicitud');
            return;
        }

        if (nombres.trim() == '') {
            this.showMsg('info', 'Ingrese nombres', 'Solicitud');
            return;
        }

        if (apePaterno.trim() == '') {
            this.showMsg('info', 'Ingrese apellido paterno', 'Solicitud');
            return;
        }

        if (apeMaterno.trim() == '') {
            this.showMsg('info', 'Ingrese apellido materno', 'Solicitud');
            return;
        }

        if (email.trim() == '') {
            this.showMsg('info', 'Ingrese un correo', 'Solicitud');
            return;
        }

        if (ubigeo == undefined) {
            this.showMsg('info', 'Ingrese un ciudad de residencia', 'Solicitud');
            return;
        }

        if (direccion.trim() == '') {
            this.showMsg('info', 'Ingrese una dirección', 'Solicitud');
            return;
        }

        if(celular == undefined || celular==0){
            this.showMsg('info', 'Ingrese número de celular', 'Solicitud');
            return;
        }


        this.formToModel();
        let message;

        this.postulanteService.save(this.data).subscribe((res) => {
            if (res != null) {
                message = 'Solicitud enviada correctamente.';
                this.showMsg('success', message, 'Solicitud');
                this.limpiarData();
            }
        }, error => {
            const errorMessage = error.error.mensaje != undefined ? error.error.mensaje : 'No se pudo procesar la petición. Error ' + error.status;
            this.showMsg('error', errorMessage, 'Solicitud');

        });
    }

    getPersona() {
        const params = [
            `documento=${this.documento}`
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

                this.limpiarDataBusqueda();

            }
        );

    }

    modelToForm(data) {

        this.nombres = data.nombre;
        this.apeMaterno = data.apeMaterno
        this.apePaterno = data.apePaterno
        this.persona.ubigeo = this.ubigeo;
        this.direccion = data.direccion
        this.email = data.correo;
        this.celular = data.celular;
        this.documento = data.numeroDocumento;
        this.tipoDocumento = data.tipoDocumento;
        this.getCity(data.ubigeo);
        console.log(this.data);

    }

    getCity(ubigeo: Ubigeo) {
        const params = [
            `codDepartamento=${ubigeo.codDepartamento}`,
            `codProvincia=${ubigeo.codProvincia}`,
            `codDistrito=${ubigeo.codDistrito}`
        ];
        this.ubigeoService.getCity(params.join('&')).subscribe(
            data => {
                if (data != null) {
                    this.ubigeo = data;
                }

            }
        );

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

    limpiarData() {
        this.displayDialog = false;
        this.nombres = '';
        this.apeMaterno = '';
        this.apePaterno = '';
        this.direccion = '';
        this.documento = '';
        this.tipoDocumento = null;
        this.ubigeo = null;
        this.email = '';
        this.celular = null;

    }
    limpiarDataBusqueda() {
        this.nombres = '';
        this.apeMaterno = '';
        this.apePaterno = '';
        this.direccion = '';
        this.ubigeo = null;
        this.email = '';
        this.celular = null;

    }

    showMsg(type: string, msg: string, title: string) {
        this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
    }
}