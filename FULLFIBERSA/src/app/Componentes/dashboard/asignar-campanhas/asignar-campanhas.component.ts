import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignacionCampanhasService } from 'src/app/servicios/asignacion-campanhas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-asignar-campanhas',
  templateUrl: './asignar-campanhas.component.html',
  styleUrls: ['./asignar-campanhas.component.css']
})
export class AsignarCampanhasComponent implements OnInit {

  constructor(private asignarCampanhasService: AsignacionCampanhasService,
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

  // METODO QUE HACE EL LLAMADO AL PROCESO MASIVO DE ASIGNACION DE CAMPAÑAS.
  asignarCampanhas(){
    this.asignarCampanhasService.asignarCampanhas().subscribe(
      (response: number) =>{
        Swal.fire({
          icon: 'success',
          title: 'Asignado!',
          text: 'Campañas asignadas Correctamente',
          showConfirmButton: false,
          timer: 2000
        });
      },
      (error: HttpErrorResponse ) =>{
        Swal.fire({
          icon: 'error',
          title: 'Fallo!',
          text: 'Las campañas no se asignaron Correctamente',
          showConfirmButton: false,
          timer: 2000
        });
      }
      );

  }

}
