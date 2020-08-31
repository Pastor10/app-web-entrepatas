import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/shared/service/usuario.service';


@Component({
    selector: 'app-active-cuenta',
    templateUrl: './activecuenta.component.html'
})

export class ActiveCuentaComponent implements OnInit{

    uuid: string;

    constructor(private route: ActivatedRoute, private usuarioService: UsuarioService) {
       this.uuid= this.route.snapshot.queryParamMap.get('code-validation');
       
        
    }

    ngOnInit(){

       this.validateCuenta()
    }

    validateCuenta(){
        this.usuarioService.validateCuenta(this.uuid).subscribe(
            (data) => {
              console.log('data', data);

            },
            error => {
              const errorMessage =
                error.message != undefined
                  ? error.message
                  : 'No se pudo procesar la petición';
              //this.alertService.danger(errorMessage);
            }
          );
    }

    
}