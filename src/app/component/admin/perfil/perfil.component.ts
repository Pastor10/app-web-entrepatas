import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ModalDirective } from 'angular-bootstrap-md';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { PerfilService } from 'src/app/shared/service/perfil.service';
import { RoleService } from 'src/app/shared/service/role.service';
import { Role } from 'src/app/shared/model/role.model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public form: FormGroup;
  public roles = [];

  public listItem: Perfil[];
  public listRole: Role[];
  public item: Perfil = new Perfil();
  public id: number;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string;
  public titleModal: string;
  @ViewChild('modal') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public perfilService: PerfilService,
    public roleService: RoleService,
    public alertService: AlertService,
    public cdRef: ChangeDetectorRef
  ) {
    this.id = 0;
    this.valueInput = '';
    this.titleModal = 'Crear Perfil';
  }

  ngOnInit() {
    this.search();
    this.loadRoles();
  }

  builRoles() {
    const controls = this.roles.map(c => new FormControl(false));
    controls[0].setValue(true);
    this.form = this.formBuilder.group({
      roles: new FormArray(controls, this.minSelectedCheckboxes(1))
    });
  }

  public enter(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  public search() {
    this.loadRoles();
    this.enableBtnBuscar = false;
    this.perfilService.getByName(this.valueInput).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItem = <Perfil[]>data;
      },
      error => {
        this.listItem = [];
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public loadRoles() {
    this.roleService.getAll().subscribe(
      data => {
        this.listRole = <Role[]>data;
        const tam = this.listRole.length;
        let i = 0;
        this.listRole.forEach(rol => {
          let description = rol.name.replace('ROLE_', '');
          while (description.indexOf('_') != -1) {
            description = description.replace('_', ' ');
          }
          this.roles[i++] = {
            name: rol.name,
            description: description,
            status: false
          };
        });
        this.builRoles();
      },
      error => {
        this.listRole = [];
        const errorMessage: string =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public showConfirmDelete(id: number) {
    this.id = id;
    this.confirmDelete.show();
  }

  public delete(): void {
    this.enableBtnBuscar = false;
    this.perfilService.delete(this.id).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.alertService.success(
          'Se borró correctamente el registro seleccionado '
        );
        this.confirmDelete.hide();
        this.search();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  private clearRoles(): void {
    this.roles.forEach(rol => {
      rol.status = false;
    });
  }

  public loadCreate(): void {
    this.clearRoles();
    this.item = new Perfil();
    this.item.activo = true;
    this.titleModal = 'Crear Perfil';
    this.modal.show();
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.perfilService.getById(id).subscribe(
      data => {
        this.titleModal = 'Modificar Perfil';
        this.enableBtnBuscar = true;
        this.item = <Perfil>data;
        this.clearRoles();
        this.item.roles.forEach(rolA => {
          this.roles.forEach(rolB => {
            if (rolA.name.localeCompare(rolB.name) == 0) {
              rolB.status = true;
            }
          });
        });
        this.modal.show();
      },
      error => {
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public save(): void {
    if (!this.rolesSelected()) {
      this.alertService.warning('Seleccione al menos un rol');
      return;
    }
    let rolesToSaved: Array<Role>;
    rolesToSaved = new Array<Role>();
    this.roles.forEach(rol => {
      if (rol.status) {
        const rolToSaved: Role = new Role();
        rolToSaved.name = rol.name;
        rolesToSaved.push(rolToSaved);
      }
    });
    this.item.roles = rolesToSaved;
    this.perfilService.save(this.item).subscribe(
      data => {
        this.item = new Perfil();
        this.alertService.success('Se guardó correctamente');
        this.modal.hide();
        this.search();
      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  public validate(): boolean {
    return this.item.nombre == undefined || this.item.nombre.trim().length == 0;
  }

  public rolesSelected(): boolean {
    let one = false;
    this.roles.forEach(o => {
      if (o.status) {
        one = true;
      }
    });
    return one;
  }
}
