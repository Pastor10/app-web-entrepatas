import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PaginasInteresModule } from '../paginas-interes/paginas-interes.module';
import { ProcesoComponent } from './component/proceso.component';
import { ProcesoRoutingModule } from './proceso-routing.module';

@NgModule({
  declarations: [ProcesoComponent],
  imports: [
      SharedModule,
      PaginasInteresModule,
      CommonModule,
      ProcesoRoutingModule


  ]
})
export class ProcesoModule { }