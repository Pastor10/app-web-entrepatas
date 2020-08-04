import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/model/User.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Publicacion } from 'src/app/shared/model/publicacion.model';
import { PublicacionService } from 'src/app/shared/service/publicacion.service';
import { PostulanteService } from 'src/app/shared/service/postulante.service';
import { Postulante } from 'src/app/shared/model/postulante.model';
import { PathLocationStrategy } from '@angular/common';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { AdopcionService } from 'src/app/shared/service/adopcion.service';
import { Adopcion } from 'src/app/shared/model/adopcion.model';
import { Estado } from 'src/app/shared/model/estado.model';
import { Perfil } from 'src/app/shared/model/perfil.model';


@Component({
    selector: 'app-postulantes',
    templateUrl: './postulantes.component.html',
    styleUrls: ['./postulantes.component.scss']
   
})

export class PostulanteComponent implements OnInit{


responsiveOptions;
publicaciones: Publicacion[];
totalRecords: 10;
perPage = 10;
cols: any[];
publicacionSelected: Publicacion;
postulantes: Postulante[];
puntuacion: number;
postulante: Postulante;
msgs: Message[] = [];
creaUser: boolean= false;
adopcion: Adopcion;
estadoAdopcion: Estado;
user: User;
perfil: Perfil;

  constructor(public publicacionService: PublicacionService,
     public postulanteService: PostulanteService, public messageService: MessageService, 
     private confirmationService: ConfirmationService, public adopcionService: AdopcionService){
    this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

  }

ngOnInit(){
    this.getAllPublicacion();
    this.cols = [
        {field: 'fecha', header: 'Fecha', width: '70px'},
        {field: 'hora', header: 'Hora', width: '70px'},
        {field: 'usuario', header: 'Usuario publica', width: '250px'},
        {field: 'nombre', header: 'Nombre Mascota', width: '150px'},
        {field: 'sexo', header: 'Tipo/Sexo', width: '120px'},
        {field: 'condicion', header: 'Condicion', width: '150px'},
        {field: 'estado', header: 'Estado', width: '100px'},
    ];
}


    getAllPublicacion(){
        this.publicacionService.getAll().subscribe((data: Publicacion[]) =>{
            this.publicaciones = data;
            console.log(this.publicaciones );
            
        });

    }

    getAllPostulantesByPublicacion(publicacion){
        
        this.postulanteService.getAllByPublicacionId(publicacion).subscribe( (data: Postulante[])=>{
            this.postulantes = data;
            console.log("postulantes", this.postulantes );
            
            
        });
    }

    calificar(data){
        let message;
        if(data.puntuacion==null){
            message = 'Selecione al menos una estrella de puntuación';
            this.showMsg('info', message, 'Postulante');
            return;

        }
        this.postulanteService.save(data).subscribe( res =>{
            if(res!=null){
                message = 'Se realizo la calificación';
                this.showMsg('success', message, 'Postulante');
            }
        });
        
    }

    confirm1() {
        this.confirmationService.confirm({
            message: 'Esta seguro de generar adopción?',
            header: 'Generando adopción',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
            },
            reject: () => {
                this.msgs = [{severity:'error', summary:'Rejected', detail:'You have rejected'}];
            }
        });
    }

    onReject() {
        this.messageService.clear('c');
      }
      
      formToModel(data){
          this.adopcion = new Adopcion();
          console.log('crea user',this.creaUser);
          
          if(this.creaUser){
            this.user = new User();
            this.user.estado = true;
            this.user.visible = true;
            this.user.username = data.numeroDocumento;
            this.user.passwordTrans = data.numeroDocumento; //data.nombre.substr(1,1) + data.apePaterno;

            this.perfil = new Perfil();
            this.perfil.id = 4;
            this.perfil.nombre = 'visitante';
            this.perfil.activo = true;

            this.user.perfil = this.perfil;
            this.adopcion.usuario = this.user;
            


          }else{
            this.adopcion.persona =data.persona;
          }
          this.adopcion.animal = data.publicacion.animal;
          this.adopcion.estado = true;
          
        //   this.estadoAdopcion = new Estado();
        //   this.estadoAdopcion.estado = true;
        //   this.estadoAdopcion.nombre = 'Adoptado';
        //   this.estadoAdopcion.id = 1;
        //   this.adopcion.estadoAdopcion = this.estadoAdopcion;

          console.log("adopcion ", this.adopcion);
          



      }

      onConfirm(data) {
          console.log("postulanee, ", data);
          let message;
          this.formToModel(data);
          this.adopcionService.save(this.adopcion).subscribe(res=>{
              if(res!=null){
                message = 'Se registro la adpción correctamente';
                this.showMsg('success', message, 'Adopción');
              }
          });
        this.messageService.clear('c');
      }


    showMsg( type: string, msg: string, title: string) {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }

      showConfirm(data) {
        this.postulante = data;
        this.messageService.clear();
        //this.data = data;
        this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Esta seguro de generar adopción?'});
    }
    
}