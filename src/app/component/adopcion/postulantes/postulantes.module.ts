import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PostulantesRoutingModule } from './postulantes-routing.module';
import { PostulanteComponent } from './component/postulantes.component';

@NgModule({
  declarations: [PostulanteComponent],
  imports: [
      SharedModule,
      CommonModule,
      PostulantesRoutingModule


  ]
})
export class PostulantesModule { }