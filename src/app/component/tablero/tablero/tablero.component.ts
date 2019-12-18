import {Component, OnInit, ViewChild} from '@angular/core';
import {TableroService} from 'src/app/shared/service/tablero.service';
import {Tablero} from 'src/app/shared/model/tablero.model';
import {TipoTicket} from 'src/app/shared/model/tipoTicket.model';
import {TipoTicketService} from 'src/app/shared/service/tipoTicket.service';
import {AlertService} from 'ngx-alerts';
import {TicketsEnEspera} from 'src/app/shared/model/ticketsEnEspera';
import {TicketsEnVentanilla} from 'src/app/shared/model/ticketsEnVentanilla';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  public color;
  public listTipoTicket: TipoTicket[];
  public listTablero: Tablero[];
  public listTicketsEnEspera: TicketsEnEspera[];
  public listTicketsEnVentanilla: TicketsEnVentanilla[];
  public titleModal: string;

  @ViewChild('form') public modal: ModalDirective;

  constructor(private tableroService: TableroService,
              public tipoTicketService: TipoTicketService, public alertService: AlertService) {
  }

  ngOnInit() {
    this.tableroService.getAll().subscribe(response => {
      this.listTablero = <Tablero[]> response;

    }, errorResponse => {
      alert(errorResponse.error.message);
    });

    this.tipoTicketService.getAll().subscribe(data => {
        this.listTipoTicket = <TipoTicket[]>data;
      },
      error => {
        this.listTipoTicket = [];
        const errorMessage: string = error.message != undefined ? error.message : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public verOficina(id: number, nombreOficina: string) {
    this.tableroService.getTickesEnEspera(id).subscribe(
      data => {
        this.listTicketsEnEspera = <TicketsEnEspera[]>data;
      },
      error => {
        this.listTicketsEnEspera = [];
        const errorMessage: string = error.message != undefined ? error.message : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );

    this.tableroService.getTickesEnVetanilla(id).subscribe(
      data => {
        this.listTicketsEnVentanilla = <TicketsEnVentanilla[]>data;
      },
      error => {
        this.listTicketsEnVentanilla = [];
        const errorMessage: string = error.message != undefined ? error.message : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
    this.titleModal = nombreOficina;
    this.modal.show();
  }
}
