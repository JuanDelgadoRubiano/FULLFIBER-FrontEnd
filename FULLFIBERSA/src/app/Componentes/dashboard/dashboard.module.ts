import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CompartidosModule } from '../compartidos/compartidos.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GenerarReporteComponent } from './generar-reporte/generar-reporte.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistrarCampanhasComponent } from './registrar-campanhas/registrar-campanhas.component';
import { RegistrarProductosComponent } from './registrar-productos/registrar-productos.component';
import { ModificarClienteCampanhaComponent } from './modificar-cliente-campanha/modificar-cliente-campanha.component';
import { AsignarCampanhasComponent } from './asignar-campanhas/asignar-campanhas.component';
import { ModificandoClienteCampanhaComponent } from './modificando-cliente-campanha/modificando-cliente-campanha.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    GenerarReporteComponent,
    InicioComponent,
    RegistrarCampanhasComponent,
    RegistrarProductosComponent,
    ModificarClienteCampanhaComponent,
    AsignarCampanhasComponent,
    ModificandoClienteCampanhaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CompartidosModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
