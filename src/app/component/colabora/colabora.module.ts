import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PaginasInteresModule } from '../paginas-interes/paginas-interes.module';
import { ColaboraComponent } from './component/colabora.component';
import { ColaboraRoutingModule } from './colabora-routing.module';

@NgModule({
  declarations: [ColaboraComponent],
  imports: [
      SharedModule,
      PaginasInteresModule,
      CommonModule,
      ColaboraRoutingModule


  ]
})
export class ColaboraModule { }