import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiServerUrl = environment.apiBaseUrl;
  // private token = sessionStorage.getItem("AuthToken")
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.tokenService.getToken()}`
  })

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiServerUrl}/projects/all`,{ headers: this.headers });
  }

  public addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(
      `${this.apiServerUrl}/projects/add`,
      project,
      { headers: this.headers }
    );
  }

  public updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(
      `${this.apiServerUrl}/projects/update`,
      project,
      { headers: this.headers }
    );
  }

  public deleteProject(projectId: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/projects/delete/${projectId}`,{ headers: this.headers }
    );
  }
}
