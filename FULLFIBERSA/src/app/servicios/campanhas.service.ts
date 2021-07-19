import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CampanhasEnviar, CampanhasRecibida } from '../interfaces/campanhas';

@Injectable({
  providedIn: 'root'
})
export class CampanhasService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http:  HttpClient) { }

  public crearCampanha(campanha: CampanhasEnviar): Observable<CampanhasRecibida>{
    return this.http.post<any>(`${this.apiServerUrl}/campanhas/add`, campanha);
  }

  
}
