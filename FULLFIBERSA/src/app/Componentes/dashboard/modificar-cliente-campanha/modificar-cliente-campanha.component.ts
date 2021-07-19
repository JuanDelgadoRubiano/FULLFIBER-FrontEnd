import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/interfaces/clientes';
import { ClientesCampañasModificar } from 'src/app/interfaces/clientes-campañas-modificar';
import { ClientesCampanhasService } from 'src/app/servicios/clientes-campanhas.service';
import { ClientesService } from 'src/app/servicios/clientes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modificar-cliente-campanha',
  templateUrl: './modificar-cliente-campanha.component.html',
  styleUrls: ['./modificar-cliente-campanha.component.css']
})
export class ModificarClienteCampanhaComponent implements OnInit {

  constructor(private clientesServicio: ClientesService,
              private clientesCampanhasServicio: ClientesCampanhasService,
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

  // VARIABLES QUE AYUDAN AL BINDEO DE LA INFORMACION DEL CLIENTE EN EL FORMULARIO
  public documento: any;
  public nombreCliente: String = '';
  public calificacionCliente: String = '';
  public tipoCliente: String = '';

  // ARRAY QUE CONTENDRA LAS CAMPAÑAS QUE APLICA EL CLIENTE QUE SE ESTA BUSCANDO
  public campanhas: any = [
  ]

  // OBJETO AUXILIAR QUE CONTIENE LA INFORMACION DE LAS CAMPAÑAS QUE SERA INSERTADA EN EL ARRAY DE CAMPAÑAS
  public campanha: any = {
    value: 0, 
    titulo: '', 
    precio: 0, 
    descripcion: '', 
    fechaInicio: '', 
    fechaFinal: '', 
    tipoProducto: ''
  }

  // METODO QUE ENCUENTRA EL CLIENTE BUSCADO A PARTIR DEL NUMERO DE DOCUMENTO DE IDENTIFICACION
  encontrarClienteByDocumento(): void{
    this.clientesServicio.obtenerClienteByDocumento(this.documento).subscribe(
      (response: Clientes) =>{
        // VERIFICACION QUE SI HAYA ENCONTRADO UN CLIENTE DIFERENTE DE NULO.
        if(response == null){
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: 'Cliente no encontrado',
            showConfirmButton: false,
            timer: 2000
          });
        }
        else{
        localStorage.setItem('idCliente', response.idCliente.toString());
        this.nombreCliente = response.nombreCliente;
        this.tipoCliente = response.tipoCliente;

        // VERIFICACION DE LA CALIFICACION DEL CLIENTE, PARA SER MOSTRADA EN LA VISTA.
        if (response.calificacionCliente == 5){
          this.calificacionCliente = 'EXCELENTE'
        }
        else if (response.calificacionCliente == 4){
          this.calificacionCliente = 'BUENA'
        }
        else if (response.calificacionCliente == 3){
          this.calificacionCliente = 'REGULAR'
        }
        else if (response.calificacionCliente == 2){
          this.calificacionCliente = 'MALA'
        }
        // BUSQUEDA DE LAS CAMPAÑAS A LAS QUE PERTENECE EL CLIENTE ENCONTRADO.
        this.encontrarCampanhasByIdCliente(response.idCliente);
      }
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Fallo',
          text: 'El cliente no fue encontrado',
          showConfirmButton: false,
          timer: 1500
        });
      }
      );

  }

  //METODO QUE ENCUENTRA LAS CAMPAÑAS A LAS QUE APLICA UN CLIENTE A PARTIR DE SU ID 
  encontrarCampanhasByIdCliente(idCliente: number){
    this.campanhas = [];
    this.clientesCampanhasServicio.obtenerCampanhasByIdCliente(idCliente).subscribe(
      (response: ClientesCampañasModificar[]) =>{
        response.forEach(element =>{
          
          this.campanha = {
            value: element.id_campanha, 
            titulo: element.nombre_producto, 
            precio: element.precio_campanha, 
            descripcion: element.descripcion_campanha, 
            fechaInicio: element.fecha_inicio_campanha, 
            fechaFinal:element.fecha_final_campanha, 
            tipoProducto: element.nombre_tipo
          }
          this.campanhas.push(this.campanha);
        })
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  // METODO QUE ALMACENA EN EL LOCAL STORAGE LOS VALORES NECESARIOS DE LA CAMPAÑA QUE SE QUIERE MODIFICAR
  // Y REDIRIGE A LA VISTA DE MODIFICANDO CLIENTE CAMPAÑA
  modificarCampanha(nombre: string, precio: number, tipo: string, fechaI: Date, fechaF: Date, idCampanha: number){
    localStorage.setItem('NombreProducto', nombre)
    localStorage.setItem('PrecioProducto', precio.toString())
    localStorage.setItem('TipoProducto', tipo)
    localStorage.setItem('FechaInicio', fechaI.toString())
    localStorage.setItem('FechaFinal', fechaF.toString())
    localStorage.setItem('CampanhaAnterior', idCampanha.toString())

    window.location.assign("http://localhost:4200/dashboard/modificandoCliente"); 
   
  }
}
