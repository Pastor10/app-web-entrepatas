import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdoptaComponent } from './component/adopta.component';
import { CommonModule } from '@angular/common';
import { AdoptaRoutingModule } from './adopta-routing.module';
import { PaginasInteresModule } from '../paginas-interes/paginas-interes.module';

@NgModule({
  declarations: [AdoptaComponent],
  imports: [
      SharedModule,
      PaginasInteresModule,
      CommonModule,
      AdoptaRoutingModule


  ]
})
export class AdoptaModule { }