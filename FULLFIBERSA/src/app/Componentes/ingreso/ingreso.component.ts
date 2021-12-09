import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradoresRecibir } from 'src/app/interfaces/administradores';
import { AdministradoresService } from 'src/app/servicios/administradores.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  constructor(private administradoresServicio: AdministradoresService,
              private router: Router) { }

  // VARIABLES AUXILIARES PARA BINDEAR EL FORMULARIO DE INGRESO
  usuarioAux: any;
  contrasenhaAux: any;

  // VARIABLE PARA ALMACENAR EL ID DEL ADMINISTRADOR
  public idAdmin = 123;

  // OBJETO QUE SIMULA EL USUARIO Y LA CONTRASEÑA OBTENIDOS DEL BACKEND
  public usuarioAdminSimulado = {
    usuario: 'usuario',
    contraseña: 'contraseña'
  }


  ngOnInit(): void {
    sessionStorage.setItem('idAdmin', '0')
  }

  // METODO PARA VALIDAR SI EL USUARIO Y LA CONTRASEÑA SUMINISTRADOS SON CORRECTOS.
  validarUsuarioContrasenha(){
    if(this.usuarioAux == null || this.contrasenhaAux == null){
      Swal.fire({
        icon: 'error',
        title: 'Fallo',
        text: 'Debe llenar los campos de usuario y contraseña',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else if (this.usuarioAux === this.usuarioAdminSimulado.usuario &&
      this.contrasenhaAux === this.usuarioAdminSimulado.contraseña){
        sessionStorage.setItem('idAdmin', this.idAdmin.toString())
        this.router.navigateByUrl("/dashboard/ovas")
        Swal.fire({
          title: 'BIENVENIDO',
          text: 'Bienvenido a OVASWEBSITE SA APP',
          showConfirmButton: false,
          timer: 2000
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Fallo',
          text: 'Usuario y/o Contraseña incorrectos',
          showConfirmButton: false,
          timer: 1500
        });

      }
  }

  // METODO PARA ENCONTRAR EL ID DEL ADMINISTRADOR "JUAN" Y ALMACENARLO PARA SER USADO AL INGRESAR
  encontrarAdminByNombre(){
    this.administradoresServicio.obtenerAdminByNombre("juan").subscribe(
      (response: AdministradoresRecibir) => {
        this.idAdmin = response.idAdmin;
        console.log(response)
      },
      (error: HttpErrorResponse)=>{
        Swal.fire({
          icon: 'error',
          title: 'Fallo',
          text: 'Se perdio la conexion con el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

}
