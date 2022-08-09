import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public editProject: Project | undefined;
  public deleteProject: Project | undefined;
  public admin : boolean = false;

  constructor(private projectService: ProjectService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getProjects();
    this.getAuthorities();
  }

  public getAuthorities():void{
    const auth = this.tokenService.getAuthorities()
    auth?.includes('ROLE_ADMIN') ? this.admin = true : false
  }

  public getProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  public onAddProject(addForm: NgForm): void {
    // Cierra el modal
    document.getElementById('add-project-close-btn')?.click();
    // Guarda
    this.projectService.addProject(addForm.value).subscribe({
      next: (res: Project) => {
        console.log(res);
        this.getProjects();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateProject(editForm: NgForm): void {
    // Cierra
    document.getElementById('edit-project-close-btn')?.click();
    // Edita
    this.projectService.updateProject(editForm.value).subscribe({
      next: (res: Project) => {
        console.log(res);
        this.getProjects();
        editForm.reset()
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  public onDeleteProject(projectId: number | undefined): void {
    // Cierra
    document.getElementById('delete-project-close-btn')?.click();
    // Delete
    this.projectService.deleteProject(projectId).subscribe({
      next: (res: void) => {
        console.log(res);
        this.getProjects();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  public onOpenModal(mode: string, project?: Project): void {
    if (mode == 'edit') {
      this.editProject = project;
    }
    if (mode === 'delete') {
      this.deleteProject = project;
    }
  }
}
