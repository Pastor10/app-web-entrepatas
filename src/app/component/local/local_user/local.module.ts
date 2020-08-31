import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { LocalRoutingModule } from './local-routing.module';
import { LocalComponent } from './component/local.component';

@NgModule({
  declarations: [LocalComponent],
  imports: [
      SharedModule,
      CommonModule,
      LocalRoutingModule


  ]
})
export class LocalModule { }