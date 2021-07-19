import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-logs-de-cambio',
  templateUrl: './logs-de-cambio.component.html',
  styleUrls: ['./logs-de-cambio.component.css']
})
export class LogsDeCambioComponent implements OnInit {

  constructor(private router: Router) { }

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

  // METODO QUE GENERA EL REPORTE .XLS DE TODOS LOS LOGS DE CAMBIO REALIZADOS
  generarReporte(){
    window.open('http://localhost:8080/LogsDeCambio/generarReporte')
  }

}
