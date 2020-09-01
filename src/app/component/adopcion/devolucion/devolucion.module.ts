import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { DevolucionComponent } from './component/devolucion.component';
import { DevolucionRoutingModule } from './devolucion-routing.module';

@NgModule({
  declarations: [DevolucionComponent],
  imports: [
      SharedModule,
      CommonModule,
      DevolucionRoutingModule


  ]
})
export class DevolucionModule { }