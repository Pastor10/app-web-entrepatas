import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReporteGeneralRoutingModule } from './reporte-general-routing.module';
import { ReporteGeneralComponent } from './component/reporte-general.component';

@NgModule({
  declarations: [ReporteGeneralComponent],
  imports: [
      SharedModule,
      CommonModule,
      ReporteGeneralRoutingModule
  ]
})
export class ReporteGeneralModule { }