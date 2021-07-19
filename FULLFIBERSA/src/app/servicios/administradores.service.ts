import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdministradoresRecibir } from '../interfaces/administradores';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public obtenerAdminByNombre(nombre: string): Observable<AdministradoresRecibir>{
    return this.http.get<AdministradoresRecibir>(`${this.apiServerUrl}/admin/find/${nombre}`);
  }
}
