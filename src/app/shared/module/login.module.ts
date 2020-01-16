import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LoginComponent } from 'src/app/component/login/login.component';

import { SharedModule } from 'primeng/components/common/shared';
import { LoginRoutingModule } from './login-routing.module';




@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule,
        
    ]
})
export class LoginModule {
}
