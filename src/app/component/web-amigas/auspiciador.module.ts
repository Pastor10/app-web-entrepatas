import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PaginasInteresModule } from '../paginas-interes/paginas-interes.module';
import { WebAmigaComponent } from './component/webamigas.component';
import { AuspiciadorRoutingModule } from './auspiciador-routing.module';

@NgModule({
  declarations: [WebAmigaComponent],
  imports: [
      SharedModule,
      PaginasInteresModule,
      CommonModule,
      AuspiciadorRoutingModule


  ]
})
export class AuspiciadorModule { }