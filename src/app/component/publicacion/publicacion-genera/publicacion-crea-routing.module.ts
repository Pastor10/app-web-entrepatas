import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { GenerarPublicacionComponent } from './component/generarpublicacion.component';

const routes: Routes = [
    { path: '', component: GenerarPublicacionComponent, canActivate: [AuthGuard] },
    {
        path: ':id', component: GenerarPublicacionComponent, data: {
            modeRoot: false,
            isEdit: true,
            title: 'Editar Publicacion',
        }, canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicacionCreaRoutingModule { }