import { Component, OnInit} from '@angular/core';
import { ReporteService } from 'src/app/shared/service/reporte.service';


@Component({
    selector: 'app-reporte-general',
    templateUrl: './reporte-general.component.html',
    styleUrls: ['./reporte-general.component.scss']
   
})

export class ReporteGeneralComponent implements OnInit{

    data: any;
    constructor(private reporteService:ReporteService) {

    }
    
    ngOnInit(){
        this.getPublicaciones();
  
    }

    getPublicaciones(){
        this.reporteService.getPublicaciones().subscribe(data =>{
            this.data = {
                labels: data['fechas'],
                datasets: [
                    {
                        label: 'ADOPCION',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: data['adoptados']
                    },
                    {
                        label: 'PERDIDO',
                        backgroundColor: '#9CCC65',
                        borderColor: '#7CB342',
                        data: data['perdidos']
                    },
                    {
                        label: 'ENCONTRADO',
                        backgroundColor: 'ORANGE',
                        borderColor: 'RED',
                        data: data['encontrados']
                    }
                ]
            }
            
        })
    }
}