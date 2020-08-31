import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PoliticaComponent } from './politica.component';

@NgModule({
  declarations: [PoliticaComponent],
  imports: [
      SharedModule,
      CommonModule


  ]
})
export class PoliticaModule { }