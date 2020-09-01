import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { EventoCreaRoutingModule } from './eventopublica-routing.module';
import { EventoPublicaComponent } from './component/eventopublica.component';

@NgModule({
  declarations: [EventoPublicaComponent],
  imports: [
      SharedModule,
      CommonModule,
      EventoCreaRoutingModule


  ]
})
export class EventoCreaModule { }