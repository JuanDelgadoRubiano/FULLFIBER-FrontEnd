import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionCampanhasService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public asignarCampanhas(): Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/clienteCampanha/asignarCampanha`);
  }

}
