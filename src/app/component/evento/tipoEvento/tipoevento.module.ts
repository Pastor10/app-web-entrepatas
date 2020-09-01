import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { TipoEventoRoutingModule } from './tipoevento-routing.module';
import { TipoEventoComponent } from './component/tipoevento.component';

@NgModule({
  declarations: [TipoEventoComponent],
  imports: [
      SharedModule,
      CommonModule,
      TipoEventoRoutingModule


  ]
})
export class TipoEventoModule { }