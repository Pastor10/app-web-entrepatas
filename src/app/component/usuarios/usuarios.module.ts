import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './component/usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
      SharedModule,
      CommonModule,
      UsuariosRoutingModule


  ]
})
export class UsuariosModule { }