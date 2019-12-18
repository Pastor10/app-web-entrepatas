import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReporteQuery } from '../model/reporteQuery.model';

@Injectable()
export class ReporteService {
    constructor(private http: HttpClient) {
    }

    baseUrl: string = environment.END_POINT + 'reporte/';

    tiempoPromedio(o: ReporteQuery) {
        return this.http.post(this.baseUrl + 'tiempoPromedioEsperaAtencion', o);
    }

    arrivoTicket(o: ReporteQuery) {
        return this.http.post(this.baseUrl + 'arrivoTicket', o);
    }

    clientesAtendidos(o: ReporteQuery) {
        return this.http.post(this.baseUrl + 'clientesAtendidos', o);
    }

    ticketsDerivados(o: ReporteQuery) {
        return this.http.post(this.baseUrl + 'ticketsDerivadosInternosReactivadosAbandonados', o);
    }

    performanceUsuarios(o: ReporteQuery) {
        return this.http.post(this.baseUrl + 'performanceUsuarios', o);
    }


}
