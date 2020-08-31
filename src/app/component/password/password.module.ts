import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './component/password.component';
import { PasswordRoutingModule } from './password-routing.module';

@NgModule({
  declarations: [PasswordComponent],
  imports: [
      SharedModule,
      CommonModule,
      PasswordRoutingModule


  ]
})
export class PasswordModule { }