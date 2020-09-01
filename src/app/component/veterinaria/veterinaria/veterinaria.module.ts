import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { VeterinariaRoutingModule } from './veterinaria-routing.module';
import { VeterinariaComponent } from './component/veterinaria.component';

@NgModule({
  declarations: [VeterinariaComponent],
  imports: [
      SharedModule,
      CommonModule,
      VeterinariaRoutingModule


  ]
})
export class VeterinariaModule { }