import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { ovaToReceive, ovaToSend } from 'src/app/interfaces/registro-ova';

import { ovasService } from 'src/app/servicios/registro-ova.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-registrar-campanhas',
  templateUrl: './registrar-campanhas.component.html',
  styleUrls: ['./registrar-campanhas.component.css']
})
export class RegistrarCampanhasComponent implements OnInit {

  constructor(
    private ovasService: ovasService,
    private router: Router) {}

    autor_ova: any;
    name_ova: any;
    category_ova: any;
    subject_ova: any;
    description_ova: any;
    languaje_ova: any;
    publisher_ova: any;
    source_ova: any;
    relation_ova: any;
    coverage_ova: any;
    rights_ova: any;
    format_ova: any;
    id_ova_created: any;
    public fechaPublicacionOva: any;
    public archivos: any = [];
    public quiz: any = [];

 // OBJETO DONDE SE ALMACENAN LOS DATOS DEL OVA QUE SERA REGISTRADO
 public ova: ovaToSend = {
  ova: {
    binary: "",
    name_file: "",
    has_test: 1
  },
  metaData:{
   autor_ova: "",
   name_ova: "",
   category_ova: "",
   subject_ova: "",
   description_ova:"",
   languaje_ova:"",
   publisher_ova:"",
   source_ova: "",
   relation_ova:"",
   coverage_ova:"",
   rights_ova:"",
   date_publication_ova: new Date(),
   format_ova: ""
  }
}

  // VARIABLES PARA EL FORMULARIO DE VIGENCIA
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  ngOnInit(): void {
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

  fileChange(event: any): any{
    this.archivos = event.target.files;
  }

  fileChange2(event: any): any{
    this.quiz = event.target.files;
  }


  // METODO PARA ADICIONAR LA OVA QUE SE REGISTRO EN EL FORMULARIO
  adicionarOva(form: NgForm): void{
    console.log(this.ova)
    // ACTUALIZACION DE DATOS DEL OBJETO OVA QUE SERA REGISTRADO
    this.ova.metaData.autor_ova = this.autor_ova
    this.ova.metaData.name_ova = this.name_ova
    this.ova.metaData.category_ova= this.category_ova
    this.ova.metaData.subject_ova= this.subject_ova
    this.ova.metaData.description_ova= this.description_ova
    this.ova.metaData.languaje_ova= this.languaje_ova
    this.ova.metaData.publisher_ova= this.publisher_ova
    this.ova.metaData.source_ova= this.source_ova
    this.ova.metaData.relation_ova= this.relation_ova
    this.ova.metaData.coverage_ova= this.coverage_ova
    this.ova.metaData.rights_ova= this.rights_ova
    this.ova.metaData.format_ova= this.format_ova
    this.ova.metaData.date_publication_ova= this.fechaPublicacionOva

    // ENVIANDO LA OVA REGISTRADA AL BACKEND.
    this.ovasService.crearOva(this.ova).subscribe(
      (response: ovaToReceive) => {
        this.id_ova_created = response.metaData.id
        let formData = new FormData();
        let formData2 = new FormData();
        for (var i = 0; i < this.archivos.length; i++) {
          formData.append("uploads[]", this.archivos[i], 'ova' + this.id_ova_created + '.mp4');
          formData2.append("uploads[]", this.quiz[i], 'ova' + this.id_ova_created + '.json');
        }
        this.ovasService.uploadFile(formData).subscribe((res: any)=> {
          console.log('response received is ', res);
        });

        this.ovasService.uploadJson(formData2).subscribe((res: any)=> {
          console.log('response received is ', res);
        });
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'El Ova se creo Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: HttpErrorResponse ) => {
        Swal.fire({
          icon: 'error',
          title: 'Fallo',
          text: 'El ova no fue creada Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        form.reset();
      }

    );
  }

}
