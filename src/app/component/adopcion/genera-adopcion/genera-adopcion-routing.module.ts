import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { GeneraAdopcionComponent } from './component/genera.component';

const routes: Routes = [
    { path: '', component: GeneraAdopcionComponent, canActivate: [AuthGuard] },
    {
        path: ':id', component: GeneraAdopcionComponent, data: {
            modeRoot: false,
            isEdit: true,
            title: 'Adopcion usuario',
        }, canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeneraAdopcionRoutingModule { }