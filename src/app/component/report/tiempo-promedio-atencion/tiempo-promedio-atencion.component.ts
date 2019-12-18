import { Component, OnInit } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ReportePromedio } from 'src/app/shared/model/reportePromedio.model';
import { ReporteQuery } from 'src/app/shared/model/reporteQuery.model';
import { Oficina } from 'src/app/shared/model/oficina.model';
import { ReporteService } from 'src/app/shared/service/reporteservice.service';
import { SelectItem } from 'primeng/api';
import { OficinaService } from 'src/app/shared/service/oficina.service';
import { Item } from 'src/app/shared/model/item.model';

@Component({
  selector: 'app-tiempo-promedio-atencion',
  templateUrl: './tiempo-promedio-atencion.component.html',
  styleUrls: ['./tiempo-promedio-atencion.component.css']
})
export class TiempoPromedioAtencionComponent implements OnInit {
  public labelFechaInicio: string;
  public labelFechaFin: string;
  public showFechaInicio: boolean;
  public showFechaFin: boolean;
  public periodoSelected: Item;
  public dateInicioSelected: Date;
  public dateFinSelected: Date;
  public oficinas: SelectItem[] = [];
  public selectedOficinas: string[] = [];
  public listOficina: Oficina[] = [];
  public fechaInicio: Date;
  public idsOficina: Array<number> = new Array<number>();
  public reporteQuery: ReporteQuery;
  public listItem: ReportePromedio[];
  public es: any;
  public events: string[] = [];
  public periodos: Item[];

  constructor(
    public alertService: AlertService,
    public reporteService: ReporteService,
    public oficinaService: OficinaService
  ) {
    this.labelFechaInicio = 'Fecha';
    this.labelFechaFin = 'Fecha fin';
    this.showFechaInicio = false;
    this.showFechaFin = false;
    this.loadOficinas();
  }
  get filterfecha() {
    return  "fechas ";
  }
  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado'
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic'
      ],
      today: 'Hoy',
      clear: 'Borrar'
    };
    this.periodos = [new Item('Diario', 'D'), new Item('Mensual', 'M')];
  }

  public onChange() {
    this.listItem = [];
    if (this.periodoSelected != undefined) {
      if (this.periodoSelected.code.indexOf('M') != -1) {
        this.showFechaInicio = true;
        this.showFechaFin = true;
        this.labelFechaInicio = 'Fecha Inicio';
      } else {
        this.dateFinSelected = undefined;
        this.showFechaInicio = true;
        this.showFechaFin = false;
        this.labelFechaInicio = 'Fecha';
      }
      this.idsOficina = [];
      this.selectedOficinas.forEach(o => {
        const id: SelectItem = this.oficinas.find(obj => obj.value.localeCompare(o) == 0);
        if (id != undefined) {
          this.idsOficina.push(Number(id.title));
        }
      });
      if (this.dateInicioSelected != undefined && this.idsOficina.length > 0) {
        this.search();
      }
    }
  }

  public loadOficinas() {
    this.oficinaService.getAll().subscribe(
      data => {
        this.listOficina = <Oficina[]>data;
        this.listOficina.forEach(o => {
          const obj = {
            label: o.nombre,
            value: o.nombre,
            title: o.idOficina + ''
          };
          this.oficinas.push(obj);
        });
      },
      error => {
        this.listOficina = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public search() {
    if (this.oficinas.length == 0) {
      this.alertService.danger('Seleccione al menos una oficina');
      return;
    }
    if (
      this.periodoSelected.code.indexOf('M') != -1 &&
      this.dateFinSelected == undefined
    ) {
      return;
    }

    this.reporteQuery = new ReporteQuery();
    this.reporteQuery.fechaInicio = this.dateInicioSelected;
    this.reporteQuery.fechaFin = this.dateFinSelected;
    this.reporteQuery.idsOficina = this.idsOficina;
    this.reporteService.tiempoPromedio(this.reporteQuery).subscribe(
      data => {
        console.log("TIEMPO PROMEDIO \n")
        console.log(data)
        this.listItem = <ReportePromedio[]>data;
      },
      error => {
        this.listItem = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }
}
