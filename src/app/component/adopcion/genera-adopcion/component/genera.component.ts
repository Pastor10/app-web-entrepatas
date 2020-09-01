import { Component, OnInit, ViewChild } from '@angular/core';
import { TratamientoMedico } from 'src/app/shared/model/tratamientoMedico';
import { VeterinarioService } from 'src/app/shared/service/veterinario.service';
import { Veterinario } from 'src/app/shared/model/veterinario.model';
import { CitaMedica } from 'src/app/shared/model/citaMedica';
import { CitaMedicaService } from 'src/app/shared/service/cita.service';
import { AnimalService } from 'src/app/shared/service/animal.service';
import { Animal } from 'src/app/shared/model/animal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Persona } from 'src/app/shared/model/persona.model';
import { TipoDocumento } from 'src/app/shared/model/tipoDocumento.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipodocumento.service';
import { UbigeoService } from 'src/app/shared/service/ubigeo.service';
import { Ubigeo } from 'src/app/shared/model/ubigeo.model';
import { AdopcionService } from 'src/app/shared/service/adopcion.service';
import { Adopcion } from 'src/app/shared/model/adopcion.model';
import { PersonaService } from 'src/app/shared/service/persona.service';


@Component({
    selector: 'app-genera-adopcion',
    templateUrl: './genera.component.html',
    styleUrls: ['./genera.component.scss']

})



export class GeneraAdopcionComponent implements OnInit {

    es: any;

    isEdit: boolean;
    displayDialog: boolean;
    diagnostico: string;
    filterAnimal: Animal[];
    tratamiento: TratamientoMedico = {};
    selectTratamiento: TratamientoMedico;

    newTratamiento: boolean;

    tratamientos: TratamientoMedico[];

    cols: any[];
    filteredCities: Ubigeo[];
    veterinarios: Veterinario[];
    veterinario: Veterinario;

    estadosClinico: any[];
    createUser: boolean=false;
    fechaAdopcion: Date;
    model = new Adopcion()
    animal: Animal;
    historialDialog: boolean;
    persona: Persona;
    listTipoDocumento: TipoDocumento[];
    
    constructor(private route: ActivatedRoute, private router: Router,public tipoDocumentoService: TipoDocumentoService,
        public citaMedicaService: CitaMedicaService, private messageService: MessageService, public personaService: PersonaService,
        public animalService: AnimalService, public ubigeoService: UbigeoService, public adopcionService: AdopcionService) {
        this.tratamientos = [];
        this.animal = new Animal();
        this.persona = new Persona();
    }

    ngOnInit(): void {

        this.getAllTipoDocumento();
        this.loadModel();
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            today: 'Hoy',
            clear: 'Borrar'
        }
    }

    getAllTipoDocumento() {
        this.tipoDocumentoService.getAll().subscribe((data: TipoDocumento[]) => {
            this.listTipoDocumento = data;

        });
    }

    // this.cities1 = [ {label:'Select City', value:null}, {label:'New York', value:{id:1, name: 'New York', code: 'NY'}}, 
    // {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}}, {label:'London', value:{id:3, name: 'London', code: 'LDN'}}, 
    // {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}}, {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}} ];

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

    formToModel(): void {

        this.model.persona = this.persona;
        this.model.animal = this.animal;
        this.model.fechaCreacion = this.fechaAdopcion
        this.model.createUser = this.createUser;


    }

    modelToForm(data) {
        this.persona.nombre = data.nombre;
        this.persona.apePaterno = data.apePaterno;
        this.persona.apeMaterno = data.apeMaterno;
        this.persona.correo = data.correo;

        this.persona.tipoDocumento = data.tipoDocumento;
        this.persona.direccion = data.direccion;
        this.persona.celular = data.celular;


    }

    modelAdopcionToForm(data) {

        //animal
        this.animal = data.animal;
        this.persona.nombre = data.persona.nombre;
        this.persona.apePaterno = data.persona.apePaterno;
        this.persona.apeMaterno = data.persona.apeMaterno;
        this.persona.correo = data.persona.correo;
        this.persona.numeroDocumento= data.persona.numeroDocumento;
        this.persona.fechaNacimiento = data.persona.fechaNacimiento;
        this.persona.tipoDocumento = data.persona.tipoDocumento;
        this.persona.direccion = data.persona.direccion;
        this.persona.celular = data.persona.celular;
        this.getCity(data.persona.ubigeo);

    }

    loadModel() {
        this.isEdit = this.route.snapshot.data.isEdit;
        if (this.isEdit) {
          this.route.params.subscribe(p => {
            const id = p['id'];
            this.adopcionService.getFindId(id).subscribe((data: Adopcion) => {
              if (data) {
                //this.model = data;
                this.modelAdopcionToForm(data);
    
              }
            });
          });
    
    
        }
        
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
                    this.persona.ubigeo = data;
                }
               
            }
        );

    }


    showHistorialDialog() {
        this.historialDialog = true;
    }


    saveGeneraAdopcion() {


        if(this.isEdit){
            this.router.navigate(['/main/adopciones']);
            //this.returnAdopciones();
        }else{
            this.formToModel();
            this.adopcionService.save(this.model).subscribe(
                data => {
                    if (data != null) {
                        this.showMsg('success', 'Se guardó correctamente', 'Adopción');
                    }
    
                },
                error => {
                    const errorMessage =
                        error.message != undefined
                            ? error.message
                            : 'No se pudo procesar la petición';
                    this.showMsg('danger', errorMessage);
                }
            );
        }

   

    }

    getPersona() {
        const params = [
            `documento=${this.persona.numeroDocumento}`
        ];
        this.personaService.getByDocumento(params.join('&')).subscribe(
            data => {
                if (data != null) {
                    this.modelToForm(data);
                }

            }
        );

    }

    filterCitiesByNombre(event) {
        const query = event.query;
        this.ubigeoService.findCity(query).subscribe(data => {
            this.filteredCities = data;
        });
    }


    filterAnimales(event) {
        let query = event.query;
        this.animalService.getAll().subscribe((animales: Animal[]) => {
            this.filterAnimal = this.filterMascota(query, animales);
        });

    }

    filterMascota(query, animales: Animal[]): any[] {
        let filtered: Animal[] = [];
        for (let i = 0; i < animales.length; i++) {
            let animal = animales[i];
            if (animal.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(animal);
            }
        }
        return filtered;
    }

    showMsg(type: string, msg: string, title: string = 'Adopción') {
        this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
    }

    get textButtonAction() {
        return this.isEdit ? 'REGRESAR' : 'GUARDAR';
    }

    returnAdopciones() {
        return `/main/adopciones`;
      }
}