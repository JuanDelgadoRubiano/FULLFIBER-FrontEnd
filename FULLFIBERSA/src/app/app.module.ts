import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CompartidosModule} from './Componentes/compartidos/compartidos.module'

//COMPONENTES 

import { IngresoComponent } from './Componentes/ingreso/ingreso.component';
import { LogsDeCambioComponent } from './Componentes/logs-de-cambio/logs-de-cambio.component';

@NgModule({
  declarations: [
    AppComponent,
    IngresoComponent,
    LogsDeCambioComponent

  ],
  imports: [
    CompartidosModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
