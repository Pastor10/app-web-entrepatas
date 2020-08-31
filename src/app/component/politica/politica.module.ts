import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PaginasInteresModule } from '../paginas-interes/paginas-interes.module';
import { PoliticaComponent } from './politica.component';

@NgModule({
  declarations: [PoliticaComponent],
  imports: [
      SharedModule,
      PaginasInteresModule,
      CommonModule


  ]
})
export class PoliticaModule { }