import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UsuarioPerfilService } from 'src/app/shared/service/usuarioPerfil.service';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { PerfilService } from 'src/app/shared/service/perfil.service';
import { User } from 'src/app/shared/model/User.model';
import { UserPerfil } from 'src/app/shared/model/UserPerfil';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

    isEdit: boolean;
    modelForm: FormGroup;
    model: UserPerfil;
    public listaPerfiles : SelectItem[];
    constructor(private route: ActivatedRoute,
                private router: Router,
                private messageService: MessageService,
                private loginService: AuthService,
                private confirmationService: ConfirmationService,
                public fb: FormBuilder,
                private store: Store, public perfilService: PerfilService, public usuarioPerfilService: UsuarioPerfilService) {

    }

    ngOnInit() {
        this.getPerfil();
        this.builderForm();
        this.loadModel();

    }
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
              let arrayPerfiles = <Perfil[]>data;
              let array= [];
            for(let i=0; i < arrayPerfiles.length; i++){
                array.push({
                  label:arrayPerfiles[i].nombre,
                  value:arrayPerfiles[i].idPerfil
                });
            }
              this.listaPerfiles = <SelectItem[]>array;
            },
            error => {
              this.listaPerfiles = [];
              const errorMessage =
                error.message != undefined
                  ? error.message
                  : 'No se pudo procesar la petición';
            }
          );
    }


    formToModel(): void {
        this.model.user.fullName = this.modelForm.value.nombres;
        this.model.user.email = this.modelForm.value.email;
        this.model.perfil.idPerfil = this.modelForm.value.perfil;
    }
    showMsg( type: string, msg: string, title: string = 'Atención') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
    }
    submitForm() {
        let message;
        this.formToModel();
        this.usuarioPerfilService.update(this.model).then((res) => {
            if (res != null) {
                message = 'Usuario actualizado correctamente.';
                this.showMsg('success',message);
                var root = this;
                setTimeout(function(){
                  root.router.navigateByUrl('main/usuarios');
              },2500)
            } 
            })

    }
    
    modelToForm(model: UserPerfil): void {
        this.modelForm.patchValue({
            nombres: model.user.fullName,
            email:model.user.email,
            perfil:model.perfil.idPerfil

        });
    }

    loadModel() {
                this.route.params.subscribe(p => {
                    const id = p['id'];
                    if(id != undefined){
                    this.isEdit = true;
                    this.usuarioPerfilService.getById(id)
                    .subscribe(data => {
                        if (data) {
                            this.model =<UserPerfil>data;
                            this.modelToForm(<UserPerfil>data);

                        }
                    });
                }
                });
        }

}
