import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clientes } from '../interfaces/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public obtenerClienteByDocumento(documento: number): Observable<Clientes>{
    return this.http.get<Clientes>(`${this.apiServerUrl}/clientes/find/${documento}`);
  }
}
