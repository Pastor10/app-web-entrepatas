import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PaginasInteresModule } from '../paginas-interes/paginas-interes.module';
import { ActiveCuentaComponent } from './active-cuenta/activecuenta.component';
import { ActiveRoutingModule } from './active-routing.module';

@NgModule({
  declarations: [ActiveCuentaComponent],
  imports: [
      SharedModule,
      PaginasInteresModule,
      CommonModule,
      ActiveRoutingModule


  ]
})
export class ActiveModule { }