import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import { AuthService } from 'src/app/shared/service/auth.service';
import { RoleService } from 'src/app/shared/service/role.service';
import { Role } from 'src/app/shared/model/role.model';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { ProfileService } from 'src/app/shared/service/profile.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    isEdit: boolean;
    modelForm: FormGroup;
    listRoles = [];
    roles = [];
    model = new Perfil();
    constructor(private route: ActivatedRoute,
                private router: Router,
                private messageService: MessageService,
                private loginService: AuthService,
                private confirmationService: ConfirmationService,
                public fb: FormBuilder,
                private store: Store,public roleService: RoleService,public profileService: ProfileService) {

    }

     ngOnInit() {
       this.loadRole();
    }
    public loadRole(){
        this.roleService.getAll().subscribe(
          data => {
            this.listRoles = <Role[]>data;
            let i = 0;
            this.listRoles.forEach(rol => {
                this.roles[i++] = {name: rol.name, status: false, id: rol.id};
            });
            this.builderForm();
          },
          error => {
            const errorMessage =
              error.message != undefined
                ? error.message
                : 'No se pudo procesar la petición';
          }
        );
      }
      builderForm() {
        const controls = this.roles.map(c => new FormControl(false));
        controls[0].setValue(true);
        this.modelForm = this.fb.group({
            nombre: ['', [Validators.required]],
            roles: new FormArray(controls, this.minSelectedCheckboxes(1))
        });
    }
    minSelectedCheckboxes(min = 1) {
        const validator: ValidatorFn = (formArray: FormArray) => {
            const totalSelected = formArray.controls
                .map(control => control.value)
                .reduce((prev, next) => next ? prev + next : prev, 0);

            return totalSelected >= min ? null : {required: true};
        };

        return validator;
    }

    formToModel(): void {
        this.model.nombre = this.modelForm.value.nombre;
        this.model.activo = true;
        const rolesToSaved: Role[] = [];
        this.roles.forEach((rol) => {
            if (rol.status) {
                let role = new Role();
                role.id = rol['id'];
                role.name = rol['name'];
                rolesToSaved.push(role);
            }
        });

        if (rolesToSaved.length === 0) {
            alert('Seleccione al menos un rol');
            return;
        }

        this.model.roles = rolesToSaved;
    }

    submitForm() {
        //alert(this.modelForm.value.nombre);
        this.formToModel();
        let message;
        this.profileService.create(this.model).then((res) => {
            if (res != null) {
              alert("Se ha registrado con exito!!!");
            } 
            })
        } 


    

}
