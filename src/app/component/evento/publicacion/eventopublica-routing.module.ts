import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { EventoPublicaComponent } from './component/eventopublica.component';

const routes: Routes = [
    { path: '', component: EventoPublicaComponent, canActivate: [AuthGuard] },
    {
        path: ':id', component: EventoPublicaComponent, data: {
            modeRoot: false,
            isEdit: true,
            title: 'Editar Evento',
        }, canActivate: [AuthGuard]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventoCreaRoutingModule { }