import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RazaRoutingModule } from './raza-routing.module';
import { RazaComponent } from './component/raza.component';

@NgModule({
  declarations: [RazaComponent],
  imports: [
      SharedModule,
      CommonModule,
      RazaRoutingModule


  ]
})
export class RazaModule { }