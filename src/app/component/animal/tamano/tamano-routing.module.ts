import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { TamanoAnimalComponent } from './component/tamanoanimal.component';

const routes: Routes = [
    { path: '', component: TamanoAnimalComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TamanoRoutingModule { }