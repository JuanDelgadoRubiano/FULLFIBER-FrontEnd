import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradoresRecibir } from 'src/app/interfaces/administradores';
import { CampanhasEnviar, CampanhasRecibida } from 'src/app/interfaces/campanhas';
import { CondicionTipo } from 'src/app/interfaces/condicion-tipo';
import { ProductoRecibido } from 'src/app/interfaces/productos';
import { TiposProductos } from 'src/app/interfaces/tipos-productos';
import { AdministradoresService } from 'src/app/servicios/administradores.service';
import { CampanhasService } from 'src/app/servicios/campanhas.service';
import { CondicionTipoService } from 'src/app/servicios/condicion-tipo.service';
import { ProductosService } from 'src/app/servicios/productosService';
import { TiposProductoService } from 'src/app/servicios/tipos-producto.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-registrar-campanhas',
  templateUrl: './registrar-campanhas.component.html',
  styleUrls: ['./registrar-campanhas.component.css']
})
export class RegistrarCampanhasComponent implements OnInit {

  constructor(
    private campanhasService: CampanhasService, 
    private productoService: ProductosService, 
    private condicionTipoService: CondicionTipoService,
    private tiposProductoService: TiposProductoService,
    private router: Router) {}

  // VARIABLES PARA EL FORMULARIO DE VIGENCIA
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  //VARIABLES AUXILIARES PARA VALIDAR LOS DATOS ENVIADOS AL FORMULARIO
  public condicionFacturaGeneral: any;
  public condicionFacturaTipo: any;
  public productoAux: any;
  public precioCampanhaAux: any;
  public condicionCalificacionAux: any;
  public fechaInicioAux: any;
  public fechaFinalAux: any;
  public industrial = false;
  public residencial = false;
  public comercial = false;
  public industrialAux = false;
  public residencialAux = false;
  public comercialAux = false;

  //ARRAY DE PRECIOS PARA SER MAPEADOS EN EL SELECT DE INTERVALOS DE FACTURAS
  precios: any[] = [
    {value: 50000, viewValue: '25.000 - 50.000'},
    {value: 75000, viewValue: '50.000 - 75.000'},
    {value: 100000, viewValue: '75.000 - 100.000'},
    {value: 125000, viewValue: '100.000 - 125.000'}
  ];

  // ARRAY PARA MAPEAR LOS TIPOS DE PRODUCTOS A LOS QUE SE LES HARA CAMPAÑA 
  //( SE INICIALIZA VACIO PORQUE SE CARGAN SUS VALORES DESDE LA BASE)
  tipos: any[] = [
  ];

  // ARRAY PARA MAPEAR LOS PRODUCTOS A LOS QUE SE LES HARA CAMPAÑA 
  //( SE INICIALIZA VACIO PORQUE SE CARGAN SUS VALORES DESDE LA BASE SEGUN EL TIPO QUE SE ESCOJA) 
  productos: any[] = [
  ];

  //ARRAY PARA MAPEAR LAS CALIFICACIONES DISPONIBLES
  calificaciones: any[] = [
    {value: 5, viewValue: 'EXCELENTE'},
    {value: 4, viewValue: 'BUENA'},
    {value: 3, viewValue: 'REGULAR'},
    {value: 2, viewValue: 'MALA'}
  ];

  //OBJETO ADMINISTRADOR QUE CONTIENE LA INFORMACION DEL ADMINISTRADOR QUE REALIZA LA CREACION DE CAMPAÑA
  public Admin: AdministradoresRecibir = {
    idAdmin: 0,
    nombreAdmin: '',
    apellidoAdmin: ''
}
  
//OBJETO DE TIPO DE PRODUCTOS QUE CONTIENE LA INFORMACION DEL TIPO DE PRODUCTO AL QUE SE LE HARA LA CAMPAÑA
  public tiposProducto: TiposProductos = {
    idTipo: 0,
    nombreTipo: ''
  }
//OBJETO DE PRODUCTOS RECIBIDOS QUE CONTIENE LA INFORMACION DEL PRODUCTO QUE SE LE HARA CAMPAÑA
  public product: ProductoRecibido  = {
    idProducto: 0,
    nombreProducto: '',
    descripcionProducto: '',
    tipoProducto: this.tiposProducto
  }
  //OBJETO PARA MAPEAR EL CHECK BOX DE CONDICION TIPO INDUSTRIAL
  public condicionTipo1: CondicionTipo = {
    idCampanha: 0,
    condicion: "INDUSTRIAL"
  }
  //OBJETO PARA MAPEAR EL CHECK BOX DE CONDICION TIPO RESIDENCIAL
  public condicionTipo2: CondicionTipo = {
    idCampanha: 0,
    condicion: "RESIDENCIAL"
  }
  //OBJETO PARA MAPEAR EL CHECK BOX DE CONDICION TIPO COMERCIAL
  public condicionTipo3: CondicionTipo = {
    idCampanha: 0,
    condicion: "COMERCIAL"
  }

  //OBJETO DE TIPO CAMPAÑA QUE SERA ENVIADO A LA BASE DE DATOS
  public campanha: CampanhasEnviar ={
    precioCampanha: 0 ,
    fechaInicioCampanha: new Date(),
    fechaFinalCampanha: new Date(),
    condicionCalificacion: 0,
    condicionFacturaGeneralInicio: 0 ,
    condicionFacturaGeneralFinal: 0,
    condicionFacturaInicio: 0,
    condicionFacturaFinal: 0,
    descripcionCampanha: '',
    estadoCampanha: 1,
    administradores: this.Admin,
    producto: this.product

  }
  
  // OBJETOS AUXILIARES PARA INGRESAR LOS PRODUCTOS Y LOS TIPOS EN EL ARRAY DE PRODUCTOS Y TIPOS 
  public rutaProductos: any = {value: 0, viewValue: ''};
  public rutaTipos: any = {value: 0, viewValue: ''};



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
    }else{
    this.encontrarTiposDeProducto();
    this.Admin.idAdmin = parseInt(sessionStorage.getItem('idAdmin')!)
    }
  }


  // METODO QUE ENCUENTRA PRODUCTOS SEGUN SU TIPO Y LLENA EL ARRAY DE TIPO PRODUCTOS
  encontrarProductosByIdTipo(tipo: number): void{
    this.productos = [];
     this.productoService.obtenerProductoByTipo(tipo).subscribe(
      (response: ProductoRecibido[])=>{
        response.forEach(element =>{
          this.rutaProductos = {value: element.idProducto, viewValue: element.nombreProducto};
          this.productos.push(this.rutaProductos)
          }
        );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ) 
  }


  // METODO QUE  ENCUENTRA TODOS LOS TIPOS DE PRODUCTOS QUE HAY Y LLENA EL ARRAY DE TIPOS DE PRODUCTOS 
  encontrarTiposDeProducto(): void{
    this.tiposProductoService.obtenerTiposDeProducto().subscribe(
      (response: TiposProductos[]) => {
        response.forEach(element => {
          this.rutaTipos = {value: element.idTipo, viewValue: element.nombreTipo};
          this.tipos.push(this.rutaTipos)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        );
      }
    )
  }


  // METODO PARA ADICIONAR LA CAMPAÑA QUE SE REGISTRO EN EL FORMULARIO
  adicionarCampanha(form: NgForm): void{
    let fecha = new Date();
    // ACTUALIZACION DE DATOS DEL OBJETO CAMPAÑA QUE SERA REGISTRADO
    this.campanha.condicionFacturaGeneralInicio = this.condicionFacturaGeneral - 25000;
    this.campanha.condicionFacturaInicio = this.condicionFacturaTipo - 25000;
    this.campanha.condicionFacturaGeneralFinal = this.condicionFacturaGeneral;
    this.campanha.condicionFacturaFinal = this.condicionFacturaTipo;
    this.campanha.precioCampanha = this.precioCampanhaAux;
    this.campanha.condicionCalificacion = this.condicionCalificacionAux;
    this.campanha.fechaInicioCampanha = this.fechaInicioAux;
    this.campanha.fechaFinalCampanha = this.fechaFinalAux;
    this.product.idProducto = this.productoAux;
    this.industrialAux = this.industrial;
    this.comercialAux = this.comercial;
    this.residencialAux = this.residencial
    // VERIFICACION DE LA FECHA APLICADA A LA CAMPAÑA. DEFINIENDO SI SE REGISTRA ACTIVA O INACTIVA LA CAMPAÑA
    if(fecha < this.campanha.fechaInicioCampanha){
      this.campanha.estadoCampanha = 3;
    }
//    if(this.campanha.fechaFinalCampanha < fecha){
//      this.campanha.estadoCampanha = 0;
//   }

    // ENVIANDO LA CAMPAÑA REGISTRADA AL BACKEND.
    this.campanhasService.crearCampanha(this.campanha).subscribe(
      (response: CampanhasRecibida) => {
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'La campaña se creo Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        
        // VERIFICACION DE LOS CHECK BOX DE LAS CONDICIONES POR TIPO DE CLIENTE Y ENVIO DE LA CONDICION POR TIPO
        if (this.industrialAux){
          this.condicionTipo1.idCampanha = response.idCampanha
          this.condicionTipoService.crearCondicionTipo(this.condicionTipo1).subscribe(
            (response: void) => {
              console.log('Registro de condicion realizado')
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        
        }
        if (this.residencialAux)  {
          this.condicionTipo2.idCampanha = response.idCampanha
          this.condicionTipoService.crearCondicionTipo(this.condicionTipo2).subscribe(
            (response: void) => {
              console.log('Registro de condicion realizado')
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
        if (this.comercialAux) {
          this.condicionTipo3.idCampanha = response.idCampanha
          this.condicionTipoService.crearCondicionTipo(this.condicionTipo3).subscribe(
            (response: void) => {
              console.log('Registro de condicion realizado')
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
      },
      (error: HttpErrorResponse ) => {
        Swal.fire({
          icon: 'error',
          title: 'Fallo',
          text: 'La campaña no fue creada Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        form.reset();
      }
      
    ); 
  }

}
