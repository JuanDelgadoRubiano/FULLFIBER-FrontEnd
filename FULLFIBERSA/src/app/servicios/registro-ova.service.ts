import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ovaToSend, ovaToReceive } from '../interfaces/registro-ova'

@Injectable({
  providedIn: 'root'
})
export class ovasService {
  private apiServerUrl = environment.apiBaseUrl

  constructor(private http:  HttpClient) { }

  public crearOva(ova: ovaToSend): Observable<ovaToReceive>{
    return this.http.post<any>(`${this.apiServerUrl}/ova`, ova);
  }

  uploadFile(formData: any) {
    return this.http.post<any>(`${this.apiServerUrl}/ovaArchivo`, formData);
  }

  uploadJson(formData: any) {
    return this.http.post<any>(`${this.apiServerUrl}/ovaJson`, formData);
  }
}
