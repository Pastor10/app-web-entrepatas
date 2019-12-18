import {Router} from "@angular/router";
import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { ListaVideoService } from "src/app/shared/service/listavideo.service";
import { ListaVideo } from "src/app/shared/model/listavideo.model";
import { ListaVideoVideo } from "src/app/shared/model/listavideovideo.model";
import { ModalDirective } from "angular-bootstrap-md";

import {VideoService} from '../../../shared/service/video.service';
import {Video} from '../../../shared/model/video.model';

@Component({
  selector: 'app-listavideo',
  templateUrl: './listavideo.component.html',
  styleUrls: ['./listavideo.component.css']
})
export class ListaVideoComponent implements OnInit, AfterViewInit  {

  
  public listavideos: ListaVideo[];
  public listavideo: ListaVideo = new ListaVideo();
  public id: number = 0;
  public enableBtnBuscar = true;
  public enableBtnGuardar = true;
  public enableFormCrear = false;
  public firstItemIndex;
  public lastItemIndex;
  public valueInput: string = '';
  public titleModal: string = 'Crear Lista de Videos';

  
  public videoTmp: Video;
  public videoTmp2: Video;
  public videosAll: Video[];
  public selectedVideos: Video[] = [];
  public selectedToAdd: Video[] = [];
  public selectedToRemove: Video[] = [];


  @ViewChild('form') public modal: ModalDirective;
  @ViewChild('confirmDelete') public confirmDelete: ModalDirective;
  @ViewChild('listaSeleccionados') public listaSeleccionados: ModalDirective;

  constructor(public router: Router,
    public listaVideoService: ListaVideoService, public alertService: AlertService,
    public videoService: VideoService,
    public cdRef: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.search();
  }

  public enter(event:any){
    if(event.keyCode == 13){
       this.search();
    }
 }

 public search() {
    this.enableBtnBuscar = false;
    this.listaVideoService.getAll().subscribe(
      data => {
        this.enableBtnBuscar = true;
        this.listavideos = <ListaVideo[]>data;
      },
      error => {
        this.listavideos = [];
        this.enableBtnBuscar = true;
        var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
        this.alertService.danger(errorMessage);
      }
    );
  }

  public showConfirmDelete(id: number){
    this.id = id;
    this.confirmDelete.show();
  }

  public delete(): void {
    this.enableBtnBuscar = false;
    this.listaVideoService.delete(this.id)
      .subscribe( data => {
        this.enableBtnBuscar = true;
        this.alertService.success("Se borro correctamente el registro seleccionado " );
        this.confirmDelete.hide();
        this.search();
      },
      error => {
        this.enableBtnBuscar = true;
        var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
        this.alertService.danger(errorMessage);
      });
  }

  public loadCreate(): void {
    this.listavideo = new ListaVideo();
    this.titleModal = 'Crear Lista de Videos';
    this.inicializarFormulario();
    this.videoService.getAll().subscribe(
      data => {
        this.videosAll = <Video[]>data;
        this.modal.show();
      },
      error => {this.videosAll = [];}
    );
  }


  private inicializarFormulario(): void {
    this.selectedVideos = [];
    this.selectedToAdd = [];
    this.selectedToRemove = [];
  }

  public loadEdit(id: number): void {
    this.enableBtnBuscar = false;
    this.inicializarFormulario();

    //solicitamos todos los videos
    this.videoService.getAll().subscribe(
      data => {

        this.videosAll = <Video[]>data;

        //ahora solicitamos el video que estamos editando
        this.listaVideoService.getById(id)
          .subscribe( data => {
            this.titleModal = "Modificar Lista de Videos";
            this.enableBtnBuscar = true;
            this.listavideo =  <ListaVideo>data;

            //formateamos el formulario
            this.formatDataEdit();
            this.modal.show();
        },
        error => {
            this.enableBtnBuscar = true;
            var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
            this.alertService.danger(errorMessage);
        });

      },
      error => {this.videosAll = [];}
    );

    
  }

  public save(): void {
    
    if(this.formularioValido()){
      this.enableBtnBuscar = false;
      this.formatData();
      this.listaVideoService.save(this.listavideo)
        .subscribe(
          data => {
            this.enableBtnGuardar = true;
            console.log(this.listavideo);
            this.listavideo = new ListaVideo();
            this.alertService.success("Se guardó correctamente");
            this.modal.hide();
            this.search();
          },
          error => {
            this.enableBtnGuardar = true;
            var errorMessage = error.message != undefined ? error.message : 'No se pudo procesar la peticion';
            this.alertService.danger(errorMessage);
          }
      );
    }
  }


  public formatData():void{
    this.listavideo.listaVideos = [];
    for(var i=0;i<this.selectedVideos.length;i++){
      this.listavideo.listaVideos.push(new ListaVideoVideo(i,this.selectedVideos[i]));
    }
  }


  public formatDataEdit():void{
    for(var i=0;i<this.listavideo.listaVideos.length;i++){
      this.selectedVideos.push(this.listavideo.listaVideos[i].video);
      var encontrado = false;
      var indice = -1;
      for(var j=0;j<this.videosAll.length;j++){
        if(this.listavideo.listaVideos[i].video.idVideo==this.videosAll[j].idVideo){
          encontrado = true;
          indice = j; 
          break;
        }
      }
      if(encontrado){
        this.videosAll.splice(indice,1);
      }
    }
  }


  //Validamos el formulario antes de registrar el video
  public formularioValido() : boolean{
    
    //1. nombre de la lista
    if(this.listavideo.desListaVideos==null || this.listavideo.desListaVideos.length==0){
        var errorMessage = 'Debe de ingresar el nombre de la lista.';
        this.alertService.danger(errorMessage);
        return false;
    }

    //2. debe ingresar al menos un video
    if(this.selectedVideos.length==0){
        var errorMessage = 'Debe seleccionar al menos un v\u00EDdeo';
        this.alertService.danger(errorMessage);
        return false;
    }

    return true; 
  }

  public seleccionarVideos(videosAll){
    this.selectedToAdd = videosAll;
  }

  public seleccionarVideosToRemove(videosAll) {
    this.selectedToRemove = videosAll;
  }

  public agregarItem():void{
    this.selectedVideos = this.selectedVideos.concat(this.selectedToAdd);
    this.videosAll = this.videosAll.filter(v => {
      return this.selectedVideos.indexOf(v) < 0;
    });
    this.selectedToAdd = [];
  }

  public quitarItem():void{
    this.videosAll = this.videosAll.concat(this.selectedToRemove);
    this.selectedVideos = this.selectedVideos.filter(selectedVideo => {
      return this.videosAll.indexOf(selectedVideo) < 0;
    });
    this.selectedToRemove = [];
  }

  public agregarTodo():void{
    this.selectedVideos = this.selectedVideos.concat(this.videosAll);
    this.videosAll = [] ;
    this.selectedToAdd = [];
  }

  public quitarTodo():void{
    this.videosAll = this.videosAll.concat(this.selectedVideos);
    this.selectedToAdd = [];
    this.selectedVideos = [];
    this.selectedToRemove = [];
  }

  public subir():void{
    if(this.selectedToRemove.length==1){
      this.videoTmp = this.selectedToRemove[0];
      var j = this.selectedVideos.indexOf(this.videoTmp)
      
      if(j>0){
        this.videoTmp2 = this.selectedVideos[j-1];//guardo la variable
        this.selectedVideos[j-1] = this.videoTmp;//asigno
        this.selectedVideos[j] = this.videoTmp2;//reasigno
      }

    }else{
      var errorMessage = 'Debe seleccionar solo un v\u00EDdeo';
      this.alertService.danger(errorMessage);
    }

  }

  public bajar():void{
    if(this.selectedToRemove.length==1){

      this.videoTmp = this.selectedToRemove[0];
      var j = this.selectedVideos.indexOf(this.videoTmp)
      
      if(j<this.selectedVideos.length-1){
        this.videoTmp2 = this.selectedVideos[j+1];//guardo la variable que voy a chancar
        this.selectedVideos[j+1] = this.videoTmp;//asigno
        this.selectedVideos[j] = this.videoTmp2;//reasigno
      }

    }else{
      var errorMessage = 'Debe seleccionar solo un v\u00EDdeo';
      this.alertService.danger(errorMessage);
    }

  }

  public primero():void{
    if(this.selectedToRemove.length==1){
      this.videoTmp = this.selectedToRemove[0];
      var j = this.selectedVideos.indexOf(this.videoTmp)
      for(var i=j-1;i>=0;i--){
        this.selectedVideos[i+1] = this.selectedVideos[i]; 
      }
      this.selectedVideos[0] = this.videoTmp;
    }else{
      var errorMessage = 'Debe seleccionar solo un v\u00EDdeo';
      this.alertService.danger(errorMessage);
    }
  }

  public ultimo():void{
    if(this.selectedToRemove.length==1){
      this.videoTmp = this.selectedToRemove[0];
      var j = this.selectedVideos.indexOf(this.videoTmp)
      for(var i=j;i<this.selectedVideos.length;i++){
        this.selectedVideos[i] = this.selectedVideos[i+1]; 
      }
      this.selectedVideos[this.selectedVideos.length-1] = this.videoTmp;
    }else{
      var errorMessage = 'Debe seleccionar solo un v\u00EDdeo';
      this.alertService.danger(errorMessage);
    }
  }


  public add(): void {
    this.router.navigate(['add-listavideo']);
  }

  public ngAfterViewInit() {
  }

  public onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  public getVideos(): void {
    this.videoService.getAll().subscribe(
      data => {
        this.videosAll = <Video[]>data;
      },
      error => {
        this.videosAll = [];
      }
    );
  }


}
