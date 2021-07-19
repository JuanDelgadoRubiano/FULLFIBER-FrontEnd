import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CondicionTipo } from '../interfaces/condicion-tipo';

@Injectable({
  providedIn: 'root'
})
export class CondicionTipoService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public crearCondicionTipo(condicion: CondicionTipo): Observable<void>{
    return this.http.post<void>(`${this.apiServerUrl}/condicionTipo/add`, condicion);
  }
}
