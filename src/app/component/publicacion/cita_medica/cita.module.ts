import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { CitaMedicaComponent } from './component/cita.component';
import { CitaMedicaRoutingModule } from './cita-routing.module';

@NgModule({
  declarations: [CitaMedicaComponent],
  imports: [
      SharedModule,
      CommonModule,
      CitaMedicaRoutingModule
  ]
})
export class CitaMedicaModule { }