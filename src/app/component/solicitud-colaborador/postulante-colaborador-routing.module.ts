import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { PostulanteColaboradorComponent } from './postulantes/postulante-colaborador.component';

const routes: Routes = [
    { path: '', component: PostulanteColaboradorComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulanteColaboradorRoutingModule { }