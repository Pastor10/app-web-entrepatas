import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { Perfil } from 'src/app/shared/model/perfil.model';
import { User } from 'src/app/shared/model/User.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { Table } from 'primeng/table';
import { Persona } from 'src/app/shared/model/persona.model';
import { TipoDocumento } from 'src/app/shared/model/tipoDocumento.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipodocumento.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Item } from 'src/app/shared/model/item.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  totalRecords: number;
  perPage = 10;
  cols: any[];
  loading: boolean;
  tokenGenerated: any;
  modelForm: FormGroup;
  visibleTokenGenerado = false;
  public listaUsuarios: User[] = [];
  public listFilterUser: User[];
  public listaPerfil: Perfil[];
  model = new User();
  emailSelected: User;
  perfilSelected: Perfil;
  estadoSelected: boolean = true;
  nombre: string;
  tipo: string;
  id: number;
  apePaterno: string;
  apeMaterno: string;
  username: string;
  password: string;
  correo: string;
  celular: number = undefined;
  persona: Persona;
  listTipoDocumento: TipoDocumento[];
  tipoDocumento: TipoDocumento;
  documento: string;

  lastLazyLoadEvent: LazyLoadEvent;
  public listFilterPerfil: Perfil[];
  public data: User;
  filtro: Item[];
  filtroSelected: Item;
  search: string;
  isSearch: boolean = false;

  public numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '',
    allowDecimal: false,
    decimalSymbol: '.',
    decimalLimit: 1,
    integerLimit: 12,
    requireDecimal: false,
    allowNegative: false,
    allowLeadingZeroes: true,
  });

  @ViewChild('dt', { static: true }) public tabla: Table;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService, public fb: FormBuilder,
    public perfilService: ProfileService, public usuarioService: UsuarioService, public tipoDocumentoService: TipoDocumentoService) {
  }

  ngOnInit() {
    //this.listarUsuariosAplicacion();
    this.getAllTipoDocumento();
    this.cols = [
      { field: 'fecha', header: 'Fecha', width: '170px' },
      { field: 'nombre', header: 'Nombres y Apellidos', width: '250px' },
      { field: 'correo', header: 'Email', width: '230px' },
      { field: 'documento', header: 'Documento', width: '120px' },
      { field: 'celular', header: 'Celular', width: '100px' },
      { field: 'profile', header: 'Perfil', width: '100px' },
      { field: 'estado', header: 'Estado', width: '100px' }
    ];

    this.filtro = [new Item('TODOS', 'TODOS'), new Item('DOCUMENTO', 'DOCUMENTO'), new Item('NOMBRES', 'NOMBRES')];


    //this.getUsers();
    this.listarPerfiles();
    this.builderForm();


  }

  getAllTipoDocumento() {
    this.tipoDocumentoService.getAll().subscribe((data: TipoDocumento[]) => {
      this.listTipoDocumento = data;

    });
  }

  public filterListTipoDocumento(event) {
    let query = event.query
    this.listTipoDocumento = this.filterDocumento(query, this.listTipoDocumento);

  }

  filterDocumento(query, lista: TipoDocumento[]): TipoDocumento[] {
    let filtered: TipoDocumento[] = [];
    for (let i = 0; i < lista.length; i++) {
      let model = lista[i];
      if (model.abreviatura.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(model);
      }
    }
    return filtered;
  }

  // public filterListEmail(event) {
  //     let query = event.query
  //     this.listFilterUser = this.filterListUserEmail(query, this.listaUsuarios);

  //   }

  public filterListPerfil(event) {
    let query = event.query
    this.listFilterPerfil = this.filterListPerfilName(query, this.listaPerfil);

  }

  filterListPerfilName(query, perfiles: Perfil[]): Perfil[] {
    let filtered: Perfil[] = [];
    for (let i = 0; i < perfiles.length; i++) {
      let perfil = perfiles[i];
      if (perfil.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(perfil);
      }
    }
    return filtered;
  }

  builderForm() {

    this.modelForm = this.fb.group({
      email: ['', [Validators.required]],
      nombre: [{ value: '', disabled: true }, [Validators.required]],
      perfil: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      tipo: [{ value: '', disabled: true }, [Validators.required]],
      id: ['', [Validators.required]],


      //roles: new FormArray(controls, this.minSelectedCheckboxes(1))

    });
  }
  findEmail() {
    this.id = this.emailSelected.id;

  }

  formToModel(): void {
    this.model.id = this.id;

    this.model.perfil = this.perfilSelected;
    this.model.estado = this.estadoSelected;
    this.model.visible = true;
    this.model.username = this.username;
    this.model.password = this.password;


    this.persona = new Persona();
    this.persona.correo = this.correo;
    this.persona.nombre = this.nombre;
    this.persona.apePaterno = this.apePaterno;
    this.persona.apeMaterno = this.apeMaterno;
    this.persona.celular = this.celular;
    this.persona.estado = true;
    this.persona.numeroDocumento = this.documento;
    this.persona.tipoDocumento = this.tipoDocumento;
    //this.persona.nombreCompleto = this.nombre +' '+this.apePaterno +' '+this.apeMaterno;
    this.model.persona = this.persona;




  }



  resetAndRefreshTable() {
    this.tabla.reset();
    this.refreshTable();
  }

  refreshTable() {
    //this.tabla.reset();
    if (this.lastLazyLoadEvent) {
      this.getUsers(this.lastLazyLoadEvent);
    }
  }



  updateUser(data, message) {
    this.usuarioService.update(data).then((res) => {
      if (res != null) {
        this.showMsg('success', message);
        var root = this;
        setTimeout(function () {
          //root.router.navigateByUrl('main/perfiles');
        }, 2500)
        this.refreshTable();
      }
    });
    //this.getUsers();
  }

  doAction(data, accion) {
    if (accion == 'state') {
      data.estado = !data.estado;

      let message;
      if (data.estado) {
        message = 'usuario activado correctamente.';
      } else {
        message = 'usuario desactivado correctamente.';
      }
      this.updateUser(data, message);

    } else {


      this.nombre = data.persona.nombre;
      this.apePaterno = data.persona.apePaterno
      this.apeMaterno = data.persona.apeMaterno;
      this.correo = data.persona.correo;
      this.celular = data.persona.celular;
      this.username = data.username
      this.documento = data.persona.numeroDocumento;
      this.tipoDocumento = data.persona.tipoDocumento;
      //this.tipo = data.type;
      this.id = data.id;
      this.estadoSelected = data.estado;
      this.perfilSelected = data.perfil;

    }


  }

  limpiarData() {
    this.emailSelected = null;
    this.id = null;
    this.nombre = null;
    this.tipo = null;
    this.celular = null;
    this.correo = null;
    this.apePaterno = null;
    this.apeMaterno = null;
    this.username = null;
    this.password = null;
    this.perfilSelected = null;
    this.documento = null;
    this.tipoDocumento = null;
  }

  modelToForm(model: User): void {
    this.modelForm.patchValue({
      perfil: model.perfil.id

    });
  }

  get modeRoot() {
    return this.route.snapshot.data.modeRoot;
  }


  focusInputToken(inputElement: HTMLInputElement) {
    inputElement.select();
    document.execCommand('copy');
  }

  newUser() {
    // this.router.navigateByUrl(`/main/usuarios/nuevo`);
    this.router.navigate(['/main/usuarios/nuevo']);
  }


  listarUsuariosAplicacion() {
    this.listaUsuarios = [];
    this.usuarioService.listarUsuariosAplicacion().subscribe(
      (data: User[]) => {
        this.listaUsuarios = data;
      });
  }

  listarPerfiles() {
    this.perfilService.getAll().subscribe(
      (data: Perfil[]) => {
        this.listaPerfil = data;
      });
  }

  onChangeFilter() {
    if (this.filtroSelected.name != 'TODOS') {
      this.isSearch = true;

    } else {
      this.isSearch = false;
    }
  }

  getUsers(event: LazyLoadEvent) {
    const params = [];
    this.lastLazyLoadEvent = event;
    const pageNumber = event.first / this.perPage;

    params.push(`page=${pageNumber}`);
    params.push(`perPage=${this.perPage}`);

    if (this.filtroSelected != undefined) {
      if (this.filtroSelected.name == 'DOCUMENTO') {
        params.push(`documento=${this.search}`);
      }

      if (this.filtroSelected.name == 'NOMBRES') {
        params.push(`nombres=${this.search}`);
      }

    }




    this.listaUsuarios = [];

    this.usuarioService.getUsers(params.join('&')).subscribe(
      (data: User[]) => {

        this.totalRecords = data['totalElements'];
        this.listaUsuarios = data['content'];
      },
      error => {
        this.listaUsuarios = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }


  linkUpdate(id) {
    this.router.navigate(['usuarios/editar', id]);
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  showMsg(type: string, msg: string, title: string = 'Usuario') {
    this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
  }

  save() {
    let message;

    //validaciones
    let celular = this.celular;

    if (this.tipoDocumento == null) {
      this.showMsg('info', 'Seleccione tipo documento');
      return;
    }

    if (this.documento == null || this.documento == '') {
      this.showMsg('info', 'Ingrese documento');
      return;
    }

    if (this.nombre == null || this.nombre == '') {
      this.showMsg('info', 'Ingrese nombre');
      return;
    }

    if (this.apePaterno == null || this.apePaterno == '') {
      this.showMsg('info', 'Ingrese apellido paterno');
      return;
    }

    if (this.apeMaterno == null || this.apeMaterno == '') {
      this.showMsg('info', 'Ingrese apellido materno');
      return;
    }

    if (this.correo == null) {
      this.showMsg('info', 'Ingrese un correo');
      return;
    }

    if (this.celular == undefined || this.celular == 0) {
      this.showMsg('info', 'Ingrese número de celular');
      return;
    }

    if (this.perfilSelected == null) {
      this.showMsg('info', 'Seleccione un perfil');
      return;
    }

    this.formToModel();

    this.usuarioService.save(this.model).subscribe((res) => {
      if (res != null) {
        message = 'Datos guardados correctamente.';
        this.showMsg('success', message);
        setTimeout(function () {

        }, 2500);
        this.limpiarData();
        this.refreshTable();

      }
    }, error => {
      const errorMessage = error.error.mensaje != undefined ? error.error.mensaje : 'No se pudo procesar la petición. Error ' + error.status;
      this.showMsg('error', errorMessage, 'Usuario');

    });

  }

  showConfirmDelete(data) {
    this.messageService.clear();
    this.data = data;
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?' });
  }

  onReject() {
    this.messageService.clear('c');
  }

  onConfirm(data) {
    this.deleteUser(data, 'Usuario eliminado correctamente');
    this.messageService.clear('c');
  }

  public deleteUser(data, message): void {
    this.usuarioService.delete(data.id).subscribe(
      data => {
        this.showMsg('success', message, 'Usuario');
        //this.getUsers();
      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        this.showMsg('error', errorMessage, 'Usuario');

      }
    );
  }

  soloLetras(e) {
    var tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
      return true;
    }
    var patron = /[A-Za-z ]/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
  }
}
