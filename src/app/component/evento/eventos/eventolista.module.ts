import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { EventoListaComponent } from './component/eventolista.component';
import { EventosListaRoutingModule } from './eventolista-routing.module';

@NgModule({
  declarations: [EventoListaComponent],
  imports: [
      SharedModule,
      CommonModule,
      EventosListaRoutingModule


  ]
})
export class EventoListaModule { }