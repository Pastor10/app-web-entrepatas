import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PaginasInteresModule } from '../paginas-interes/paginas-interes.module';
import { UneteComponent } from './component/unete.component';
import { UneteRoutingModule } from './unete-routing.module';

@NgModule({
  declarations: [UneteComponent],
  imports: [
      SharedModule,
      PaginasInteresModule,
      CommonModule,
      UneteRoutingModule


  ]
})
export class UneteModule { }