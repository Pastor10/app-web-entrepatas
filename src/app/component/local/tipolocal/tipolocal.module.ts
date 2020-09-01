import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { TipoLocalRoutingModule } from './tipolocal-routing.module';
import { TipoLocalComponent } from './component/tipolocal.component';

@NgModule({
  declarations: [TipoLocalComponent],
  imports: [
      SharedModule,
      CommonModule,
      TipoLocalRoutingModule


  ]
})
export class TipoLocalModule { }