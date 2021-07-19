import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogDeCambio, LogDeCambioRecibido } from '../interfaces/log-de-cambio';

@Injectable({
  providedIn: 'root'
})
export class LogDeCambioService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public insertarLogDeCambio(log: LogDeCambio): Observable<LogDeCambioRecibido>{
    return this.http.post<LogDeCambioRecibido>(`${this.apiServerUrl}/LogsDeCambio/add`, log);
  }
}
