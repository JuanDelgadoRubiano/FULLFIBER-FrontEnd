import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './Componentes/ingreso/ingreso.component';


const routes: Routes = [
  {path: '', redirectTo: 'ingreso', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('./Componentes/dashboard/dashboard.module').then(x => x.DashboardModule)},
  {path: 'ingreso', component: IngresoComponent},
  {path: '**', redirectTo: 'ingreso', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
