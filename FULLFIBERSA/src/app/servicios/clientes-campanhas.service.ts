import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteCampanha } from '../interfaces/cliente-campanha';
import { ClientesCampañasModificar } from '../interfaces/clientes-campañas-modificar';

@Injectable({
  providedIn: 'root'
})
export class ClientesCampanhasService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public obtenerCampanhasByIdCliente(idCliente: number): Observable<ClientesCampañasModificar[]>{
    return this.http.get<ClientesCampañasModificar[]>(`${this.apiServerUrl}/clienteCampanha/find/${idCliente}`);
  }

  public obtenerOtrasCampanhasByIdCliente(idCliente: number, tipo: number): Observable<ClientesCampañasModificar[]>{
    return this.http.get<ClientesCampañasModificar[]>(`${this.apiServerUrl}/clienteCampanha/findOtros/${idCliente}/${tipo}`);
  }

  public modificarClienteCampanha(clienteCampanha: ClienteCampanha): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/clienteCampanha/editar`, clienteCampanha);
  }

  public insertarClienteCampanha(clienteCampanha: ClienteCampanha): Observable<void>{
    return this.http.post<void>(`${this.apiServerUrl}/clienteCampanha/add`, clienteCampanha);
  }

  public consultarRegistroExistente(idCliente: number, idCampanha: number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/clienteCampanha/consultar/${idCliente}/${idCampanha}`);
  }

}
