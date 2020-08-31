import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { TamanoRoutingModule } from './tamano-routing.module';
import { TamanoAnimalComponent } from './component/tamanoanimal.component';

@NgModule({
  declarations: [TamanoAnimalComponent],
  imports: [
      SharedModule,
      CommonModule,
      TamanoRoutingModule


  ]
})
export class TamanoModule { }