import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PaginasInteresModule } from '../paginas-interes/paginas-interes.module';
import { ConocenosComponent } from './component/conocenos.component';
import { ConocenosRoutingModule } from './conocenos-routing.module';

@NgModule({
  declarations: [ConocenosComponent],
  imports: [
      SharedModule,
      PaginasInteresModule,
      CommonModule,
      ConocenosRoutingModule


  ]
})
export class ConocenosModule { }