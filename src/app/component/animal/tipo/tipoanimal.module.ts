import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { TipoAnimalRoutingModule } from './tipoanimal-routing.module';
import { TipoAnimalComponent } from './component/tipoanimal.component';

@NgModule({
  declarations: [TipoAnimalComponent],
  imports: [
      SharedModule,
      CommonModule,
      TipoAnimalRoutingModule


  ]
})
export class TipoAnimalModule { }