import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PublicacionCreaRoutingModule } from './publicacion-crea-routing.module';
import { GenerarPublicacionComponent } from './component/generarpublicacion.component';

@NgModule({
  declarations: [GenerarPublicacionComponent],
  imports: [
      SharedModule,
      CommonModule,
      PublicacionCreaRoutingModule
  ]
})
export class PublicacionCreaModule { }