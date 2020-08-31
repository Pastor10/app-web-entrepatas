import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { TipoEventoComponent } from './component/tipoevento.component';

const routes: Routes = [
    { path: '', component: TipoEventoComponent, canActivate: [AuthGuard] },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoEventoRoutingModule { }