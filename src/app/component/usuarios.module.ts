import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';



@NgModule({
  declarations: [UsuarioComponent,UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
