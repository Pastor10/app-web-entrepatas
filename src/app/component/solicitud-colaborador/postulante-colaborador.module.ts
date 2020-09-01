import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PostulanteColaboradorRoutingModule } from './postulante-colaborador-routing.module';
import { PostulanteColaboradorComponent } from './postulantes/postulante-colaborador.component';

@NgModule({
  declarations: [PostulanteColaboradorComponent],
  imports: [
      SharedModule,
      CommonModule,
      PostulanteColaboradorRoutingModule


  ]
})
export class PostulanteColaboradorModule { }