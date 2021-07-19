import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposProductos } from '../interfaces/tipos-productos';

@Injectable({
  providedIn: 'root'
})
export class TiposProductoService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public obtenerTiposDeProducto(): Observable<TiposProductos[]>{
    return this.http.get<TiposProductos[]>(`${this.apiServerUrl}/tipo/all`);
  }
}
