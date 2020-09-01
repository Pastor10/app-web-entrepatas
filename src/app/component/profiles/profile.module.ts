import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilesComponent } from './component/profiles.component';

@NgModule({
  declarations: [ProfilesComponent],
  imports: [
      SharedModule,
      CommonModule,
      ProfileRoutingModule
  ]
})
export class ProfileModule { }