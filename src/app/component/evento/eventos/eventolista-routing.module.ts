import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { EventoListaComponent } from './component/eventolista.component';

const routes: Routes = [
    { path: '', component: EventoListaComponent, canActivate: [AuthGuard] },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventosListaRoutingModule { }