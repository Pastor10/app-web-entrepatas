import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './component/perfil.component';

@NgModule({
  declarations: [PerfilComponent],
  imports: [
      SharedModule,
      CommonModule,
      PerfilRoutingModule


  ]
})
export class PerfilModule { }