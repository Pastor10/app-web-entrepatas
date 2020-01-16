import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import { AuthService } from 'src/app/shared/service/auth.service';


@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

    isEdit: boolean;
    modelForm: FormGroup;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private messageService: MessageService,
                private loginService: AuthService,
                private confirmationService: ConfirmationService,
                public fb: FormBuilder,
                private store: Store) {

    }

    ngOnInit() {
        this.builderForm();

    }


    // Reactive student form
    builderForm() {
        this.modelForm = this.fb.group({
            dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]],
            nombres: ['', [Validators.required]],
            apellidos: ['', [Validators.required]],
            cargo: ['', [Validators.required]],
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

}
