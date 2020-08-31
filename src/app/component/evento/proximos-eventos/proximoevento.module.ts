import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { EventosProximosRoutingModule } from './proximoevento-routing.module';
import { EventoProximoComponent } from './component/eventoproximo.component';
import { PaginasInteresModule } from '../../paginas-interes/paginas-interes.module';

@NgModule({
  declarations: [EventoProximoComponent],
  imports: [
      SharedModule,
      CommonModule,
      PaginasInteresModule,
      EventosProximosRoutingModule


  ]
})
export class EventoProximosModule { }