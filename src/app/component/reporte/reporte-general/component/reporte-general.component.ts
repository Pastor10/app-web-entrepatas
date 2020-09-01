import { Component} from '@angular/core';


@Component({
    selector: 'app-reporte-general',
    templateUrl: './reporte-general.component.html',
    styleUrls: ['./reporte-general.component.scss']
   
})

export class ReporteGeneralComponent{

    data: any;

    constructor() {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'ADOPCION',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'PERDIDO',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                },
                {
                    label: 'ENCONTRADO',
                    backgroundColor: 'ORANGE',
                    borderColor: 'RED',
                    data: [20, 38, 45, 39, 76, 25, 15]
                }
            ]
        }
    }
    
}