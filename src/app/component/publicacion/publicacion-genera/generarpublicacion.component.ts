import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoLocal } from 'src/app/shared/model/tipolocal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { TipoAnimalService } from 'src/app/shared/service/tipoanimal.service';
import { RazaService } from 'src/app/shared/service/raza.service';
import { TamanoAnimalService } from 'src/app/shared/service/tamanoanimal.service';
import { TipoAnimal } from 'src/app/shared/model/tipoanimal.model';
import { Raza } from 'src/app/shared/model/raza.model';
import { TamanoAnimal } from 'src/app/shared/model/tamanoanimal.model';
import { CondicionService } from 'src/app/shared/service/condicion.service';
import { Condicion } from 'src/app/shared/model/condicion.model';
import { Publicacion } from 'src/app/shared/model/publicacion.model';
import { PublicacionService } from 'src/app/shared/service/publicacion.service';
import { Animal } from 'src/app/shared/model/animal.model';
import { User } from 'src/app/shared/model/User.model';
import { Item } from 'src/app/shared/model/item.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Estado } from 'src/app/shared/model/estado.model';
import { toBase64 } from 'src/app/shared/utils/util-functions';
import { Archivo } from 'src/app/shared/model/archivo.model';
import { Local } from 'src/app/shared/model/local.model';
import { LocalService } from 'src/app/shared/service/local.service';

@Component({
  selector: 'app-generarpublicacion',
  templateUrl: './generarpublicacion.component.html'

})

export class GenerarPublicacionComponent implements OnInit {

  listaTipoLocal: TipoLocal[];
  listaTipoAnimal: TipoAnimal[];
  listaRazas: Raza[];
  listaTamanoAnimal: TamanoAnimal[];
  listaCondicion: Condicion[];
  tipoAnimal: TipoAnimal;
  listaLocales: Local[];
  raza: Raza;
  tamanoAnimal: TamanoAnimal;
  condicion: Condicion;
  nombre: string;
  local: Local;
  estadoSelected: boolean = true;
  descripcion: string;
  edad: Item;
  sexo: string;
  id: number;
  estadoPublicacion: Estado;
  model = new Publicacion();
  lastLazyLoadEvent: LazyLoadEvent;
  public saveProfile = true;
  public edit = false;
  file: File;
  uploadedFiles: any[] = [];
  publicacion: Publicacion;
  animal: Animal
  usuario: User;
  isEdit: boolean;
  cols: any[];
  listaSexo: Item[];
  listaEdad: any[];
  token;
  pl;
  archivo: any;
  imagenUp: string;

  @ViewChild('dt', { static: true }) public tabla: Table;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService, public fb: FormBuilder,
    public tipoAnimalService: TipoAnimalService, public publicacionService: PublicacionService,
    public razaService: RazaService, public tamanoAnimalService: TamanoAnimalService,
    public condicionService: CondicionService, public usuarioService: UsuarioService, public localService: LocalService) {

    this.token = localStorage.getItem("userLogin");
    this.pl = JSON.parse(this.token);
    this.usuario = this.getUserId(this.pl.user.id);
  }

  ngOnInit() {

    //this.listarRazas();
    this.listarTamanoAnimal();
    this.listarTipoAnimal();
    this.listarCondicion();
    this.listarLocales();
    this.loadModel();

    this.cols = [
      { field: 'nombre', header: 'Tipo Local', width: '250px' },
      { field: 'estadoAux', header: 'Estado', width: '150px' }
    ];

    this.listaSexo = [
      { name: 'Macho', code: 'Macho' },
      { name: 'Hembra', code: 'Hembra' }
    ];

    this.listaEdad = [
      { name: '0 - 11 Meses', code: '0' },
      { name: '1 - 2 Años', code: '1' },
      { name: '2 - 3 Años', code: '2' },
      { name: '4 - 5 Años', code: '3' },
      { name: '6 - ? Años', code: '4' }
    ];
  }

  onBasicUpload(event) {
    this.file = event.files[0]
    this.getBase64File();
    if (this.file != null) {
      this.imagenUp = "IMAGEN SUBIDA CORRECTAMENTE";
    } else {
      this.imagenUp = '';
    }
  }

  getUserId(id) {
    this.usuarioService.getUserId(id).subscribe((data: User) => {
      this.usuario = data;

    });
    return this.usuario;
  }

  loadModel() {
    this.isEdit = this.route.snapshot.data.isEdit;
    if (this.isEdit) {
      this.route.params.subscribe(p => {
        const id = p['id'];
        this.publicacionService.getFindById(id).subscribe((data: Publicacion) => {
          if (data) {
            this.model = data;
            console.log("model ", data);

            this.modelToForm(data);
          }
        });
      });
    }
    
  }

  modelToForm(data) {
    
    this.nombre = data.animal.nombre;
    this.tipoAnimal = data.animal.raza.tipoAnimal;
    this.raza = data.animal.raza;
    this.sexo = data.animal.sexo
    this.tamanoAnimal = data.animal.tamanoAnimal;
    this.listaEdad.forEach(edad => {
      if(edad.name ==data.animal.edad ){
        this.edad = edad;
      }
    });

    this.condicion = data.condicion;
    this.descripcion = data.descripcion;
    this.local = data.animal.local;

  }


  getRazaId(id) {
    this.listaRazas = [];
    this.razaService.findAllById(id).subscribe(
      (data: Raza[]) => {
        this.listaRazas = data;
        console.log(data);
        
      },
      error => {
        this.listaRazas = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }

  changeTipoAnimal() {
    this.getRazaId(this.tipoAnimal.id);

  }

  listarCondicion() {
    this.listaCondicion = [];
    this.condicionService.getAll().subscribe(
      (data: Condicion[]) => {
        this.listaCondicion = data;
      },
      error => {
        this.listaCondicion = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }

  listarTipoAnimal() {
    this.listaTipoAnimal = [];
    this.tipoAnimalService.getAll().subscribe(
      (data: TipoAnimal[]) => {
        this.listaTipoAnimal = data;
      },
      error => {
        this.listaTipoAnimal = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }

  listarTamanoAnimal() {
    this.listaTamanoAnimal = [];
    this.tamanoAnimalService.getAll().subscribe(
      (data: TamanoAnimal[]) => {
        this.listaTamanoAnimal = data;
      },
      error => {
        this.listaTamanoAnimal = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }

  listarLocales() {
    this.listaLocales = [];
    this.localService.getAll().subscribe(
      (data: Local[]) => {
        this.listaLocales = data;
        console.log('locales', data);
        
      },
      error => {
        this.listaLocales = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }

  listarRazas() {
    this.listaRazas = [];
    this.razaService.getAll().subscribe(
      (data: Raza[]) => {
        this.listaRazas = data;
      },
      error => {
        this.listaRazas = [];
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';
        //this.alertService.danger(errorMessage);
      }
    );
  }


  doAction(data, accion) {
    if (accion == 'state') {
      data.enabled = !data.enabled;

      let message;
      if (data.enabled) {
        message = 'usuario activado correctamente.';
      } else {
        message = 'usuario desactivado correctamente.';
      }
      // this.updateUser(data, message);

    } else {
      this.nombre = data.nombre;
      this.id = data.id;
      this.estadoSelected = data.estado;


    }
  }


  formToModel(): void {


    this.model.id = this.id;
    this.animal = new Animal();
    this.animal.edad = this.edad.name;
    this.animal.nombre = this.nombre;
    this.animal.raza = this.raza;
    this.animal.tamanoAnimal = this.tamanoAnimal;
    this.animal.sexo = this.sexo;
    this.animal.estado = true;
    this.animal.local = this.local;
    this.model.descripcion = this.descripcion;
    this.model.estado = this.estadoSelected;
    this.model.animal = this.animal;

      this.getBase64File();
      this.model.archivo = this.archivo;
      this.model.nombreArchivo = this.file.name;
    
          
    this.model.usuarioPublica = this.usuario;

    this.model.condicion = this.condicion;

    console.log('publicacion ', this.model);
  }


  formToModelUpdate(): void {


    this.model.animal.edad = this.edad.name;
    this.model.animal.nombre = this.nombre;
    this.model.animal.raza = this.raza;
    this.model.animal.tamanoAnimal = this.tamanoAnimal;
    this.model.animal.sexo = this.sexo;
    this.model.animal.local = this.local;
    this.model.descripcion = this.descripcion;
    this.model.estado = this.estadoSelected;

    // if(!this.isEdit){
    //   this.getBase64File();
    //   this.model.archivo = this.archivo;
    //   this.model.nombreArchivo = this.file.name;
    // }
          

    this.model.usuarioPublica = this.usuario;

    this.model.condicion = this.condicion;

    console.log('publicacion update', this.model);


  }

  async getBase64File() {
    const file = await toBase64(this.file);
    this.archivo = file;
    this.model.archivo = this.archivo;
    setTimeout(() => {
      this.archivo = file;
      //this.model.archivo = this.archivo;
    }, 200);

  }

  limpiarData() {
    this.id = undefined;
    this.nombre = '';
    this.sexo = null;
    this.edad = null;
    this.condicion = null;
    this.descripcion = '';
    this.tipoAnimal = null;
    this.raza = null;
    this.tamanoAnimal = null;

  }

  showConshowConfirmDeletefirm(data) {
    this.messageService.clear();
    this.publicacion = data;
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Seguro que desea eliminar?' });
  }

  onConfirm(data) {
    console.log('data elimina', data);
    //this.deleteTipoLocal(data, 'Tipo Local eliminado correctamente');
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }


  save() {
    let message;
    if (this.nombre == '' || this.nombre == undefined) {
      this.showMsg('warn', 'Escriba un nombre', 'Publicación');
      return;
    }

   

    if(this.isEdit){
      this.formToModelUpdate();
    }else{
      this.formToModel();
    }
    

    this.publicacionService.save(this.model).subscribe(
      data => {
        if (data != null) {
          this.showMsg('success', 'Se guardó correctamente', 'Publicación');
          this.limpiarData();
        }

      },
      error => {
        const errorMessage =
          error.message != undefined
            ? error.message
            : 'No se pudo procesar la petición';

        this.showMsg('danger', errorMessage);
      }
    );

  }

  public filterListTipoAnimal(event) {
    let query = event.query
    this.listaTipoAnimal = this.filterTipoAnimal(query, this.listaTipoAnimal);

}

filterTipoAnimal(query, lista: TipoAnimal[]): TipoAnimal[] {
    let filtered: TipoAnimal[] = [];
    for (let i = 0; i < lista.length; i++) {
        let model = lista[i];
        if (model.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(model);
        }
    }
    return filtered;
}


public filterListRaza(event) {
  let query = event.query
  this.listaRazas = this.filterRaza(query, this.listaRazas);

}

filterRaza(query, lista: Raza[]): Raza[] {
  let filtered: Raza[] = [];
  for (let i = 0; i < lista.length; i++) {
      let model = lista[i];
      if (model.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(model);
      }
  }
  return filtered;
}



public filterListTamano(event) {
  let query = event.query
  this.listaTamanoAnimal = this.filterTamano(query, this.listaTamanoAnimal);

}

filterTamano(query, lista: TamanoAnimal[]): TamanoAnimal[] {
  let filtered: TamanoAnimal[] = [];
  for (let i = 0; i < lista.length; i++) {
      let model = lista[i];
      if (model.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(model);
      }
  }
  return filtered;
}

public filterListCondicion(event) {
  let query = event.query
  this.listaCondicion = this.filterTamano(query, this.listaCondicion);

}

filterCondicion(query, lista: Condicion[]): Condicion[] {
  let filtered: Condicion[] = [];
  for (let i = 0; i < lista.length; i++) {
      let model = lista[i];
      if (model.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(model);
      }
  }
  return filtered;
}

public filterListLocal(event) {
  let query = event.query
  this.listaLocales = this.filterLocal(query, this.listaLocales);

}

filterLocal(query, lista: Local[]): Local[] {
  let filtered: Local[] = [];
  for (let i = 0; i < lista.length; i++) {
      let model = lista[i];
      if (model.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(model);
      }
  }
  return filtered;
}

  showMsg(type: string, msg: string, title: string = 'Tipo Local') {
    this.messageService.add({ key: 'tst', severity: type, summary: title, detail: msg });
  }

}