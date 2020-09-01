import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { VeterinarioRoutingModule } from './veterinario-routing.module';
import { VeterinarioComponent } from './component/veterinario.component';

@NgModule({
  declarations: [VeterinarioComponent],
  imports: [
      SharedModule,
      CommonModule,
      VeterinarioRoutingModule


  ]
})
export class VeterinarioModule { }