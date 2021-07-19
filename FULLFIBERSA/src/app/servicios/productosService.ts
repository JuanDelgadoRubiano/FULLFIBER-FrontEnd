import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoEnviado, ProductoRecibido} from '../interfaces/productos'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiServerUrl = environment.apiBaseUrl

  constructor(private http:  HttpClient) { }

  public crearProducto(producto: ProductoEnviado): Observable<ProductoRecibido>{
    return this.http.post<any>(`${this.apiServerUrl}/productos/add`, producto);
  }

  public obtenerProductoByTipo(tipo: number): Observable<ProductoRecibido[]>{
    return this.http.get<ProductoRecibido[]>(`${this.apiServerUrl}/productos/find/${tipo}`);
  }
}
