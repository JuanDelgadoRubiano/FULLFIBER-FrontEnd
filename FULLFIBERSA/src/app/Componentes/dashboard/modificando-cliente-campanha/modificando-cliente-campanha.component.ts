import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteCampanha } from 'src/app/interfaces/cliente-campanha';
import { ClientesCampañasModificar } from 'src/app/interfaces/clientes-campañas-modificar';
import { LogDeCambio, LogDeCambioRecibido } from 'src/app/interfaces/log-de-cambio';
import { ClientesCampanhasService } from 'src/app/servicios/clientes-campanhas.service';
import { LogDeCambioService } from 'src/app/servicios/log-de-cambio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modificando-cliente-campanha',
  templateUrl: './modificando-cliente-campanha.component.html',
  styleUrls: ['./modificando-cliente-campanha.component.css']
})

export class ModificandoClienteCampanhaComponent implements OnInit {


  constructor(private clienteCampanhaServicio: ClientesCampanhasService,
              private logDeCambioServicio: LogDeCambioService,
              private router: Router) { }
          
  // VARIABLE AUXILIAR QUE ME PERMITE VALIDAR EL SELECT DEL FORMULARIO 
  public validacionSelect:any;
  //ID DEL CLIENTE QUE SE ESTA MODIFICANDO EN ESTE MOMENTO
  public idClienteActual: number = 0;
  //ID DE LA CAMPAÑA A LA QUE SERA MODIFICADA 
  public idCampanhaNueva: number = 0;
  // TIPO DE CAMPAÑA QUE SE QUEIRE MODIFICAR
  public tipoCampanha: number = 0;

  
  
  // OBJETO CAMPAÑA ACTUAL QUE SE USA PAR AMOSTRAR LOS DATOS DE LA CAMPAÑA QUE SE QUIERE MODIFICAR
  public campanhaActual: any ={
    nombreProducto: '',
    tipoProducto: '',
    precioProducto: 0,
    fechaInicio: '',
    fechaFinal: ''
  }

  //ARRAY EN EL QUE SE ALMACENAN LAS POSIBLES CAMPAÑAS PARA MODIFICAR 
  public posiblesCampanhas: any[]=[
  ]
  
  //OBJETO AUXILIAR PARA RELLENAR EL ARRAY DE POSIBLES CAMPAÑAS
  public campanhaNuevaAux = {
    idCampanha: 0,
    nombreProducto: '',
    tipoProducto: '',
    precioProducto: 0,
    fechaInicio: '',
    fechaFinal: ''
  }

  //  OBJETO CAMPAÑA PARA MOTRAR LOS DATOS DE LA NUEVA CAMPAÑA  EN EL FORMULARIO
  public campanhaNueva = {
    nombreProducto: '',
    tipoProducto: '',
    precioProducto: 0,
    fechaInicio: '',
    fechaFinal: ''
  }

  // OBJETO PARA ALMACENAR LOS DATOS DE LA CAMPAÑA QUE SERA MODIFICADA PARA POSTERIORMENTE SER DESACTIVADA
  public clienteCampanhaAnterior: ClienteCampanha ={
    idCliente: 0,
    idCampanha: 0,
    estadoClienteCampanha: 0
  }
  // OBJETO PARA ALMACENAR LOS DATOS DE LA CAMPAÑA NUEVA QUE SERA ASIGNADA AL CLIENTE
  public clienteCampanhaModificada: ClienteCampanha = {
    idCliente: 0,
    idCampanha: 0,
    estadoClienteCampanha: 1
  }

  // OBJETO QUE ALMACENA EL ID DEL ADMINISTRADOR QUE REALIZA LOS CAMBIOS 
  public admin = {
    idAdmin: 0
  }
  // OBJETO PARA ALMACENAR EL ID DE LA CAMPAÑA ANTERIOR QUE SERA ENVIADA EN EL LOG DE CAMBIO
  public campanhaAnteriorLog = {
    idCampanha: 0
  }
  // OBJETO PARA ALMACENAR EL ID DE LA CAMPAÑA NUEVA QUE SERA ENVIADA EN EL LOG DE CAMBIO
  public campanhaNuevaLog = {
    idCampanha: 0
  }
  // OBJETO PARA ALMACENAR EL ID DEL CLIENTE AL QUE SE LE ESTA 
  // MODIFICANDO SUS CAMPAÑAS Y SERAN ENVIADOS EN EL LOG DE CAMBIO
  public clienteLog = {
    idCliente: 0

  }

  // OBJETO DE TIPO LOG DE CAMBIO QUE SERA ENVIADO UNA VEZ SE REALICE LA MODIFICACION DE CAMPAÑA AL CLIENTE
  public logDeCambio: LogDeCambio = {
    administrador: this.admin,
    cliente: this.clienteLog,
    campanhaAnterior: this.campanhaAnteriorLog,
    campanhaNueva: this.campanhaNuevaLog,
    comentarioCambio: ''

  }

  // INICIALIZACION DE LOS DATOS DEL FORMULARIO
  ngOnInit(): void {
    // VALIDACION DE QUE SE HAYA LOGEADO EL ADMINISTRADOR
    if(sessionStorage.getItem('idAdmin') === '0'){
      Swal.fire({
        icon: 'info',
        title: 'Alerta',
        text: 'Debes logearte para acceder a esta ruta',
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigateByUrl("/ingreso");
    }else{
    // INICIALIZACION DE DATOS ENVIADOS DESDE EL FORMULARIO DE MODIFICAR CLIENTE
    this.admin.idAdmin = parseInt(sessionStorage.getItem('idAdmin')!)
    this.idClienteActual = parseInt(localStorage.getItem('idCliente')!)
    this.clienteCampanhaAnterior.idCliente =parseInt(localStorage.getItem('idCliente')!)
    this.clienteCampanhaModificada.idCliente =parseInt(localStorage.getItem('idCliente')!)
    this.clienteLog.idCliente = parseInt(localStorage.getItem('idCliente')!)
    this.clienteCampanhaAnterior.idCampanha = parseInt(localStorage.getItem('CampanhaAnterior')!)
    this.campanhaAnteriorLog.idCampanha = parseInt(localStorage.getItem('CampanhaAnterior')!)
    this.campanhaActual.nombreProducto = localStorage.getItem('NombreProducto')
    this.campanhaActual.precioProducto = localStorage.getItem('PrecioProducto')
    this.campanhaActual.tipoProducto = localStorage.getItem('TipoProducto')
    this.campanhaActual.fechaInicio = localStorage.getItem('FechaInicio')?.substr(0,10)
    this.campanhaActual.fechaFinal = localStorage.getItem('FechaFinal')?.substr(0,10)
    // VALIDACION DEL TIPO DE CAMPAÑA QUE SE QUIERE MODIFICAR
    if (this.campanhaActual.tipoProducto === 'TELEVISION'){
      this.tipoCampanha = 1;
    }
    else if (this.campanhaActual.tipoProducto === 'TELEFONIA'){
      this.tipoCampanha = 2;
    }
    else if(this.campanhaActual.tipoProducto === 'INTERNET' ){
      this.tipoCampanha = 3;
    }
    // ENCONTRANDO LAS CAMPAÑAS POSIBLES POR LAS QUE PUEDE REALIZAR LA MODIFICACION
    this.encontrarOtrasCampanhasByIdCliente();
    }
  }

  // FUNCION PARA OBTENER LAS CAMPAÑAS POSIBLES PARA EL CAMBIO
  encontrarOtrasCampanhasByIdCliente(){    
      this.clienteCampanhaServicio.obtenerOtrasCampanhasByIdCliente(this.idClienteActual, this.tipoCampanha).subscribe(
        (response: ClientesCampañasModificar[])=>{      
          response.forEach(element => {
            if(element.id_campanha !== this.clienteCampanhaAnterior.idCampanha){
            this.campanhaNuevaAux = {
              idCampanha: element.id_campanha,
              nombreProducto: element.nombre_producto,
              tipoProducto: element.nombre_tipo,
              precioProducto: element.precio_campanha,
              fechaInicio: element.fecha_inicio_campanha,
              fechaFinal: element.fecha_final_campanha
            }
            this.posiblesCampanhas.push(this.campanhaNuevaAux);
           }
          })
          console.log(this.posiblesCampanhas)
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
      );
    
  }

  //FUNCION QUE ACTUALIZA LOS VALORES DE "CAMPAÑA NUEVA" PARA SER MAPEADOS EN EL FORMULARIO
  actualizarNuevaCampanha(idCampanha: number){
    this.posiblesCampanhas.forEach(element =>{
      if(element.idCampanha === idCampanha){
        this.idCampanhaNueva = idCampanha
        this.campanhaNuevaLog.idCampanha = idCampanha
        this.clienteCampanhaModificada.idCampanha = idCampanha
        this.campanhaNueva.nombreProducto = element.nombreProducto
        this.campanhaNueva.precioProducto = element.precioProducto
        this.campanhaNueva.tipoProducto = element.tipoProducto
        this.campanhaNueva.fechaInicio = element.fechaInicio?.substr(0,10)
        this.campanhaNueva.fechaFinal = element.fechaFinal?.substr(0,10)
      }
    })
  }
  // METODO QUE SE ENCARGA DE REALIZAR LA MODIFICACION DE LA CAMPAÑA AL CLIENTE.
  modificarClienteCampanha(){
    // DESACTIVAR CAMPAÑA ACTUAL
    this.clienteCampanhaServicio.modificarClienteCampanha(this.clienteCampanhaAnterior).subscribe(
      (response: void) => {
        console.log('Campaña desactivada')
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    // VERIFICAR SI YA SE TUVO ASIGNADA ANTERIORMENTE LA CAMPAÑA A LA QUE SE DESEA MODIFICAR
    this.clienteCampanhaServicio.consultarRegistroExistente(this.idClienteActual, this.idCampanhaNueva).subscribe(
      (response: number) =>{
        if(response === 1){
          // SI YA SE TENIA ANTERIORMENTE LA CAMPAÑA, VOLVER A ACTIVARLA
          this.clienteCampanhaServicio.modificarClienteCampanha(this.clienteCampanhaModificada).subscribe(
            (response: void)=>{
              localStorage.clear();
              Swal.fire({
                icon: 'success',
                title: 'Modificado',
                text: 'La campaña se modificó Correctamente',
                showConfirmButton: false,
                timer: 1500
              });
              // ENVIO DEL LOG DE CAMBIO
              this.logDeCambioServicio.insertarLogDeCambio(this.logDeCambio).subscribe(
                (response: LogDeCambioRecibido) =>{
                  console.log(response)
                },
                (error: HttpErrorResponse) => {
                  alert(error.message)
                }
              )
              
            },
            (error: HttpErrorResponse) =>{
              Swal.fire({
                icon: 'error',
                title: 'Fallo',
                text: 'La campaña no fue modificada Correctamente',
                showConfirmButton: false,
                timer: 1500
              });
            }
          )
        }
        else{
          // SI NO EXISTIA ANTERIORMENTE, INSERTAR EL NUEVO REGISTRO DE LA CAMPAÑA
          this.clienteCampanhaServicio.insertarClienteCampanha(this.clienteCampanhaModificada).subscribe(
            (response: void) => {
              // RESETENADO LOS VALORES DEL FORMULARIO
              localStorage.clear();
              Swal.fire({
                icon: 'success',
                title: 'Modificado',
                text: 'La campaña se modificó Correctamente',
                showConfirmButton: false,
                timer: 1500
              });
              // ENVIAR LOG DE CAMBIO
              this.logDeCambioServicio.insertarLogDeCambio(this.logDeCambio).subscribe(
                (response: LogDeCambioRecibido) =>{
                  console.log(response)
                },
                (error: HttpErrorResponse) => {
                  alert(error.message)
                }
              )
            },
            (error: HttpErrorResponse) => {
              Swal.fire({
                icon: 'error',
                title: 'Fallo',
                text: 'La campaña no fue creada Correctamente',
                showConfirmButton: false,
                timer: 1500
              });
            }
          );
        }
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }
  // METODO PARA QUE CUANDO SALGAS DEL FORMULARIO SIN HABER HECHO NADA, LIMPIE EL STORAGE
  // EVITANDO QUE AL INGRESAR DENUEVO POR MEDIO DEL LINK, APAREZCA LA INFORMACION QUE HABIA ANTERIORMENTE
  vaciarLocalStorage(){
    localStorage.clear();
  }
}
