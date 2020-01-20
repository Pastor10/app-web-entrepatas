import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { PerfilService } from 'src/app/shared/service/perfil.service';
import { User } from 'src/app/shared/model/User.model';


@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

    isEdit: boolean;
    modelForm: FormGroup;
    model: User;
    public listaPerfiles: Perfil[];
    


    constructor(private route: ActivatedRoute,
                private router: Router,
                private messageService: MessageService,
                private loginService: AuthService,
                private confirmationService: ConfirmationService,
                public fb: FormBuilder,
                private store: Store, public perfilService: PerfilService, public userService: UsuarioService) {

    }

    ngOnInit() {
        this.getPerfil();
        this.builderForm();

    }


    // Reactive student form
    builderForm() {
        this.modelForm = this.fb.group({
            nombres: ['', [Validators.required]],
            perfil: [null, [Validators.required]],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get textButtonAction() {
        return this.isEdit ? 'Actualizar' : 'Guardar';
    }

    get nameModulo() {
        return this.route.snapshot.data.title;
    }

    get nombres() {
        return this.modelForm.get('nombres');
    }

    get apellidos() {
        return this.modelForm.get('apellidos');
    }

    get dni() {
        return this.modelForm.get('dni');
    }

    get email() {
        return this.modelForm.get('email');
    }

    get cargo() {
        return this.modelForm.get('cargo');
    }

    get perfil() {
        return this.modelForm.get('perfil');
    }

    get modeRoot() {
        return this.route.snapshot.data.modeRoot;
    }


    get linkVolver() {
            return '/usuarios';
    }

    getPerfil() {
        this.perfilService.getAll().subscribe(
            data => {
              this.listaPerfiles = <Perfil[]>data;
              console.log('this.listPerfil ', this.listaPerfiles );
            },
            error => {
              this.listaPerfiles = [];
              const errorMessage =
                error.message != undefined
                  ? error.message
                  : 'No se pudo procesar la petición';
              //this.alertService.danger(errorMessage);
            }
          );
    }

   /* loadModel() {
            this.route.params.subscribe(p => {
                const id = p['id'];
                this.usuarioService.findById(id).subscribe(data => {
                    if (data) {
                        this.model = data;
                        this.modelToForm(data);
                    }
                });
            });
    }*/

    formToModel(): void {
        this.model.fullName = this.modelForm.value.nombres;
        this.model.email = this.modelForm.value.email;
        this.model.type = this.modelForm.value.perfil;

        console.log(this.model.fullName);
        console.log(this.model.email);
        console.log(this.model.type);

    }

    submitForm() {
        this.formToModel();

        this.userService.save(this.model).subscribe(
            data => {
              this.listaPerfiles = <Perfil[]>data;
              this.messageService.add({severity: 'success', summary: 'Mensaje', detail: "Se actualizao el registro"});
              console.log('this.listPerfil ', this.listaPerfiles );
              this.router.navigateByUrl(this.linkVolver);
            },
            error => {
              this.listaPerfiles = [];
              const errorMessage =
                error.message != undefined
                  ? error.message
                  : 'No se pudo procesar la petición';
              //this.alertService.danger(errorMessage);
            }
          );

    }

}
