import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { GeneraAdopcionRoutingModule } from './genera-adopcion-routing.module';
import { GeneraAdopcionComponent } from './component/genera.component';

@NgModule({
  declarations: [GeneraAdopcionComponent],
  imports: [
      SharedModule,
      CommonModule,
      GeneraAdopcionRoutingModule


  ]
})
export class GeneraAdopcionModule { }