import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginaInteresComponent } from './component/interes.component';

@NgModule({
  declarations: [PaginaInteresComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PaginaInteresComponent
  ]

})
export class PaginasInteresModule { }
