import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoEnviado, ProductoRecibido } from 'src/app/interfaces/productos';
import { TiposProductos } from 'src/app/interfaces/tipos-productos';
import { ProductosService } from 'src/app/servicios/productosService';
import { TiposProductoService } from 'src/app/servicios/tipos-producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrar-productos',
  templateUrl: './registrar-productos.component.html',
  styleUrls: ['./registrar-productos.component.css']
})
export class RegistrarProductosComponent implements OnInit {

    constructor(private productosService: ProductosService,
              private tiposProductosService: TiposProductoService,
              private router: Router) { }

  //VARIABLES AUXILIARES PARA PERMITIR VALIDACION DE LOS DATOS EN EL FORMULARIO
  public nombreProducto: any;
  public tipoProducto: any;
  public descripcionProducto: any;


  //ARRAY QUE CONTENDRA LOS TIPOS DE PRODUCTO QUE SERAN CARGADOS EN LA VISTA
  public tiposProductos: any[] = [
  ];

  // DEFINICION DEL OBJETO DE TIPO DE PRODUCTO AL QUE PERTENECE EL PRODUCTO QUE SERA REGISTRADO.
  public tipos: TiposProductos = {
    idTipo: 0,
    nombreTipo: ''
  }

  // OBJETO DONDE SE ALMACENAN LOS DATOS DEL PRODUCTO QUE SERA REGISTRADO
  public productos: ProductoEnviado = {
    nombreProducto: '',
    descripcionProducto: '',
    tipoProducto: this.tipos
  }

  // OBJETO AUXILIAR PARA INGRESAR LOS TIPOS AL ARRAY DE TIPOS
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
    this.encontrarTiposDeProducto()
    }
  }

   // METODO PARA ENVIAR EL PRODUCTO QUE DESEA REGISTRARSE
   adicionarProducto(form: NgForm): void{
    this.productos.nombreProducto = this.nombreProducto;
    this.tipos.idTipo = this.tipoProducto;
    this.productos.descripcionProducto = this.descripcionProducto;
    this.productosService.crearProducto(this.productos).subscribe(
      (response: ProductoRecibido) => {
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'Producto creado Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: HttpErrorResponse ) => {
        Swal.fire({
          icon: 'error',
          title: 'Fallo',
          text: 'El producto No fue creado Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        form.reset();
      }
    );
  }


  // METODO QUE EXTRAE LOS TIPOS DE PRODUCTOS DESDE LA BASE, PARA SER CARGADOS EN LA VISTA
  encontrarTiposDeProducto(): void{
    console.log()
    this.tiposProductosService.obtenerTiposDeProducto().subscribe(
      (response: TiposProductos[]) => {
        response.forEach(element => {
          this.rutaTipos = {value: element.idTipo, viewValue: element.nombreTipo};
          this.tiposProductos.push(this.rutaTipos)
        },
        (error: HttpErrorResponse) => {
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
    )
  }

}
