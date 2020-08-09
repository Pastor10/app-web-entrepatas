import { Component, OnInit, ViewChild } from '@angular/core';
import { TratamientoMedico } from 'src/app/shared/model/tratamientoMedico';
import { VeterinarioService } from 'src/app/shared/service/veterinario.service';
import { Veterinario } from 'src/app/shared/model/veterinario.model';
import { CitaMedica } from 'src/app/shared/model/citaMedica';
import { CitaMedicaService } from 'src/app/shared/service/cita.service';
import { AnimalService } from 'src/app/shared/service/animal.service';
import { Animal } from 'src/app/shared/model/animal.model';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-cita',
    templateUrl: './cita.component.html'

})



export class CitaMedicaComponent implements OnInit {

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

    veterinarios: Veterinario[];
    veterinario: Veterinario;

    estadosClinico: any[];
    estadoSelected: any;
    fechaVisita: Date;
    model = new CitaMedica()
    animal: Animal;
    historialDialog: boolean;
    today = new Date();
    filteredAnimales: any[];

    constructor(private route: ActivatedRoute, public veterinarioService: VeterinarioService,
        public citaMedicaService: CitaMedicaService, private messageService: MessageService,
        public animalService: AnimalService) {
        this.tratamientos = [];
        this.animal = new Animal();
    }

    ngOnInit(): void {

        this.getAllVeterinario();
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

        this.cols = [
            { field: 'medicina', header: 'Medicina' },
            { field: 'unidadMedida', header: 'Unid. Medida' },
            { field: 'cantidad', header: 'Cantidad' }
        ];

        this.estadosClinico = [
            { value: 'TRATAMIENTO', name: 'TRATAMIENTO' },
            { value: 'ALTA', name: 'ALTA' },
            { value: 'FALLECIDO', name: 'FALLECIDO' }
        ];
    }

    getAllVeterinario() {
        this.veterinarioService.getAll().subscribe((data: Veterinario[]) => {
            this.veterinarios = data;
            console.log('locales ', this.veterinarios);

        });

    }

    formToModel(): void {

        this.model.fechaVisita = this.fechaVisita;
        this.model.veterinario = this.veterinario;
        this.model.diagnostico = this.diagnostico;
        this.model.estadoClinico = this.estadoSelected.value;
        this.model.listaTratamiento = this.tratamientos;
        this.model.animal = this.animal;

        console.log('cita medica ', this.model);

    }



    loadModel() {
        this.isEdit = this.route.snapshot.data.isEdit;
        if (this.isEdit) {
            this.route.params.subscribe(p => {
                const id = p['id'];
                this.animalService.getFindId(id).subscribe((data: Animal) => {
                    if (data) {
                        //this.model = data;
                        this.animal = data;

                        console.log("model ", this.animal);

                        //this.modelToForm(data);
                    }
                });
            });
        }

    }

    modelToForm(data) {
        // this.fechaVisita = data.fechaVisita ;
        // this.veterinario = data.veterinario;
        // this.diagnostico = data.diagnostico ;
        this.animal = data;

    }


    showDialogToAdd() {
        this.newTratamiento = true;
        this.tratamiento = {};
        this.displayDialog = true;
    }

    showHistorialDialog() {
        this.historialDialog = true;
    }

    addTratamiento() {

        let tratamientos = [...this.tratamientos];
        if (this.newTratamiento)
            tratamientos.push(this.tratamiento);
        else
            tratamientos[this.tratamientos.indexOf(this.selectTratamiento)] = this.tratamiento;

        this.tratamientos = tratamientos;
        this.tratamiento = null;
        this.displayDialog = false;
    }


    saveCitaMedica() {
        if (this.veterinario==null) {
            this.showMsg('info', 'Seleccione un veterinario', 'Cita Medica');
            return;
        }

        if (this.fechaVisita==null) {
            this.showMsg('info', 'Ingrese una fecha', 'Cita Medica');
            return;
        }

        if (this.diagnostico==null || this.diagnostico==''  ) {
            this.showMsg('info', 'Ingrese un diagnostico', 'Cita Medica');
            return;
        }

        if(this.tratamientos.length==0){
            this.showMsg('info', 'Ingrese al menos un tratamiento', 'Cita Medica');
            return;
        }


        if (this.estadoSelected==null) {
            this.showMsg('info', 'Seleccione un estado', 'Cita Medica');
            return;
        }

        this.formToModel();
        this.citaMedicaService.save(this.model).subscribe(
            data => {
                if (data != null) {
                    this.showMsg('success', 'Se guardó correctamente', 'Cita Medica');
                    this.limpiarData();
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
        // setTimeout(function () {
           
        // }, 2500);

        // this.loadModel();
    }

    limpiarData(){
        this.veterinario = null;
        this.fechaVisita = null;
        this.diagnostico= '';
        this.tratamientos= [];
        this.estadoSelected= null;

    }

    onRowSelect(event) {
        this.newTratamiento = false;
        this.tratamiento = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: TratamientoMedico): TratamientoMedico {
        let tratamiento = {};
        for (let prop in c) {
            tratamiento[prop] = c[prop];
        }
        return tratamiento;
    }

    delete() {
        let index = this.tratamientos.indexOf(this.selectTratamiento);
        this.tratamientos = this.tratamientos.filter((val, i) => i != index);
        this.tratamiento = null;
        this.displayDialog = false;
    }

    changeEstado() {
        console.log('estado', this.estadoSelected);

    }


    filterAnimales(event) {
        let query = event.query;
        this.animalService.getAll().subscribe((animales: Animal[]) => {
            this.filterAnimal = this.filterMascota(query, animales);
        });

    }

    getAllAnimales(){
        this.animalService.getAll().subscribe((data: Animal[]) => {
            this.filterAnimal = data;
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
        console.log('animal', filtered);

        return filtered;
    }

    showMsg(type: string, msg: string, title: string = 'Cita Médica') {
        this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
    }

}