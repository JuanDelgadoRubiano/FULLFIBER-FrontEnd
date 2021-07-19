import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenerarReporteService } from 'src/app/servicios/generar-reporte.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css']
})
export class GenerarReporteComponent implements OnInit {

  constructor(private reporteServicio: GenerarReporteService,
              private router: Router) { }

  ngOnInit(): void {
    // VALIDACION DE QUE HAYA UN ADMIN LOGEADO
    if(sessionStorage.getItem('idAdmin') === '0'){
      Swal.fire({
        icon: 'info',
        title: 'Alerta',
        text: 'Debes logearte para acceder a esta ruta',
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigateByUrl("/ingreso");
    }
  }

  // METODO QUE CARGA LA URL QUE GENERA EL EXCELL CON EL REPORTE DE CLIENTES Y CAMPAÑAS.
  generarReporte(){
    window.open('http://localhost:8080/clienteCampanha/generarReporte')
  }

}
