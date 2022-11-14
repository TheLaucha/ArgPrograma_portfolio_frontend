import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { Educacion } from 'src/app/model/educacion'; // Cambiar
import { EducacionService } from 'src/app/service/educacion.service'; // Cambiar

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  public educacion: Educacion[] = [];
  public editEducacion: Educacion | undefined;
  public deleteEducacion: Educacion | undefined;
  public admin: boolean = false;

  constructor(
    private educacionService: EducacionService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getEducacion();
    this.getAuthorities();
  }

  public getAuthorities(): void {
    const auth = this.tokenService.getAuthorities();
    auth?.includes('ROLE_ADMIN') ? (this.admin = true) : false;
  }

  public getEducacion(): void {
    this.educacionService.getEducacion().subscribe({
      next: (data: Educacion[]) => {
        this.educacion = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  public onAddEducacion(addForm: NgForm): void {
    // Cierra el modal
    document.getElementById('add-educacion-close-btn')?.click();
    // Guarda
    this.educacionService.addEducacion(addForm.value).subscribe({
      next: (res: Educacion) => {
        console.log(res);
        this.getEducacion();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateEducacion(editForm: NgForm): void {
    // Cierra
    document.getElementById('edit-educacion-close-btn')?.click();
    // Edita
    this.educacionService.updateEducacion(editForm.value).subscribe({
      next: (res: Educacion) => {
        console.log(res);
        this.getEducacion();
        editForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  public onDeleteEducacion(educacionId: number | undefined): void {
    // Cierra
    document.getElementById('delete-educacion-close-btn')?.click();
    // Delete
    this.educacionService.deleteEducacion(educacionId).subscribe({
      next: (res: void) => {
        console.log(res);
        this.getEducacion();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  public onOpenModal(mode: string, educacion?: Educacion): void {
    if (mode == 'edit') {
      this.editEducacion = educacion;
    }
    if (mode === 'delete') {
      this.deleteEducacion = educacion;
    }
  }
}
