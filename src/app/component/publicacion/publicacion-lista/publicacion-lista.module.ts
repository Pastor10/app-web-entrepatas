import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PublicacionListaRoutingModule } from './publicacion-lista-routing.module';
import { PublicacionListaComponent } from './component/listapublicacion.component';

@NgModule({
  declarations: [PublicacionListaComponent],
  imports: [
      SharedModule,
      CommonModule,
      PublicacionListaRoutingModule
  ]
})
export class PublicacionListaModule { }