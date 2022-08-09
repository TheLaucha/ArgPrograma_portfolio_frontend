import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Skill } from '../model/skill';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiServerUrl = environment.apiBaseUrl;
  // private token = sessionStorage.getItem("AuthToken")
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.tokenService.getToken()}`
  })

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiServerUrl}/skills/all`,{ headers: this.headers });
  }

  public addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(
      `${this.apiServerUrl}/skills/add`,
      skill,
      { headers: this.headers }
    );
  }

  public updateSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(
      `${this.apiServerUrl}/skills/update`,
      skill,
      { headers: this.headers }
    );
  }

  public deleteSkill(skillId: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/skills/delete/${skillId}`,{ headers: this.headers }
    );
  }
}