import { Component, OnInit, ViewChild } from '@angular/core';
import { PasswordRequest } from 'src/app/shared/model/password.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/shared/service/usuario.service';


@Component({
    selector: 'app-change-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss']

})

export class PasswordComponent implements OnInit {
    passwordRequest = new PasswordRequest();

    constructor(private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        public usuarioService: UsuarioService) {
    }

    ngOnInit() {

    }

    save() {
        if(this.passwordRequest.currentPassword==undefined || this.passwordRequest.currentPassword==''){
            this.showMsg('info', 'Ingrese actual contraseña');
            return;
        }

        if(this.passwordRequest.newPassword==undefined || this.passwordRequest.newPassword==''){
            this.showMsg('info', 'Ingrese nueva contraseña');
            return;
        }

        if(this.passwordRequest.confirmPassword==undefined || this.passwordRequest.confirmPassword==''){
            this.showMsg('info', 'Repita la nueva contraseña');
            return;
        }

        this.usuarioService.changePassword(this.passwordRequest).subscribe(
            resp=>{
                this.showMsg('success', 'Contraseña actualizada correctamente');
                console.log(resp);
                
            }, error => {
                const errorMessage =
                  error.message != undefined
                    ? error.error.mensaje
                    : 'No se pudo procesar la petición';
                this.showMsg('error', errorMessage);
              }
        );

        console.log('pasword', this.passwordRequest);
        
    }

    showMsg(type: string, msg: string, title: string = 'Usuario') {
        this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
      }

}