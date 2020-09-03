import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { TamanoAnimal } from 'src/app/shared/model/tamanoanimal.model';
import { TipoEventoService } from 'src/app/shared/service/tipoevento.service';
import { TipoEvento } from 'src/app/shared/model/tipoevento.model';
import { Evento } from 'src/app/shared/model/evento.model';
import { EventoService } from 'src/app/shared/service/evento.service';
import { Ubigeo } from 'src/app/shared/model/ubigeo.model';
import { UbigeoService } from 'src/app/shared/service/ubigeo.service';
import * as moment from 'moment';

@Component({
  selector: 'app-eventopublica',
  templateUrl: './eventopublica.component.html',
  styleUrls: ['./eventopublica.component.scss']

})

export class EventoPublicaComponent implements OnInit {

  listaTipoEvento: TipoEvento[];
  tipoEvento: TipoEvento;
  tamanoAnimal: TamanoAnimal;
  nombre: string;
  estadoSelected: boolean = true;
  id: number;
  descripcion: string;
  direccion: string;
  model = new Evento();
  fecha: Date;
  hora: Date;
  filteredCities: Ubigeo[];
  ubigeo: Ubigeo;
  lastLazyLoadEvent: LazyLoadEvent;
  public saveProfile = true;
  mf: FormGroup;
  imagenUp: string;
  uploadedFiles: any[] = [];
  isEdit: boolean;
  es: any;
  fechaEvento: string;

  cols: any[];
  @ViewChild('dt', { static: true }) public tabla: Table;

  constructor(private route: ActivatedRoute, private messageService: MessageService, public fb: FormBuilder, private router: Router, public ubigeoService: UbigeoService,
    public tipoEventoService: TipoEventoService, public eventoService: EventoService) {
  }

  ngOnInit() {
    this.getAllTipoEvento();
    this.builderForm();
    this.loadModel();
    this.tipoEvento = new TipoEvento();

    this.cols = [
      { field: 'nombre', header: 'Tamaño ', width: '250px' },
      { field: 'estado', header: 'Estado', width: '150px' }
    ];

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

  builderForm() {
    this.mf = this.fb.group({
      ubigeo: [null, [Validators.required]],

    });

  }


  onSelectCiudad(e: Ubigeo) {
    this.mf.patchValue({
      'ubigeo': e
    });
  }

  filterCitiesByNombre(event) {
    const query = event.query;
    this.ubigeoService.findCity(query).subscribe(data => {
      this.filteredCities = data;
    });
  }

  getAllTipoEvento() {
    this.listaTipoEvento = [];
    this.tipoEventoService.getAll().subscribe(
      (data: TipoEvento[]) => {
        this.listaTipoEvento = data;

      },
      error => {
        this.listaTipoEvento = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.showMsg('danger', errorMessage, 'Tipo Evento');
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
    // this.listarTamanoAnimal();
  }

  doAction(data, accion) {
    if (accion == 'state') {
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
    this.model.titulo = this.nombre;
    this.model.descripcion = this.descripcion;
    this.model.direccion = this.direccion;
    this.model.fecha = this.fecha;
    this.fechaEvento = moment(this.fecha).format('YYYY-MM-DD HH:mm');
    this.model.fechaEvento = this.fechaEvento;
    this.model.fechaEvento = this.fechaEvento;
    this.model.estado = this.estadoSelected;
    this.model.ubigeo = this.ubigeo;
    this.model.tipoEvento = this.tipoEvento;
    this.model.banner = this.imagenUp;


  }

  limpiarData() {
    this.id = undefined;
    this.nombre = '';
    this.direccion = '';
    this.ubigeo = null;
    this.tipoEvento = null;
    this.fecha = null;
    this.descripcion = '';
    this.imagenUp = '';

  }

  showConshowConfirmDeletefirm(data) {
    this.messageService.clear();
    this.tamanoAnimal = data;
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?' });
  }

  onConfirm(data) {
    //this.deleteTamanoAnimal(data, 'Tamaño Animal eliminado correctamente');
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  onFileUpload(data: { files: File }): void {
    const formData: FormData = new FormData();
    const file = data.files[0];
    formData.append('file', file, file.name);
    this.eventoService.uploadImage(formData).subscribe(resp => {
      this.imagenUp = resp.url;
      this.showMsg('success', 'Imganen subida', 'Evento');
    });
  }

  save() {
    let message;


    if (this.tipoEvento.nombre == undefined || this.tipoEvento.nombre == '') {
      this.showMsg('info', 'Seleccione tipo de evento', 'Evento');
      return;
    }


    if (this.fecha == undefined) {
      this.showMsg('info', 'Ingrese una fecha y hora', 'Evento');
      return;
    }

    if (this.nombre == '' || this.nombre == undefined) {
      this.showMsg('info', 'Escriba un titulo', 'Evento');
      return;
    }

    if (this.descripcion == '' || this.descripcion == undefined) {
      this.showMsg('info', 'Escriba una descripción', 'Evento');
      return;
    }

    if (this.ubigeo == undefined) {
      this.showMsg('info', 'Ingrese una ciudad', 'Evento');
      return;
    }

    if (this.direccion == undefined || this.direccion == '') {
      this.showMsg('info', 'Ingrese una dirección', 'Evento');
      return;
    }

    if (this.imagenUp == undefined || this.imagenUp == '') {
      this.showMsg('info', 'Suba una imagen', 'Evento');
      return;
    }

    this.formToModel();

    this.eventoService.save(this.model).subscribe(
      data => {
        if (data != null) {
          this.showMsg('success', 'Se guardó correctamente', 'evento');
          this.limpiarData();
          this.returnListaEventos();
        }

      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.showMsg('error', errorMessage);
      }
    );

  }

  modelToForm(data) {

    this.tipoEvento = data.tipoEvento;
    this.imagenUp = data.banner;
    this.descripcion = data.descripcion;
    this.fecha = new Date(data.fecha);
    this.direccion = data.direccion;
    this.nombre = data.titulo;
    this.id = data.id;
    this.getCity(data.ubigeo);

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

  loadModel() {
    this.isEdit = this.route.snapshot.data.isEdit;
    if (this.isEdit) {
      this.route.params.subscribe(p => {
        const id = p['id'];
        this.eventoService.getFindId(id).subscribe((data: Evento) => {
          if (data) {
            this.model = data;
            this.modelToForm(data);

            // cargamos razas segun tipo animal
            // this.getRazaId(this.model.animal.raza.tipoAnimal.id);
          }
        });
      });


    }

  }

  showMsg(type: string, msg: string, title: string = 'Evento') {
    this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
  }

  returnListaEventos() {
    this.router.navigate(['/main/evento-lista']);

  }

  get textButtonAction() {
    return this.isEdit ? 'ACTUALIZAR' : 'GUARDAR';
  }

}