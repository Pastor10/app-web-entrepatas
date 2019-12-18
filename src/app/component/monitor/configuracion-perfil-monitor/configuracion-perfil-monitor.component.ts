import { Component, OnInit } from '@angular/core';
import { Oficina } from '../../../shared/model/oficina.model';
import { TipoTicket } from '../../../shared/model/tipoTicket.model';
import { forkJoin } from 'rxjs';
import { OficinaService } from '../../../shared/service/oficina.service';
import { Peso } from '../../../shared/model/peso.model';
import { PesoService } from '../../../shared/service/peso.service';
import { PesoTipoTicketService } from '../../../shared/service/pesotipoticket.service';
import { PesoTipoTicket } from '../../../shared/model/pesoTipoTicket.model';
import { ModoLlamadoService } from '../../../shared/service/modoLlamado.service';
import { ModoLlamado } from '../../../shared/model/modoLlamado.model';

@Component({
  selector: 'app-configuracion-perfil-monitor',
  templateUrl: './configuracion-perfil-monitor.component.html',
  styleUrls: ['./configuracion-perfil-monitor.component.css']
})
export class ConfiguracionPerfilMonitorComponent implements OnInit {
  loading = false;

  oficinas = new Array<Oficina>();
  oficinaSelected: Oficina = null;

  pesos = new Array<Peso>();

  get pesosVisibles(): Array<Peso> {
    return this.pesos.filter(p => {
      return p.visibleCombo;
    });
  }

  pesoSelected: Peso;

  modosLLamados = new Array<ModoLlamado>();
  modoLlamadoSelected: ModoLlamado;

  perfiles: Array<TipoTicket>;
  pesosTipoTickets: Array<PesoTipoTicket> = [];

  constructor(
    private oficinaService: OficinaService,
    private pesoService: PesoService,
    private pesoTipoTicketService: PesoTipoTicketService,
    private modoLlamadoService: ModoLlamadoService
  ) {}

  ngOnInit() {
    this.loading = true;
    forkJoin(
      this.oficinaService.getAll(),
      this.pesoService.getAll(),
      this.modoLlamadoService.getAll()
    ).subscribe(data => {
      this.loading = false;
      this.oficinas = <Oficina[]>data[0];
      this.pesos = <Peso[]>data[1];
      this.modosLLamados = <ModoLlamado[]>data[2];
      this.setVisiblePeso(this.oficinaSelected, this.pesos);
    });
  }

  changeOficina(o: Oficina): void {
    this.setVisiblePeso(o, this.pesos);
    if (this.pesosVisibles.length == 0) {
      this.pesoSelected = null;
      this.modoLlamadoSelected = null;
      this.pesosTipoTickets = [];
    }
  }

  setVisiblePeso(o: Oficina, pesos: Array<Peso>): void {
    pesos.forEach(p => {
      p.visibleCombo = true;
      if (o) {
        if (p.oficina != null && p.oficina.idOficina == o.idOficina) {
          p.visibleCombo = true;
        } else {
          p.visibleCombo = false;
        }
      } else {
        p.visibleCombo = true;
      }
    });
  }

  changePeso(p: Peso): void {
    this.modoLlamadoSelected = null;
    this.loading = true;
    this.pesoTipoTicketService.getAllByIdPeso(p.idPeso).subscribe(data => {
      this.pesosTipoTickets = <PesoTipoTicket[]>data;

      this.modosLLamados.forEach(m => {
        if (m.idModoLlamado == p.modoLlamado.idModoLlamado) {
          this.modoLlamadoSelected = m;
        }
      });

      this.loading = false;
    });
  }

  guardarPerfil(): void {
    this.loading = true;
    const peso = this.pesoSelected;
    peso.modoLlamado = this.modoLlamadoSelected;
    this.pesoService.save(peso).subscribe(() => {});
    this.pesoTipoTicketService
      .updatePesoTipoTicket(this.pesosTipoTickets)
      .subscribe(() => (this.loading = false));
  }
}
