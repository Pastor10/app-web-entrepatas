import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ModalDirective } from 'angular-bootstrap-md';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { PerfilService } from 'src/app/shared/service/perfil.service';
import { RoleService } from 'src/app/shared/service/role.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { OficinaService } from 'src/app/shared/service/oficina.service';
import { Oficina } from 'src/app/shared/model/oficina.model';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, AfterViewInit {
  public form: FormGroup;

  public idPerfil: number;
  public oficinas: Oficina[];
  public listItem: Usuario[];
  public listPerfil: Perfil[];
  public item: Usuario = new Usuario();
  public id: number;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableBtnCrear = true;
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
    public usuarioService: UsuarioService,
    public cdRef: ChangeDetectorRef,
    public oficinaService: OficinaService
  ) {
    this.idPerfil = 0;
    this.id = 0;
    this.valueInput = '';
    this.titleModal = 'Crear Usuario';
  }

  ngOnInit() {
    this.search();
    //this.loadOficinas();
    this.loadPerfiles();
  }

  public enter(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  private buildOficinas() {
    const controls = this.oficinas.map(c => new FormControl(false));
    if (controls != undefined) {
      controls[0].setValue(true);
      this.form = this.formBuilder.group({
        oficinas: new FormArray(controls, this.minSelectedCheckboxes(1))
      });
    }
  }

  public loadOficinas() {
    this.enableBtnBuscar = false;
    this.oficinaService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.oficinas = <Oficina[]>data;
        this.buildOficinas();
      },
      error => {
        this.oficinas = [];
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public loadPerfiles() {
    this.enableBtnBuscar = false;
    this.perfilService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listPerfil = <Perfil[]>data;
      },
      error => {
        this.listPerfil = [];
        this.enableBtnBuscar = true;
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public search() {
    this.enableBtnBuscar = false;
    this.usuarioService.getByDni(this.valueInput).subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listItem = <Usuario[]>data;
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

  public selectIdPerfil(id: number) {
    this.idPerfil = id;
  }

  public showConfirmDelete(id: number) {
    this.id = id;
    this.confirmDelete.show();
  }

  public delete(): void {
    this.enableBtnBuscar = false;
    this.usuarioService.delete(this.id).subscribe(
      data => {
        this.enableBtnBuscar = true;
        console.log(data);
        this.alertService.success(
          'Se borró correctamente la fila '
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

  private clearOficinas(): void {
    if (this.oficinas != undefined) {
      this.oficinas.forEach(ofi => {
        ofi.activo = false;
      });
    }
  }

  public loadCreate(): void {
    this.idPerfil = 0;

    this.item = new Usuario();
    this.item.visible = true;
    this.titleModal = 'Crear Usuario';
    this.modal.show();

   /* if (this.oficinas == undefined || this.oficinas.length == 0) {
      this.alertService.danger('No hay oficinas creadas');
      this.loadOficinas();
    } else {
      this.item = new Usuario();
      this.item.visible = true;
      this.titleModal = 'Crear Usuario';
      this.modal.show();
    }*/
  }

  public loadEdit(id: number): void {
    this.loadPerfiles();
    this.enableBtnBuscar = false;
    this.usuarioService.getById(id).subscribe(
      data => {
        this.titleModal = 'Modificar Usuario';
        this.enableBtnBuscar = true;
        this.item = <Usuario>data;
        //this.clearOficinas();
        this.idPerfil =
          this.item.perfil != undefined ? this.item.perfil.idPerfil : 0;
        /*this.item.oficinas.forEach(rolA => {
          this.oficinas.forEach(rolB => {
            if (rolA.idOficina == rolB.idOficina) {
              rolB.activo = true;
            }
          });
        });*/
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

    /*if (!this.oficinasSelected()) {
      this.alertService.warning('Seleccione al menos una oficina');
      return;
    }
    let oficinasToSaved: Array<Oficina>;
    oficinasToSaved = new Array<Oficina>();
    this.item.perfil = this.listPerfil.find(
      obj => obj.idPerfil == this.idPerfil
    );
    this.oficinas.forEach(ofi => {
      if (ofi.activo) {
        const ofiToSaved: Oficina = new Oficina();
        ofiToSaved.idOficina = ofi.idOficina;
        oficinasToSaved.push(ofiToSaved);
      }
    });
    this.item.oficinas = oficinasToSaved;*/
    this.usuarioService.save(this.item).subscribe(
      data => {
        this.item = new Usuario();
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

  public ngAfterViewInit() {
    /*this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.firstItemIndex = this.mdbTablePagination.firstItemIndex;
    this.lastItemIndex = this.mdbTablePagination.lastItemIndex;

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();*/
  }

  public onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public minSelectedCheckboxes(min = 1): ValidatorFn {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  public oficinasSelected(): boolean {
    let one = false;
    this.oficinas.forEach(ofi => {
      if (ofi.activo) {
        one = true;
      }
    });
    return one;
  }
}
