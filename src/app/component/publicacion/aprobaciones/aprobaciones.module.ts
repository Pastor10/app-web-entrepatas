import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { AprobacionPublicacionComponent } from './component/aprobaciones.component';
import { AprobacionesRoutingModule } from './aprobaciones-routing.module';

@NgModule({
  declarations: [AprobacionPublicacionComponent],
  imports: [
      SharedModule,
      CommonModule,
      AprobacionesRoutingModule
  ]
})
export class AprobacionesModule { }