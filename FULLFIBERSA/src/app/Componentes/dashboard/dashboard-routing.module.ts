import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsDeCambioComponent } from '../logs-de-cambio/logs-de-cambio.component';
import { AsignarCampanhasComponent } from './asignar-campanhas/asignar-campanhas.component';
import { DashboardComponent } from './dashboard.component';
import { GenerarReporteComponent } from './generar-reporte/generar-reporte.component';
import { InicioComponent } from './inicio/inicio.component';
import { ModificandoClienteCampanhaComponent } from './modificando-cliente-campanha/modificando-cliente-campanha.component';
import { ModificarClienteCampanhaComponent } from './modificar-cliente-campanha/modificar-cliente-campanha.component';
import { RegistrarCampanhasComponent } from './registrar-campanhas/registrar-campanhas.component';
import { RegistrarProductosComponent } from './registrar-productos/registrar-productos.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, children : [
      {path: 'inicio', component: InicioComponent },
      {path: 'registrarProductos', component: RegistrarProductosComponent},
      {path: 'ovas', component: RegistrarCampanhasComponent },
      {path: 'modificarCampañas', component: ModificarClienteCampanhaComponent },
      {path: 'asignarCampañas', component: AsignarCampanhasComponent },
      {path: 'reporte', component: GenerarReporteComponent },
      {path: 'reporteLogs', component: LogsDeCambioComponent },
      {path: 'modificandoCliente', component: ModificandoClienteCampanhaComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
