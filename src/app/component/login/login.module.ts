import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PaginasInteresModule } from '../paginas-interes/paginas-interes.module';
import { LoginComponent } from './component/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { PoliticaComponent } from '../politica/politica.component';

@NgModule({
  declarations: [LoginComponent, PoliticaComponent],
  imports: [
      SharedModule,
      PaginasInteresModule,
      CommonModule,
      LoginRoutingModule


  ]
})
export class LoginModule { }