import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { TipoAnimalComponent } from './component/tipoanimal.component';

const routes: Routes = [
    { path: '', component: TipoAnimalComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoAnimalRoutingModule { }