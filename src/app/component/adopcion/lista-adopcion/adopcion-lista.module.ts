import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ListaAdopcionRoutingModule } from './adopcion-lista-routing.module';
import { AdopcionComponent } from './component/adopciones.component';

@NgModule({
  declarations: [AdopcionComponent],
  imports: [
      SharedModule,
      CommonModule,
      ListaAdopcionRoutingModule


  ]
})
export class AdopcionListaModule { }