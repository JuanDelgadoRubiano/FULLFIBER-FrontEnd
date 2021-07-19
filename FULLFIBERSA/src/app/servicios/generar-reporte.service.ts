import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerarReporteService {

  apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public generarReporte(): void{
     this.http.get<void>(`${this.apiServerUrl}/clienteCampanha/generarReporte`);
  }
}
