import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root',
})

export class EducacionService {
  private apiServerUrl = environment.apiBaseUrl;
  // private token = sessionStorage.getItem("AuthToken")
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.tokenService.getToken()}`
  })

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getEducacion(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/educacion/all`,{ headers: this.headers });
  }

  public addEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(
      `${this.apiServerUrl}/educacion/add`,
      educacion,
      { headers: this.headers }
    );
  }

  public updateEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(
      `${this.apiServerUrl}/educacion/update`,
      educacion,
      { headers: this.headers }
    );
  }

  public deleteEducacion(educacionId: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/educacion/delete/${educacionId}`,{ headers: this.headers }
    );
  }
}
