import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoProximoComponent } from './component/eventoproximo.component';

const routes: Routes = [
    { path: '', component: EventoProximoComponent },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventosProximosRoutingModule { }